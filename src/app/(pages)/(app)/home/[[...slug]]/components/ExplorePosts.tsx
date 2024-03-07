import { getPaginatedPosts } from "@app/utils/server/getPosts"
import Error from "@app/components/Error"
import InfinitePostFeed from "./InfinitePostFeed"

export default async function ExplorePosts() {
  const { data: posts, error } = await getPaginatedPosts({ limit: 10, offset: 0 })

  if (error) return <Error message={error.message} />

  return (
    <div className="grid">
      <InfinitePostFeed defaultPosts={posts} />
    </div>
  )
}
