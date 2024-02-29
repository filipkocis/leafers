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
import registerUserSchema from "../utils/registerUserSchema"
import { registerUser } from "../actions/registerUser"

export default function RegisterForm() {
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof registerUserSchema>) {
    // TODO: show state with toast
    console.log(values)
    registerUser(values).then(res => console.log(res)).catch(err => console.error(err)).finally(() => console.log("finished registration process"))
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="grid gap-6">
         <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  className="px-4 py-6" 
                  placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button className="py-6 px-8 uppercase text-2xl font-semibold bg-gradient-to-r from-green-500 from-20% to-primary" type="submit">Join</Button>
      </form>
    </Form>
  )
}


// --green-dark: 9, 51, 38;
// --green-light: 124, 186, 49;
// --green-input: 225, 235, 198;
// --green-lime: 204, 228, 47;
// --green-leaf: 136, 176, 75;
// --green-darker: 0, 114, 4;
// --background-color: 247, 250, 229;
