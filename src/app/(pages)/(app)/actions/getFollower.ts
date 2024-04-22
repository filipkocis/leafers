"use server"

import createClient from "@services/supabase/action";
import { dataNonNull, dataNone, errorMessage } from "@utils/returnObjects";
import { getOwnProfileId } from "@app/utils/server/getProfile";

export async function getFollowStatus(targetProfileId: string) {
  try {
    const supabase = await createClient()

    const { data: ownProfileId, error: profileError } = await getOwnProfileId();
    if (profileError) throw profileError;

    const { data: follow, error: followError } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_id", ownProfileId)
      .eq("followee_id", targetProfileId)
      .limit(1);

    if (followError) throw followError

    return dataNonNull(follow.length > 0);
  } catch (error) {
    return errorMessage(error);
  }
}

export async function followUser(targetProfileId: string) {
  try {
    const supabase = await createClient()

    const { data: ownProfileId, error: profileError } = await getOwnProfileId();
    if (profileError) throw profileError;

    const { error: followError } = await supabase
      .from("follows")
      .insert({
        follower_id: ownProfileId, 
        followee_id: targetProfileId
      })

    if (followError) throw followError;

    return dataNone();
  } catch (error) {
    return errorMessage(error);
  }
}

export async function unfollowUser(targetProfileId: string) {
  try {
    const supabase = await createClient()

    const { data: ownProfileId, error: profileError } = await getOwnProfileId();
    if (profileError) throw profileError;

    const { error: unfollowError } = await supabase
      .from("follows")
      .delete()
      .eq("follower_id", ownProfileId)
      .eq("followee_id", targetProfileId)

    if (unfollowError) throw unfollowError;

    return dataNone();
  } catch (error) {
    return errorMessage(error);
  }
}
