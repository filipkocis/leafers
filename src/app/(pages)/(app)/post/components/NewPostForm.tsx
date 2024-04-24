// "use client"
//
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
//
// import { Button } from "@shadcn/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@shadcn/components/ui/form"
// import { Input } from "@shadcn/components/ui/input"
// import { createPost } from "../actions/createPost"
// import { combinedSchema } from "../utils/newPostSchema"
// import { ChangeEvent, useEffect, useRef, useState } from "react"
// import { RadioGroup, RadioGroupItem } from "@shadcn/components/ui/radio-group"
// import { Label } from "@shadcn/components/ui/label"
// import { cn } from "@shadcn/lib/utils"
// import { Textarea } from "@shadcn/components/ui/textarea"
// import DateTimePickerForm from "./DateTimePickerForm"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/components/ui/select"
// import { toast } from "sonner"
// import { capitalize } from "@utils/string"
// import { Loader } from "lucide-react"
// import ProfilePicture from "@app/components/ProfilePicture"
// import { PostTypeEnum } from "@app/utils/types"
// import { useRouter } from "next/navigation"
//
// export default function NewPostForm({ 
//   tabs = "top", 
//   parent, 
//   modalCloser 
// }: { 
//   tabs?: "top" | "bottom", 
//   parent?: string, 
//   modalCloser?: () => void 
// }) {
//   const [type, setType] = useState<PostTypeEnum>("text")
//   const formRef = useRef<HTMLFormElement>(null)
//   const router = useRouter()
//
//   const form = useForm<z.infer<typeof combinedSchema>>({
//     resolver: zodResolver(combinedSchema),
//     defaultValues: {
//       timestamp: new Date(),
//       parent: parent,
//     },
//   })
//  
//   function onSubmit(values: z.infer<typeof combinedSchema>) {
//     form.reset()
//     const toastId = toast('Creating post...')
//
//     // toast.loading spinner doesn't work so this is a quick fix
//     toast((
//       <div className="flex items-center gap-1">
//         <Loader className="animate-spin" style={{ animationDuration: "1.5s" }} height={16} width={16} />
//         <span>Creating post...</span>
//       </div>
//     ), { id: toastId })
//
//     createPost(values).then(({ error }) => {
//       if (error) toast.error(error.message, { id: toastId });
//       else toast.success(`${capitalize(values.type)} post has been created`, { id: toastId });
//     }).catch(err => {
//       toast.error(err.message, { id: toastId })
//     }).finally(() => {
//       if (modalCloser) modalCloser();
//       router.refresh();
//     })
//   }
//
//   const handleTextareaInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     if (e.target) {
//       const oldHeight = e.target.style.height;
//       e.target.style.height = "auto";
//
//       const newHeight = `${e.target.scrollHeight}px`;
//       e.target.style.height = newHeight;
//
//       // timeout hack to prevent top overflow, but it causes a flicker
//       setTimeout(() => {
//         if (oldHeight !== newHeight) resizeForm();
//       }, 0);
//     }
//   };
//
//   const handleUnitChange = (value: string, onChange: (...event: any[]) => void) => {
//     if (value === "null") onChange(undefined)
//     else onChange(value)
//   };
//
//   useEffect(() => {
//     // @ts-ignore
//     // TODO: fix this later and implement validation
//     form.setValue("type", type)
//   }, [type, form])
//
//   // TODO: create a custom hook for this
//   useEffect(() => {
//     resizeForm()
//   }, [formRef, type])
//
//   function resizeForm() {
//     if (!formRef.current) return;
//     
//     const oldHeight = formRef.current.style.height;
//
//     formRef.current.style.height = "auto";
//     const newHeight = `${formRef.current.scrollHeight}px`;
//
//     formRef.current.style.height = oldHeight;
//
//     setTimeout(() => {
//       if (formRef.current) formRef.current.style.height = newHeight;
//     }, 0);
//   }
//
//   return (
//     <Form {...form}>
//       <form 
//         onResize={() => console.log("resized")}
//         ref={formRef}
//         onSubmit={form.handleSubmit(onSubmit)} 
//         className="flex flex-col justify-between gap-3 transition-all overflow-y-hidden p-1"
//       >
//         <input type="hidden" name="type" value={type} />
//
//         {tabs === "top" && <PostTabs type={type} setType={setType} />} 
//
//         <div className="grid gap-2 grid-cols-[auto_1fr]">
//           <ProfilePicture className="self-start" src={undefined} alt="Profile picture" size={50} />
//
//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Textarea
//                     {...field}
//                     className="min-h-0 max-h-[30vh] p-4 text-lg leading-5 resize-none"
//                     rows={1}
//                     placeholder="What's on your mind?"
//                     onInput={handleTextareaInput}
//                   />
//                 </FormControl>
//                 <div className="min-h-[1rem]">
//                 <FormMessage className="min-h-[1rem]" />
//                 </div>
//               </FormItem>
//             )}
//           />
//         </div>
//         
//         {type === "log" && (<>
//           <FormField
//             control={form.control}
//             name="name"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input 
//                     autoComplete="on"
//                     type="text"
//                     className="px-3 py-2" 
//                     placeholder="Enter activity or substance name" 
//                     {...field} />
//                 </FormControl>
//                 <FormDescription className="pl-2 text-xs text-end !mt-1">(Sleep, Coffee, Running)</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="grid gap-x-2 grid-cols-[1fr_auto]">
//             <FormField
//               control={form.control}
//               name="amount"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input 
//                       autoComplete="on" 
//                       type="number"
//                       step={0}
//                       min={0}
//                       className="px-3 py-2" 
//                       placeholder="Enter amount" 
//                       {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="unit"
//               render={({ field }) => (
//                 <FormItem className="w-min">
//                   <Select onValueChange={(value) => handleUnitChange(value, field.onChange)} >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Unit" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="gram">g</SelectItem>
//                       <SelectItem value="miligram">mg</SelectItem>
//                       <SelectItem value="hour">h</SelectItem>
//                       <SelectItem value="null">None</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormDescription className="col-span-2 pl-2 text-xs text-end !mt-1">(4h, 10mg, 2 cups)</FormDescription>
//           </div>
//           <FormField
//             control={form.control}
//             name="variant"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input 
//                     autoComplete="on"
//                     type="text"
//                     className="px-3 py-2" 
//                     placeholder="Enter variant (if applicable)" 
//                     {...field} />
//                 </FormControl>
//                 <FormDescription className="pl-2 text-xs text-end !mt-1">(Bali, Medium roast, Morning run)</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="appearance"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <Input 
//                     autoComplete="on"
//                     type="text"
//                     className="px-3 py-2" 
//                     placeholder="Enter color or appearance (if applicable)" 
//                     {...field} />
//                 </FormControl>
//                 <FormDescription className="pl-2 text-xs text-end !mt-1">(Green, Foamy, Energetic)</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </>)}
//
//         <div className="grow grid items-end gap-4 grid-cols-[1fr_auto]">
//           {type === "log" && (
//             <FormField
//               control={form.control}
//               name="timestamp"
//               render={({ field }) => (
//                 <FormItem className={cn(tabs === "bottom" && "col-span-2")}>
//                   <FormControl>
//                     <DateTimePickerForm 
//                       className="px-3 py-2"
//                       {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           )}
//
//           {tabs === "bottom" && <PostTabs type={type} setType={setType} />} 
//
//           {type !== "log" && tabs !== "bottom" && <div /> }
//
//           <Button 
//             className="place-self-end px-4 py-3 text-lg rounded-full bg-gradient-to-r from-green-500 from-20% to-primary" 
//             type="submit"
//           >
//             Post
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }
//
// function RadioPostItem({ id, value, label, isSelected, onSelect }: { id: string, value: PostTypeEnum, label: string, isSelected: boolean, onSelect: (value: PostTypeEnum) => void }) {
//   return (
//     <div className="text-center grid">
//       <RadioGroupItem className="hidden" checked={isSelected} value={value} id={id} />
//       <Label htmlFor={id} onClick={() => onSelect(value)} className={cn("transition-all cursor-pointer px-3 py-2 rounded-sm text-muted-foreground", isSelected && "text-foreground bg-background")}>{label}</Label>
//     </div>
//   )
// }
//
// function PostTabs({ type, setType }: { type: PostTypeEnum, setType: (type: PostTypeEnum) => void }) {
//   return (
//     <RadioGroup defaultValue="comfortable" className="grid grid-cols-[auto,auto,auto] rounded-sm p-1 bg-muted">
//       <RadioPostItem onSelect={(v) => setType(v)} isSelected={type === "text"} id="post-text" value="text" label="Text" />
//       <RadioPostItem onSelect={(v) => setType(v)} isSelected={type === "log"} id="post-log" value="log" label="Log" />
//       <RadioPostItem onSelect={(v) => setType(v)} isSelected={type === "media"} id="post-media" value="media" label="Media" />
//     </RadioGroup>
//   )
// }
