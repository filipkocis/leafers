import { getSession } from "@utils/server/auth"
import { RedirectType, redirect } from "next/navigation"
import LayoutHeader from "@app/components/layout/LayoutHeader"
import { LucideX } from "lucide-react"
import Link from "next/link"
import TIERS from "./utils/tiers"
import SubscriptionCard from "./components/SubscriptionCard"
import OnlyDesktop from "@app/components/OnlyDesktop"

export default async function PremiumPage() {
  const session = await getSession()

  if (!session) redirect('/login', RedirectType.replace) 

  return (
    <div className="flex flex-col relative w-full min-h-[100dvh]">
      <OnlyDesktop>
        <LayoutHeader />
      </OnlyDesktop>

      <div className="p-2 flex items-center justify-start">
        <Link href="/home" className="flex gap-1 items-center">
          <LucideX size={26} />
          <p>Close</p>
        </Link>
      </div>

      <div className="flex flex-col gap-12 p-3 pb-24">
        <div className="pt-24 text-center flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold">Upgrade your Tier</h1>
          <h2 className="">Enhance your experience and unlock premium features with upgrading your account</h2>
        </div>

        <div className="gap-4 flex flex-row justify-center items-center h-full flex-wrap">
          {TIERS.subscriptions.map((tier, index) => (
            <SubscriptionCard key={index} {...tier} />
          ))}
        </div>

        <div className="pt-24 text-center flex flex-col items-center gap-4">
          <h1 className="text-5xl font-bold">Special access Tiers</h1>
          <h2 className="">Request to gain access to exclusive content and special features, become a part of the community</h2>
        </div>

        <div className="gap-4 flex flex-row justify-center items-center h-full flex-wrap">
          {TIERS.special.map((tier, index) => (
            <SubscriptionCard key={index} {...tier} />
          ))}
        </div>

      </div>
    </div>
  )
}
