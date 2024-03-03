"use client"

import { cn } from "@shadcn/lib/utils"
import { formatPostDate } from "@utils/format"
import PostData from "./components/PostData"
import PostContainer from "./components/PostContainer"
import ProfilePicture from "@app/components/ProfilePicture"
import PostInteractionButtons from "./components/PostInteractionButtons"
import PostUsername from "./components/PostUsername"
import { PostWithProfile } from "@app/utils/types"

export default function Post({ post, className}: { post: PostWithProfile, className?: string }) {
  return (
    <PostContainer className={cn("grid grid-cols-[auto_1fr] gap-2 border-0 border-b shadow-none", className)}>
      <ProfilePicture className="self-start" src={post.profiles.avatar_url} alt="Profile picture" size={42} />
      
      <div className="grid gap-1">
        <div className="grid">
          <div className="leading-5 text-[0.94rem] flex flex-wrap items-center gap-1 overflow-hidden">
            <PostUsername username={post.profiles.username} displayName={post.profiles.display_name} />
            <div className="flex items-center gap-1 text-muted-foreground">
              <p className="text-muted-foreground">•</p>
              <p className="text-muted-foreground whitespace-nowrap">{formatPostDate(post.created_at)}</p>
            </div>
          </div>

          <p className="" style={{ wordBreak: "break-word" }}>{post.content}</p>
        </div>

        <PostData id={post.id} type={post.type} />
      </div>

      <PostInteractionButtons id={post.id} />
    </PostContainer>
  )
}
