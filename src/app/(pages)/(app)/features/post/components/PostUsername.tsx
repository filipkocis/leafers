import { NoPropagationLink } from "@components/NoPropagationLink";
import { cn } from "@shadcn/lib/utils";

export default function PostUsername({ username, displayName }: { username: string, displayName?: string | null }) {
  return (
    <div className="overflow-hidden flex items-center gap-2">
      {!!displayName &&
        <NoPropagationLink
          href={`/profile/${username}`}
          className={cn(
            "overflow-hidden text-ellipsis whitespace-nowrap font-bold text-[1rem] hover:underline"
          )}
        >
          {displayName}
        </NoPropagationLink>
      }
      <NoPropagationLink
        href={`/profile/${username}`}
        className={cn(
          "overflow-hidden text-ellipsis hover:underline", 
          displayName ? "text-muted-foreground" : "font-bold text-[1rem]"
        )}
      >
        @{username}
      </NoPropagationLink>
    </div>
  )
}
