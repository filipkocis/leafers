"use client"

import createClient from "@services/supabase/client";
import { dataNonNull, errorMessage } from "@utils/returnObjects";

export async function getLogPostData(id: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("logs")
      .select('*')
      .eq('post_id', id)
      .maybeSingle()

    if (error) throw error
    if (!data) throw new Error("No log post found")

    return dataNonNull(data)
  } catch (error) {
    return errorMessage(error, "Failed to load log post")
  }
}
