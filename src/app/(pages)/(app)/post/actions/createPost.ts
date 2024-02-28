"use server"

import { z } from "zod";
import { combinedSchema, logPostSchema } from "../utils/newPostSchema";
import createClient from "@/app/services/supabase/action";
import { RedirectType, redirect } from "next/navigation";
import { getUser } from "@/app/utils/server/auth";

export async function createPost(values: z.infer<typeof combinedSchema>) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return
  try {
    const validPostData = combinedSchema.parse(values)
    const supabase = await createClient()
    const user = await getUser()

    if (!user) throw new Error('User not found. Please sign in.')

    const { data: postData, error: postError } = await supabase.from("posts").insert({
      type: validPostData.type,
      content: validPostData.content,
      parent_id: validPostData.parent,
      user_id: user.id,
    }).select('id').single()

    if (postError) {
      throw postError
    }

    if (!postData?.id) throw new Error('Post data was not created')

    if (validPostData.type === 'text') throw new Error('Repost not implemented');
    else if (validPostData.type === 'log') createLogPostEntry(validPostData, postData.id);
    else if (validPostData.type === 'media') throw new Error('Repost not implemented');
    else if (validPostData.type === 'repost') throw new Error('Repost not implemented');
  } catch (error: any) {
    return { error: { message: error?.message || "Error creating a post" } }
  }

  return { error: null }
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
    const supabase = await createClient()
    supabase.from('posts').delete().match({ id: postId })
    throw error
  }
}
