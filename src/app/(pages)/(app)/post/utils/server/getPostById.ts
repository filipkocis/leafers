import createClient from "@services/supabase/server";
import { dataNonNull, errorMessage } from "@utils/returnObjects";

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
