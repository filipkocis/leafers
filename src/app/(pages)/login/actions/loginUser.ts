"use server"

import { z } from "zod";
import loginUserSchema from "../utils/loginUserSchema";
import createClient from "@/app/services/supabase/action";
import { RedirectType, redirect } from "next/navigation";

export async function loginUser(values: z.infer<typeof loginUserSchema>) {
  try {
    const validUserData = loginUserSchema.parse(values)
    const supabase = await createClient()

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: validUserData.email,
      password: validUserData.password
    })

    if (signInError) {
      throw signInError
    }
  } catch (error) {
    console.log(error)
    return error
  }

  redirect('/home', RedirectType.replace)
}
