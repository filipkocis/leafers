import createClient from "@services/supabase/server";
import { dataNonNull, errorMessage } from "@utils/returnObjects";
import { BADGES_ORDER } from "../types";
import { ProfileFull } from "@app/utils/types";
import { compareDateAge } from "@utils/date";

export async function getProfileBadges(profile: ProfileFull) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("roles").select("role").eq("profile_id", profile.id);
    if (error) throw error;

    if (compareDateAge(profile.created_at, 30)) data.push({ role: "new" })

    const badges = data
      .map(e => { return { 
        role: e.role, 
        order: BADGES_ORDER[e.role] 
      }})
      .sort((a, b) => a.order - b.order)

    return dataNonNull(badges)
  } catch (error) {
    return errorMessage(error);
  }
}
