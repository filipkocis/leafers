"use server"

import { z } from "zod";
import { combinedSchema, logPostSchema } from "../utils/newPostSchema";
import createClient from "@services/supabase/action";
import { dataNonNull, errorMessage } from "@utils/returnObjects";
import { getOwnProfileId } from "@app/utils/server/getProfile";
import { ZodUnitTypeEnum, zodUnitEnum } from "@app/utils/types";

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

    if (validPostData.type === 'text')  return dataNonNull({ id: postData.id });
    else if (validPostData.type === 'log') { 
      await createLogPostEntry(validPostData, postData.id); 
      return dataNonNull({ id: postData.id }); 
    }

    throw new Error(`Post type not implemented: ${JSON.stringify(validPostData)}`)
  } catch (error: any) {
    return errorMessage(error, "Error creating post")
  }
}


async function createLogPostEntry(values: z.infer<typeof logPostSchema>, postId: string) {
  try {
    const validPostData = logPostSchema.parse(values)
    const supabase = await createClient()

    const unit = (zodUnitEnum as any as string[]).includes(validPostData.unit ?? '') ? validPostData.unit as ZodUnitTypeEnum : undefined

    if (validPostData.leaf && unit !== 'gram') {
      throw new Error(`Leaf log post has invalid unit: ${unit}`) 
    }

    const { error: logEntryError } = await supabase.from("logs").insert({
      post_id: postId,
      timestamp: validPostData.timestamp.toISOString(),
      name: validPostData.name || undefined,
      amount: validPostData.amount || undefined,
      unit: unit,
      variant: validPostData.variant || undefined,
      appearance: validPostData.appearance || undefined,
      is_leaf: validPostData.leaf
    })

    if (logEntryError) {
      throw logEntryError
    }
  } catch (error) {
    // TODO: check if this should be handled in parent post function
    const supabase = await createClient()
    await supabase.from('posts').delete().match({ id: postId })
    throw error
  }
}
