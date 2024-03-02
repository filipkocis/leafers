import { getPostById } from "@app/utils/server/getPosts"
import Error from "@app/components/Error"
import NewPostForm from "../components/NewPostForm"
import PostReplies from "../components/PostReplies"
import Post from "@app/features/post/Post"

export default async function PostPage({ params: { id } }: { params: { id: string }}) {
  const post = await getPostById(id)
  if (post.error) return <Error message={post.error.message} />

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-b">
        <Post className="border-none shadow-none" post={post.data} />  
      </div>

      <div className="border-b p-3">
        <NewPostForm tabs="bottom" />
      </div>

      <PostReplies id={id} />
    </div>
  )
}
