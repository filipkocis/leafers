import { cn } from "@shadcn/lib/utils";
import Link from "next/link";

export default function PostUsername({ username, displayName }: { username: string, displayName?: string | null }) {
  return (
    <div className="overflow-hidden flex items-center gap-2">
      {!!displayName &&
        <p className={cn("overflow-hidden text-ellipsis whitespace-nowrap font-bold text-[1rem]")}>{displayName}</p>
      }
      <Link 
        href={`/profile/${username}`} 
        className={cn(
          "overflow-hidden text-ellipsis hover:underline ", 
          displayName ? "text-muted-foreground" : "font-bold text-[1rem]"
        )}
      >
        @{username}
      </Link>
    </div>
  )
}
