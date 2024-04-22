"use client"

import { cn } from "@shadcn/lib/utils"
import { Button } from "@shadcn/components/ui/button"
import { requestSubscription } from "../actions/subscription"
import { toast } from "sonner"
import { useState } from "react"
import { LucideLoader } from "lucide-react"
import { SubscriptionStatusType } from "../utils/types"

export default function SubscriptionButton({ subscriptionState, subscriptionName, className, text }: { subscriptionState: SubscriptionStatusType, subscriptionName: string, className?: string, text?: string }) {
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(subscriptionState)

  const hasState = Object.values(state).some(Boolean)

  const handleClick = () => {
    if (loading || hasState) return
    setLoading(true)

    requestSubscription(subscriptionName)
      .then(({ error }) => {
        if (error) toast.error(error.message)
        else {
          toast.success("Subscription request sent")
          setState({ requested: true, granted: false, rejected: false })
        }
      })
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false))
  }

  return (
    <Button 
      disabled={loading || hasState} 
      onClick={handleClick} 
      variant={
        state.rejected ? "destructive" : 
        hasState ? "secondary" : "default"
      }
      className={cn(!state.rejected && className)}
    >
      {loading ?
        <LucideLoader size={24} className="animate-spin" />
      :
        state.rejected && "Rejected" ||
        state.requested && "Requested" ||
        state.granted && "Granted" ||
        text || "Subscribe"
      }
    </Button>
  )
}
