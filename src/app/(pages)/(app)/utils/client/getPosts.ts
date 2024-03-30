"use client"

import createClient from "@services/supabase/client";
import { dataNonNull, errorMessage } from "@utils/returnObjects";
import { PaginationConfig, RepliesParams } from "../types";
import { getNumberFromSqlCount } from "../helpers";

export async function getPaginatedPosts({ parent_id, limit = 10, offset = 0 }: RepliesParams & PaginationConfig) {
  try {
    const supabase = createClient();
    let query = supabase
      .from('posts')
      .select('*, profiles!inner(id, username, display_name, avatar_url), replies_count:posts!parent_id(count), likes_count:likes(count), reposts_count:reposts!post_id(count)')
      .order('created_at', { ascending: false })
      .limit(limit)
      .range(offset, limit + offset - 1);

    if (parent_id) query = query.eq('parent_id', parent_id);
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
