import { cn } from "@shadcn/lib/utils"
import { formatPostDate } from "@utils/format"
import PostData from "./PostData"
import PostContainer from "./PostContainer"
import ProfilePicture from "../ProfilePicture"

export default async function Post({ post, className}: { className?: string, post: any }) {
  return (
    <PostContainer className={cn("grid grid-cols-[auto_1fr] gap-2 border-0 border-b shadow-none", className)}>
      <ProfilePicture className="self-start" src={post.profiles.avatar} alt="Profile picture" size={42} />
      
      <div className="grid gap-1 pt-1">
        <div className="grid">
          <div className="leading-5 text-[0.94rem] flex flex-wrap items-center gap-1 overflow-hidden">
            <ProfileName username={post.profiles.username} displayName={post.profiles.display_name} />
            <div className="flex items-center gap-1 text-muted-foreground">
              <p className="text-muted-foreground">•</p>
              <p className="text-muted-foreground whitespace-nowrap">{formatPostDate(post.created_at)}</p>
            </div>
          </div>

          <p className="" style={{ wordBreak: "break-word" }}>{post.content}</p>
        </div>

        <PostData post={post} />
      </div>
    </PostContainer>
  )
}

function ProfileName({ username, displayName }: { username: string, displayName?: string }) {
  return (
    <div className="overflow-hidden flex items-center gap-2">
      {!!displayName &&
        <p className={cn("overflow-hidden text-ellipsis whitespace-nowrap font-bold text-[1rem]")}>{displayName}</p>
      }
      <p className={cn("overflow-hidden text-ellipsis", displayName ? "text-muted-foreground" : "font-bold text-[1rem]")}>@{username}</p>
    </div>
  )
}
