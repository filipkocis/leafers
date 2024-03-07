import { cn } from "@shadcn/lib/utils";

export default function PostUsername({ username, displayName }: { username: string, displayName?: string | null }) {
  return (
    <div className="overflow-hidden flex items-center gap-2">
      {!!displayName &&
        <p className={cn("overflow-hidden text-ellipsis whitespace-nowrap font-bold text-[1rem]")}>{displayName}</p>
      }
      <p className={cn("overflow-hidden text-ellipsis", displayName ? "text-muted-foreground" : "font-bold text-[1rem]")}>@{username}</p>
    </div>
  )
}
