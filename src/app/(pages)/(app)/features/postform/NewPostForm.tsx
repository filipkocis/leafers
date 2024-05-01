"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { UseFormReturn, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@shadcn/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@shadcn/components/ui/form"
import { createPost } from "./actions/createPost"
import { combinedSchema } from "./utils/newPostSchema"
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Textarea } from "@shadcn/components/ui/textarea"
import { toast } from "sonner"
import { capitalize } from "@utils/string"
import { Loader } from "lucide-react"
import ProfilePicture from "@app/components/ProfilePicture"
import { PostTypeEnum } from "@app/utils/types"
import { useRouter } from "next/navigation"
import PostTypeToggleGroup from "./components/PostTypeToggleGroup"
import { FormLog } from "./components/FormLog"
import { cn } from "@shadcn/lib/utils"
import { useBadges } from "@app/contexts/badgesContext"

function resizeElementHeight(
  after: "old" | "new",
  element: HTMLElement | undefined | null, 
  fn: (oldHeight: string, newHeight: string) => void, 
  extraHeight = 0,
) {
  if (!element) return;
  
  const oldHeight = element.style.height;
  element.style.height = "auto";
  const newHeight = `${element.scrollHeight + extraHeight}px`;

  element.style.height = after === "old" ? oldHeight : newHeight;

  setTimeout(() => {
    fn(oldHeight, newHeight);
  }, 0);
}

export default function NewPostForm({ 
  preventRefresh,
  parent, 
  modalCloser 
}: { 
  preventRefresh?: boolean,
  parent?: string, 
  modalCloser?: () => void 
}) {
  const [type, setType] = useState<PostTypeEnum>("text")
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const badges = useBadges()

  const disabled = useMemo(() => {
    if (type === "log") return !badges?.includes('leafer');
    // TODO: remove this after implementing more types
    if (type !== "text") return true;
    return false;
  }, [badges, type])

  const resizeForm = useCallback(() => {
    resizeElementHeight("old", formRef.current, (_, newHeight) =>  { 
      if (formRef.current) formRef.current.style.height = newHeight
    })
  }, [formRef])

  const handleTextareaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    resizeElementHeight("new", e.target, () => resizeForm(), 2)
  };

  const form = useForm<z.infer<typeof combinedSchema>>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      type: "text",

      // hack to bypass reacts controlled input warning
      // @ts-ignore
      name: "",
      amount: "",
      unit: "gram",
      appearance: "",
      variant: "",
      timestamp: new Date(),
      leaf: true,
      
      parent: parent,
    },
  }) as any as UseFormReturn<z.infer<typeof combinedSchema>>
 
  function formReset() {
    form.setValue("type", "text")
    setType("text")
    form.reset()

    const current = formRef.current;
    if (current) {
      current.reset()
      current.getElementsByTagName("textarea")[0].style.height = "auto"
      resizeForm()
    }
  }

  function onSubmit(values: z.infer<typeof combinedSchema>) {
    formReset()

    const toastId = toast('Creating post...')

    // toast.loading spinner doesn't work so this is a quick fix
    toast((
      <div className="flex items-center gap-1">
        <Loader className="animate-spin" style={{ animationDuration: "1.5s" }} height={16} width={16} />
        <span>Creating post...</span>
      </div>
    ), { id: toastId })

    if (values.type === 'log' && typeof values.amount === 'number') {
      // INFO: a hack since zod server-side requires amount to be a string
      // @ts-ignore
      values.amount = `${values.amount}`
    }

    createPost(values).then(({ error }) => {
      if (error) toast.error(error.message, { id: toastId });
      else toast.success(`${capitalize(values.type)} post has been created`, { id: toastId });
    }).catch(err => {
      toast.error(err.message, { id: toastId })
    }).finally(() => {
      if (modalCloser) modalCloser();
      if (!preventRefresh) router.refresh();
    })
  }

  useEffect(() => {
    const allowedTypes = ['text', 'log'] as const
    const currentType = type as typeof allowedTypes[number];

    if (!allowedTypes.includes(currentType)) form.setValue("type", "text")
    form.setValue("type", currentType)

    // hack to remove empty strings from submitted values
    const values = form.getValues();
    for (const key in values) {
    // @ts-ignore
      if (values[key] === "") form.setValue(key, undefined)
    }
  }, [type, form])

  useEffect(() => {
    resizeForm()
  }, [formRef, type, resizeForm])

  useEffect(() => {
    // TODO: SHOULD I REMOVE THIS ?
    window.addEventListener("resize", resizeForm)

    return () => window.removeEventListener("resize", resizeForm)
  }, [resizeForm])

  return (
    <Form {...form}>
      <form 
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col justify-between gap-3 transition-all overflow-y-hidden p-1"
      >
        <input type="hidden" name="type" value={type} />

        <div className="grid gap-2 grid-cols-[auto_1fr]">
          <ProfilePicture className="self-start" src={undefined} alt="Profile picture" size={40} />

          <FormField
            disabled={disabled}
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    onReset={handleTextareaInput}
                    className={cn("min-h-0 max-h-[30vh] px-3 py-2 text-[1rem] resize-none", fieldState.error && "border-red-500 border-2")}
                    rows={1}
                    maxLength={280}
                    placeholder="What's on your mind?"
                    onInput={handleTextareaInput}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {type === "log" && (
          <FormLog disabled={disabled} form={form} />
        )} 
        
        <div className="flex justify-between gap-4">
          <PostTypeToggleGroup defaultValue="text" type={type} setType={setType} />

          <Button 
            disabled={disabled}
            className="px-3 py-2 h-auto sm:text-lg rounded-full bg-gradient-to-r from-green-500 from-20% to-primary" 
            type="submit"
          >
            Post
          </Button>
        </div>
      </form>
    </Form>
  )
}
