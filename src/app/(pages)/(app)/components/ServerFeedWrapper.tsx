import Error from "@app/components/Error"
import InfinitePostFeed from "@app/components/InfinitePostFeed"
import { getPaginatedPosts } from "@app/utils/server/getPosts"
import { PostTypeEnum } from "@app/utils/types"

export default async function ServerFeedWrapper({ 
  profileId, parentId, type  
}: {
  profileId?: string,
  parentId?: string,
  type?: "reply" | PostTypeEnum
}) {
  const { data: posts, error: error } = await getPaginatedPosts({ 
    limit: 10,
    offset: 0,
    type: type,
    profile_id: profileId,
    parent_id: parentId,
  })

  if (error) return <Error message={error.message} />

  return <InfinitePostFeed type={type} profileId={profileId} parentId={parentId} defaultPosts={posts} />
}
