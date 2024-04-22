import createClient from "@services/supabase/server";
import { dataNonNull, errorMessage } from "@utils/returnObjects";

export async function getProfileStats(profileId: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase.rpc("get_profile_count_stats", { pid: profileId }).single()

    if (error) throw error

    return dataNonNull(data as CountType)
  } catch (error) {
    return errorMessage(error)
  }
}

type CountType = { 
  posts_count: number,
  replies_count: number,
  reposts_count: number,
  logs_count: number,
  followers_count: number,
  following_count: number,
}
