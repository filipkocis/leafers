"use server"

import { z } from "zod";
import { combinedSchema, logPostSchema } from "../utils/newPostSchema";
import createClient from "@services/supabase/action";
import { errorMessage, errorNone } from "@utils/returnObjects";
import { getOwnProfileId } from "@app/utils/server/getProfile";

export async function createPost(values: z.infer<typeof combinedSchema>) {
  try {
    const validPostData = combinedSchema.parse(values)
    const supabase = await createClient()
    const profile = await getOwnProfileId()

    if (profile.error) throw profile.error;

    const { data: postData, error: postError } = await supabase.from("posts").insert({
      type: validPostData.type,
      content: validPostData.content,
      parent_id: validPostData.parent,
      profile_id: profile.data,
    }).select('id').single()

    if (postError) throw postError;
    if (!postData?.id) throw new Error('Post data was not created')

    if (validPostData.type === 'text') return errorNone();
    else if (validPostData.type === 'log') createLogPostEntry(validPostData, postData.id);

    throw new Error(`Post type not implemented: ${validPostData.type}`)
  } catch (error: any) {
    return errorMessage(error, "Error creating post")
  }
}


async function createLogPostEntry(values: z.infer<typeof logPostSchema>, postId: string) {
  try {
    const validPostData = logPostSchema.parse(values)
    const supabase = await createClient()

    const { error: logEntryError } = await supabase.from("log").insert({
      post_id: postId,
      timestamp: validPostData.datetime,
      name: validPostData.name,
      amount: validPostData.amount,
      unit: validPostData.unit,
      variant: validPostData.variant,
      appearance: validPostData.appearance,
    })

    if (logEntryError) {
      throw logEntryError
    }
  } catch (error) {
    // TODO: check if this should be handled in parent post function
    const supabase = await createClient()
    supabase.from('posts').delete().match({ id: postId })
    throw error
  }
}
