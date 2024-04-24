import Error from "@app/components/Error"
import InfinitePostFeed from "@app/components/InfinitePostFeed"
import { getPaginatedPosts } from "@app/utils/server/getPosts"
import { PostTypeEnum } from "@app/utils/types"

export default async function ServerFeedWrapper({ 
  profileId, parentId, type, following  
}: {
  profileId?: string,
  parentId?: string,
  type?: "reply" | PostTypeEnum,
  following?: boolean
}) {
  const { data: posts, error: error } = await getPaginatedPosts({ 
    limit: 10,
    offset: 0,
    type: type,
    profile_id: profileId,
    parent_id: parentId,
    following: following,
  })

  if (error) return <Error message={error.message} />

  if (!posts.length) {
    return (
      <div className="h-full p-6 flex items-center justify-center text-lg text-gray-500">
        No posts found :(
      </div>
    )
  }

  return (
    <InfinitePostFeed 
      type={type} 
      profileId={profileId} 
      parentId={parentId} 
      defaultPosts={posts} 
      following={following} 
    />
  )
}
