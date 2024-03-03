"use server"

import createClient from "@services/supabase/action";
import { dataNonNull, errorMessage } from "@utils/returnObjects";

export async function getLogPostData(id: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("logs")
      .select('*')
      .eq('post_id', id)
      .single()

    if (error) throw error
    if (!data) throw new Error("No log post found")

    return dataNonNull(data)
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load log post")
  }
}
