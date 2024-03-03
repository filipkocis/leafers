import { Database } from "@utils/types/supabase"

export type Post = Database["public"]["Tables"]["posts"]["Row"]
export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type PostWithProfile = Post & { profiles: Profile }

export type UnitTypeEnum = Database["public"]["Enums"]["unit_type"]
export type PostTypeEnum = Database["public"]["Enums"]["post_type"]
