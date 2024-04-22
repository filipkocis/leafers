import createClient from "@services/supabase/server";
import { dataNonNull, errorMessage } from "@utils/returnObjects";
import { SubscriptionStatusType } from "../types";

export async function getSubscriptionState(name: string) {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("name", name.toLowerCase())
      .single()

    const state = { 
      granted: false, 
      requested: false, 
      rejected: false, 
    } as SubscriptionStatusType

    if (error) return dataNonNull(state)

    if (data.rejected) state.rejected = true
    else if (data.granted) state.granted = true
    else state.requested = true

    return dataNonNull(state)
  } catch (error) {
    return errorMessage(error)
  }
}
