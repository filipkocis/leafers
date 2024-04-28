import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@shadcn/components/ui/hover-card"
import { capitalize } from "@utils/string"
import { getCheckmarkDescription } from "../utils/checkmarkStyles"
import ProfileBadgeBasic from "./ProfileBadge"

export default function HoverCardCheckmark({ children, role }: { children: React.ReactNode, role: string }) {
  const description = getCheckmarkDescription(role)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div>{children}</div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">This account is</span>
            <ProfileBadgeBasic role={role} />
          </div>

          <p className="text-sm text-wrap break-words overflow-hidden">
            This account is <u>{capitalize(role)}</u> {description && `, ${description}`} 
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
