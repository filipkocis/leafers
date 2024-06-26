import createClient from "@services/supabase/server";
import { dataNonNull, errorMessage } from "@utils/returnObjects";
import { BADGES_ORDER } from "../badgeStyles";
import { ProfileFull } from "@app/utils/types";
import { compareDateAge } from "@utils/date";

export async function getProfileBadgesOrdered(profile: ProfileFull) {
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


export async function getProfileBadgesArray(profile_id: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("roles")
      .select("role")
      .eq("profile_id", profile_id);

    if (error) throw error;

    const badges = data.map(badge => badge.role);

    return dataNonNull(badges)
  } catch (error) {
    return errorMessage(error);
  }
}
