import { Database } from "@utils/types/supabase"

export type Post = Database["public"]["Tables"]["posts"]["Row"]
export type ProfileFull = Database["public"]["Tables"]["profiles"]["Row"]
export type Profile = Omit<ProfileFull, "auth_user_id" | "created_at">
export type PostWithProfile = Post & { profiles: Profile | null }
export type PostWithProfileAndCounts = PostWithProfile & {
  likes_count: number;
  replies_count: number;
  reposts_count: number;
}

export type UnitTypeEnum = Database["public"]["Enums"]["unit_type"]
export type PostTypeEnum = Database["public"]["Enums"]["post_type"]

export const zodUnitEnum = ['gram', 'miligram', 'second', 'hour'] as const
export type ZodUnitTypeEnum = typeof zodUnitEnum[number] 


// check if enums are equal for zod schema and supabase.ts
type AreUnitEnumsEqual = ZodUnitTypeEnum extends UnitTypeEnum 
  ? UnitTypeEnum extends ZodUnitTypeEnum 
    ? true : false 
  : false;
export const areUnitEnumsEqual: AreUnitEnumsEqual = true;

export type PaginationConfig = {
  limit?: number;
  offset?: number;
}

export type RepliesParams = {
  parent_id?: string;
}

export type PaginatedPostsParams = 
  RepliesParams & 
  PaginationConfig & 
  { 
    profile_id?: string, 
    type?: PostTypeEnum | "reply", 
    following?: boolean 
  }
