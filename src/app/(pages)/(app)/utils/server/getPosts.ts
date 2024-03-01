import createClient from "@services/supabase/server";
import { errorMessage, dataSome, dataSomeNonNull, dataNonNull } from "@utils/returnObjects";

type GetPostsConfig = {
  limit: number;
  offset: number;
}

export async function getPostById(id: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles!inner(id, username, display_name, avatar)')
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

export async function getFollowedPosts(config: GetPostsConfig = { limit: 10, offset: 0 }) {
  try {
    throw new Error("following not implemented")
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load posts")
  }
}

export async function getPosts(config: GetPostsConfig = { limit: 10, offset: 0 }) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('posts')
      .select('*, profiles!inner(id, username, display_name, avatar)')
      .order('created_at', { ascending: false })
      .limit(config.limit)
      .range(config.offset, config.limit + config.offset - 1);

    if (error) throw error

    return dataSomeNonNull(data, [])
  } catch (error) {
    console.error(error)
    return errorMessage(error, "Failed to load posts")
  }
}

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

