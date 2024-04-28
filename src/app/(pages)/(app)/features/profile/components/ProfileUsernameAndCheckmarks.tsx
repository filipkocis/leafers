import { NoPropagationLink } from "@components/NoPropagationLink"
import Checkmarks from "@app/features/badges/Checkmarks"
import { formatPostDate } from "@utils/format"
import { Profile } from "@app/utils/types"
import { cn } from "@shadcn/lib/utils"

type Props = { 
  profile: Profile, className?: string
} & ({ 
  timestamp: string, timestampHref: string 
} | {
  timestamp?: undefined, timestampHref?: undefined 
})

export function ProfileUsernameAndCheckmarks({ profile, timestamp, timestampHref, className }: Props) {
  return (
    <div className={cn("leading-5 text-[0.95rem] whitespace-nowrap flex flex-wrap items-start gap-1 overflow-hidden", className)}>
      <div className="items-center grid gap-2 grid-cols-[auto_1fr]">        
        <NoPropagationLink href={`/profile/${profile.username}`} className="font-bold text-ellipsis hover:underline">
          <p className="">{profile.display_name || `@${profile.username}`}</p>
        </NoPropagationLink>
        <Checkmarks profileId={profile.id} />
      </div>

      <div className="flex gap-1">
        <NoPropagationLink href={`/profile/${profile.username}`} className="text-muted-foreground text-ellipsis hover:underline">
          {!!profile.display_name && `@${profile.username}`}
        </NoPropagationLink>

        {!!timestamp &&
        <div className="text-[0.94rem] flex items-center gap-1 text-muted-foreground">
          <p>•</p>
          <NoPropagationLink href={timestampHref} className="hover:underline">
            <span suppressHydrationWarning>{formatPostDate(timestamp)}</span>
          </NoPropagationLink>
        </div>     
        }
      </div>     
    </div>
  )
}
