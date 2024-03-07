import createClient from "@services/supabase/client";
import { dataNonNull, errorMessage } from "@utils/returnObjects";
import { PaginationConfig, RepliesParams } from "../types";

export async function getPaginatedPosts({ parent_id, limit = 10, offset = 0 }: RepliesParams & PaginationConfig) {
  try {
    const supabase = createClient();
    let query = supabase
      .from('posts')
      .select('*, profiles!inner(id, username, display_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, limit + offset - 1);

    if (parent_id) query = query.eq('parent_id', parent_id);
    const { data, error } = await query;

    if (error) throw error

    return dataNonNull(data)
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load posts")
  }
}
