"use client"

import { cn } from "@shadcn/lib/utils"
import PostData from "./components/PostData"
import PostContainer from "./components/PostContainer"
import ProfilePicture from "@app/components/ProfilePicture"
import PostInteractionButtons from "./components/PostInteractionButtons"
import { PostWithProfileAndCounts } from "@app/utils/types"
import { NoPropagationLink } from "@components/NoPropagationLink"
import PostOptionsButton from "./components/PostOptionsButton"
import { ProfileUsernameAndCheckmarks } from "@app/features/profile/components/ProfileUsernameAndCheckmarks"

const deletedProfile = { username: "deleted", id: "deleted", display_name: null, avatar_url: null }

export default function Post({ post, className}: { post: PostWithProfileAndCounts, className?: string }) {
  const profile = post.profiles || deletedProfile

  return (
    <PostContainer 
      className={cn(
        "grid grid-cols-[auto_1fr] gap-2 border-0 border-b shadow-none", 
        className
      )}
    >
      <NoPropagationLink className="self-start" href={`/profile/${profile.username}`}>
        <ProfilePicture src={post.profiles?.avatar_url} alt="Profile picture" size={42} />
      </NoPropagationLink>
      
      <div className="grid gap-1">
        <div className="grid">
          <div className="grid grid-cols-[1fr,auto]">
            <ProfileUsernameAndCheckmarks
              profile={profile}
              timestamp={post.created_at}
              timestampHref={`/post/${post.id}`}
            />
            <PostOptionsButton post={post} />
          </div>

          <p className="" style={{ wordBreak: "break-word" }}>{post.content}</p>
        </div>

        <PostData id={post.id} type={post.type} />
      </div>

      <PostInteractionButtons 
        id={post.id} 
        likes={post.likes_count} 
        replies={post.replies_count} 
        reposts={post.reposts_count} 
      />
    </PostContainer>
  )
}
