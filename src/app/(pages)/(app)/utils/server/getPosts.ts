import createClient from "@services/supabase/server";
import { errorMessage, dataNonNull } from "@utils/returnObjects";
import { PaginatedPostsParams } from "../types";
import { getNumberFromSqlCount } from "../helpers";

export async function getPaginatedPosts({ 
  parent_id, limit = 10, offset = 0, profile_id, type, following = false 
}: PaginatedPostsParams) {
  try {
    const supabase = await createClient();

    const baseQuery = following ? supabase.rpc('get_followed_posts') : supabase.from('posts'); 

    let query = baseQuery
      .select('*, profiles!public_posts_profile_id_fkey!inner(id, username, display_name, avatar_url), replies_count:posts!parent_id(count), likes_count:likes(count), reposts_count:reposts!post_id(count)')
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, limit + offset - 1);

    // TODO: Add query params to the rpc, it doesnt work here i guess;
    if (!following) {
      // @ts-ignore
      if (parent_id) query = query.eq('parent_id', parent_id);
      // @ts-ignore
      if (profile_id) { query = query.eq("profile_id", profile_id) }
      if (type) {
        // @ts-ignore
        if (type === "reply" && !parent_id) query = query.not("parent_id", "is", null)
        // @ts-ignore
        else query = query.eq("type", type)
      }
    }

    const { data, error } = await query;
    if (error) throw error

    const mapped = data.map(d => {
      return {
        ...d,
        likes_count: getNumberFromSqlCount(d.likes_count),
        replies_count: getNumberFromSqlCount(d.replies_count),
        reposts_count: getNumberFromSqlCount(d.reposts_count),
      }
    })

    return dataNonNull(mapped)
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load posts")
  }
}
