"use client"

import createClient from "@services/supabase/client";
import { dataNonNull, errorMessage } from "@utils/returnObjects";
import { getOwnProfileId } from "@app/utils/client/getProfile";

export async function checkIfLiked(post_id: string, profile_id: string | null) {
  try {
    if (!profile_id) {
      const { data, error: profileIdError } = await getOwnProfileId()
      if (profileIdError) throw profileIdError
      profile_id = data
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("likes")
      .select("profile_id, post_id")
      .eq("profile_id", profile_id)
      .eq("post_id", post_id)
      .maybeSingle()

    if (error) throw error

    const likeExists = !!data

    return dataNonNull({ 
      liked: likeExists
    })
  } catch (error) {
    return errorMessage(error, "Failed to load post like")
  }
}

export async function handlePostLike(post_id: string, profile_id: string | null) {
  try {
    if (!profile_id) {
      const { data, error: profileIdError } = await getOwnProfileId()
      if (profileIdError) throw profileIdError
      profile_id = data
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("likes")
      .select("profile_id, post_id")
      .eq("profile_id", profile_id)
      .eq("post_id", post_id)
      .maybeSingle()

    if (error) throw error

    const like_id = { profile_id, post_id }
    const shouldLike = !data 

    if (shouldLike) await likePost(like_id)
    else await unlikePost(like_id)

    return dataNonNull({ 
      status: shouldLike ? "liked" : "unliked",
      liked: shouldLike
    })
  } catch (error) {
    return errorMessage(error, "Failed to handle post like")
  }
}

async function likePost(like_id: { profile_id: string, post_id: string }) {
  const supabase = createClient();
  const { error } = await supabase
    .from("likes")
    .insert(like_id)

  if (error) throw error
}

async function unlikePost(like_id: { profile_id: string, post_id: string }) {
  const { profile_id, post_id } = like_id

  const supabase = createClient();
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("profile_id", profile_id)
    .eq("post_id", post_id)

  if (error) throw error
}
