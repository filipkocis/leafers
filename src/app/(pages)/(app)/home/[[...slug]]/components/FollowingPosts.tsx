import { getFollowedPosts } from "@app/utils/server/getPosts"
import Error from "@app/components/Error"
import LinkPost from "@app/features/post/LinkPost"

export default async function FollowingPosts() {
  const { data: posts, error } = await getFollowedPosts()

  if (error) return <Error message={error.message} />

  return (
    <div className="grid">
      {posts.map((post => (
        <LinkPost post={post} key={post.id} />
      )))}
    </div>
  )
}
