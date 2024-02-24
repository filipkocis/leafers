"use server"

import { z } from "zod";
import registerUserSchema from "../utils/registerUserSchema";
import createClient from "@/app/services/supabase/action";
import { RedirectType, redirect } from "next/navigation";

export async function registerUser(values: z.infer<typeof registerUserSchema>) {
  try {
    const validUserData = registerUserSchema.parse(values)
    const supabase = await createClient()

    const { data: { user, session }, error: signUpError } = await supabase.auth.signUp({
      email: validUserData.email,
      password: validUserData.password
    })

    if (signUpError) {
      // user already registered is only thrown if email confirmation is disabled
      // if enabled, implement a custom check
      throw signUpError
    }
   
    if (user?.id) {
      const { error: insertError } = await supabase.from("profiles").insert({
        auth_user_id: user.id,
        username: validUserData.username
      })

      if (insertError) {
        // user should be deleted here, but the error should not happend
        throw insertError
      }

      const { error: loginError } = await supabase.auth.signInWithPassword(validUserData)
      
      if (loginError) {
        throw loginError
      }
    }
  } catch (error) {
    console.log(error)
    return error
  }
  
  redirect('/home', RedirectType.replace)
}
