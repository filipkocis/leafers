"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/shadcn/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/shadcn/components/ui/form"
import { Input } from "@/shadcn/components/ui/input"
import { createPost } from "../actions/createPost"
import { PostType, combinedSchema } from "../utils/newPostSchema"
import { ChangeEvent, useEffect, useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/app/lib/shadcn/components/ui/radio-group"
import { Label } from "@/app/lib/shadcn/components/ui/label"
import { cn } from "@/app/lib/shadcn/lib/utils"
import Image from "next/image"
import { Textarea } from "@/app/lib/shadcn/components/ui/textarea"
import DateTimePickerForm from "./DateTimePickerForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/lib/shadcn/components/ui/select"
import { toast } from "sonner"
import { capitalize } from "@/app/utils/string"
import { Loader } from "lucide-react"

export default function RegisterForm() {
  const [type, setType] = useState<PostType>("text")

  const form = useForm<z.infer<typeof combinedSchema>>({
    resolver: zodResolver(combinedSchema),
    defaultValues: {
      datetime: new Date()
    },
  })
 
  function onSubmit(values: z.infer<typeof combinedSchema>) {
    const toastId = toast('Creating post...')

    // toast.loading spinner doesn't work so this is a quick fix
    toast((
      <div className="flex items-center gap-1">
        <Loader className="animate-spin" style={{ animationDuration: "1.5s" }} height={16} width={16} />
        <span>Creating post...</span>
      </div>
    ), { id: toastId })

    createPost(values).then(data => {
      if (data?.error) toast.error(data.error.message, { id: toastId })
      else toast.success(`${capitalize(values.type)} post has been created`, { id: toastId })
    }).catch(err => {
      toast.error(err.message, { id: toastId })
    })
  }

  const handleTextareaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  useEffect(() => {
    form.setValue("type", type)
  }, [type])

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="grid gap-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
              </FormItem>
            )}
          />

        <input type="hidden" name="type" value={type} />

        <RadioGroup defaultValue="comfortable" className="grid grid-cols-[auto,auto,auto] rounded-sm p-1 bg-muted">
          <RadioPostItem onSelect={(v) => setType(v)} isSelected={type === "text"} id="post-text" value="text" label="Text" />
          <RadioPostItem onSelect={(v) => setType(v)} isSelected={type === "log"} id="post-log" value="log" label="Log" />
          <RadioPostItem onSelect={(v) => setType(v)} isSelected={type === "media"} id="post-media" value="media" label="Media" />
        </RadioGroup> 

        <div className="grid gap-2 grid-cols-[auto_1fr]">
          <div className="flex items-start justify-center h-[54px]"> 
            <div className="rounded-full self-center overflow-hidden border flex items-center justify-center bg-green-200">
              <Image src="/tree1.png" width={50} height={50} alt="Avatar" />
            </div>
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-0 max-h-[30vh] p-4 text-lg leading-5 resize-none"
                    rows={1}
                    placeholder="What's on your mind?"
                    onInput={handleTextareaInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {type === "log" && (<>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    autoComplete="on"
                    type="text"
                    className="px-3 py-2" 
                    placeholder="Enter activity or substance name" 
                    {...field} />
                </FormControl>
                <FormDescription className="pl-2 text-xs text-end !mt-1">(Sleep, Coffee, Running)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-x-2 grid-cols-[1fr_auto]">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      autoComplete="on" 
                      type="number"
                      step={0}
                      min={0}
                      className="px-3 py-2" 
                      placeholder="Enter amount" 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="w-min">
                  <Select onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gram">g</SelectItem>
                      <SelectItem value="miligram">mg</SelectItem>
                      <SelectItem value="hour">h</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription className="col-span-2 pl-2 text-xs text-end !mt-1">(4h, 10mg, 2 cups)</FormDescription>
          </div>
          <FormField
            control={form.control}
            name="variant"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    autoComplete="on"
                    type="text"
                    className="px-3 py-2" 
                    placeholder="Enter variant (if applicable)" 
                    {...field} />
                </FormControl>
                <FormDescription className="pl-2 text-xs text-end !mt-1">(Bali, Medium roast, Morning run)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appearance"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    autoComplete="on"
                    type="text"
                    className="px-3 py-2" 
                    placeholder="Enter color or appearance (if applicable)" 
                    {...field} />
                </FormControl>
                <FormDescription className="pl-2 text-xs text-end !mt-1">(Green, Foamy, Energetic)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>)}

        <div className="grid gap-4 items-center grid-cols-[1fr_auto]">

        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DateTimePickerForm 
                  className="px-3 py-2"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="py-6 px-8 uppercase text-2xl font-semibold bg-gradient-to-r from-green-500 from-20% to-primary" type="submit">Enter</Button>

        </div>
      </form>
    </Form>
  )
}

function RadioPostItem({ id, value, label, isSelected, onSelect }: { id: string, value: PostType, label: string, isSelected: boolean, onSelect: (value: PostType) => void }) {
  return (
    <div className="text-center grid">
      <RadioGroupItem className="hidden" checked={isSelected} value={value} id={id} />
      <Label htmlFor={id} onClick={() => onSelect(value)} className={cn("transition-all cursor-pointer px-3 py-2 rounded-sm text-muted-foreground", isSelected && "text-foreground bg-background")}>{label}</Label>
    </div>
  )
}
