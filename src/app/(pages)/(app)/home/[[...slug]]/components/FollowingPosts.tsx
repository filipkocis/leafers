import { getFollowedPosts } from "@app/utils/server/getPosts"
import Error from "@app/components/Error"
import LinkPost from "./LinkPost"

export default async function FollowingPosts() {
  const posts = await getFollowedPosts()

  if (posts.error) return <Error message={posts.error.message} />

  return (
    <div className="grid">
      {posts.data.map((post => (
        <LinkPost href={`/post/${post.id}`} post={post} key={post.id} />
      )))}
    </div>
  )
}
