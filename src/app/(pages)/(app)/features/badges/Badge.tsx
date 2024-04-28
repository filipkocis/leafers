import HoverCardCheckmark from "./components/HoverCardCheckmark";
import ProfileBadgeBasic from "./components/ProfileBadge";

export default function Badge({ small, role, index = 0 }: { small?: boolean, role: string, index?: number }) {
  return (
    <HoverCardCheckmark role={role}>
      <ProfileBadgeBasic small={small} role={role} index={index} />
    </HoverCardCheckmark>
  )
}
