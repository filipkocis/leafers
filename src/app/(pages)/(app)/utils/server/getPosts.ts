import createClient from "@services/supabase/server";
import { errorMessage, dataSomeNonNull, dataNonNull } from "@utils/returnObjects";
import { PaginationConfig } from "../types";

export async function getFollowedPosts(config: PaginationConfig = { limit: 10, offset: 0 }) {
  try {
    throw new Error("following not implemented")
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load posts")
  }
}

export async function getPostReplies(id: string) {
  const config: PaginationConfig = { limit: 10, offset: 0 }
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select('*, profiles!inner(id, username, display_name, avatar_url)')
      .order('created_at', { ascending: false })
      .limit(config.limit)
      .range(config.offset, config.limit + config.offset - 1)
      .eq('parent_id', id);

    if (error) throw error

    return dataNonNull(data)
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load replies")
  }
}

export async function getPaginatedPosts({ limit = 10, offset = 0 }: PaginationConfig) {
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
