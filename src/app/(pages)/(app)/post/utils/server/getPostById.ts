import createClient from "@services/supabase/server";
import { dataNonNull, errorMessage } from "@utils/returnObjects";
import { getNumberFromSqlCount } from "@app/utils/helpers";

export async function getPostById(id: string) {
  try {
    const supabase = await createClient();
    
    let { data, error } = await supabase
      .from('posts')
      .select('*, profiles!public_posts_profile_id_fkey!inner(id, username, display_name, avatar_url), replies_count:posts!parent_id(count), likes_count:likes(count), reposts_count:reposts!post_id(count)')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) throw new Error("No post found")

    const mapped = {
      ...data,
      likes_count: getNumberFromSqlCount(data.likes_count),
      replies_count: getNumberFromSqlCount(data.replies_count),
      reposts_count: getNumberFromSqlCount(data.reposts_count),
    }

    return dataNonNull(mapped)
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load post")
  }
}
