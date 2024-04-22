import { Card } from "@shadcn/components/ui/card"
import { LucideCheck } from "lucide-react"
import { SubscriptionType } from "../utils/types"
import { cn } from "@shadcn/lib/utils"
import ProfileBadge from "@app/profile/components/ProfileBadge"
import SubscriptionButton from "./SubscriptionButton"
import { getSubscriptionState } from "../utils/server/subscription"
import { Button } from "@shadcn/components/ui/button"

export default async function SubscriptionCard(subscription: SubscriptionType) {
  const { data: subscriptionState } = await getSubscriptionState(subscription.name)

  return (
    <Card className={cn(
      "w-80 min-h-[28rem] grid grid-rows-[auto,auto,auto,1fr] gap-4 p-4",
      subscription.extra?.highlight && "border-2 border-primary shadow-primary shadow-[0_0_1.5rem_0.5rem]",
      subscription.extra?.card,
    )}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl">{subscription.name}</h2>
          <div className="relative flex items-center justify-center">
            <ProfileBadge role={subscription.badge} />
          </div>
        </div>
        <p className="flex gap-1 items-end">
          <span className="font-bold text-4xl">${subscription.price.toFixed(2)}</span>
          <span className="text-sm">
            {subscription.extra?.lifetime ? "/ account" : "/ month"}
          </span>
        </p>
      </div>

      {subscriptionState ? (
        <SubscriptionButton 
          subscriptionState={subscriptionState} 
          subscriptionName={subscription.name}
          text={subscription.extra?.cta} 
          className={subscription.extra?.button} 
        />
      ) : (
        <Button disabled variant="secondary">Error</Button>
      )}

      <div className="border-foreground/50 border-t h-0 w-full my-2"></div>
      
      <div className="">
        <p className="font-bold">{subscription.description}</p>
        <ul className="">
          {subscription.features.map((feature, index) => (
            <li key={index} className="flex gap-1">
              <LucideCheck size={16} className="m-1" />
              <span>{feature}</span>
            </li>
          ))} 
        </ul>
      </div>
    </Card>
  )
}
