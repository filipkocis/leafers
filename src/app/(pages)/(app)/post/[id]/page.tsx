import { getPostById } from "../utils/server/getPostById"
import Error from "@app/components/Error"
import NewPostForm from "../components/NewPostForm"
import PostReplies from "./components/PostReplies"
import Post from "@app/features/post/Post"

export default async function PostPage({ params: { id } }: { params: { id: string }}) {
  const { data: post, error } = await getPostById(id)

  if (error) return <Error message={error.message} />

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-b">
        <Post className="border-none shadow-none" post={post} />  
      </div>

      <div className="border-b p-3">
        <NewPostForm tabs="bottom" parent={post.id} />
      </div>

      <PostReplies id={id} />
    </div>
  )
}
