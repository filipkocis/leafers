"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@shadcn/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@shadcn/components/ui/form"
import { Input } from "@shadcn/components/ui/input"
import loginUserSchema from "../utils/loginUserSchema"
import { loginUser } from "../actions/loginUser"

export default function RegisterForm() {
  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof loginUserSchema>) {
    // TODO: show state with toast
    console.log(values)
    loginUser(values).then(res => console.log(res)).catch(err => console.error(err)).finally(() => console.log("finished login process"))
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="grid gap-6">
       <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  className="px-4 py-6" 
                  placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  type="password"
                  className="px-4 py-6" 
                  placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="py-6 px-8 uppercase text-2xl font-semibold bg-gradient-to-r from-green-500 from-20% to-primary" type="submit">Enter</Button>
      </form>
    </Form>
  )
}
