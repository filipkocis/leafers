"use server"

import createClient from "@services/supabase/action";
import { dataNone, errorMessage } from "@utils/returnObjects";
import { getUser } from "@utils/server/auth";

export async function requestSubscription(name: string) {
  try {
    const supabase = await createClient()

    const user = await getUser()
    if (!user) throw new Error("User not found")

    const { error } = await supabase.from("subscriptions").insert({
      user_id: user.id,
      name: name.toLowerCase(),
    })

    if (error) throw error

    return dataNone()
  } catch (error) {
    return errorMessage(error)
  }
}
