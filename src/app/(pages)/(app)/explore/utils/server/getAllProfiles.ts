import createClient from "@services/supabase/server";
import { dataNonNull, errorMessage } from "@utils/returnObjects";

export async function getAllProfiles() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("profiles").select("*")

    if (error) throw error;

    return dataNonNull(data)
  } catch (error) {
    return errorMessage(error)
  }
}
