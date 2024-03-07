"use server"

import createClient from "@services/supabase/action";
import { dataNonNull, dataSomeNonNull, errorMessage } from "@utils/returnObjects";

export async function getPaginatedPosts({ limit = 10, offset = 0 }: { limit: number, offset: number }) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles!inner(id, username, display_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, limit + offset - 1);

    if (error) throw error

    return dataSomeNonNull(data, [])
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load posts")
  }
}

export async function getPostById(id: string) {
  try {
    const supabase = await createClient();
    
    let { data, error } = await supabase
      .from('posts')
      .select('*, profiles!inner(id, username, display_name, avatar_url)')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) throw new Error("No post found")

    return dataNonNull(data)
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load post")
  }
}
