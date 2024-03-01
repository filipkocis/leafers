import Post from "@app/components/post/Post"
import { getPostById } from "@app/utils/server/getPosts"
import Error from "@app/components/Error"
import NewPostForm from "../components/NewPostForm"
import PostReplies from "../components/PostReplies"
import { LucideHeart, LucideReplyAll, LucideShare } from "lucide-react"

export default async function PostPage({ params: { id } }: { params: { id: string }}) {
  const post = await getPostById(id)
  if (post.error) return <Error message={post.error.message} />

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-b">
        <Post className="border-none shadow-none" post={post.data} />  
        <div className="flex justify-around [&>*]:p-2 p-1 [&>*]:rounded-full"> 
          <div className="hover:bg-muted">
            <LucideHeart size={20} />
          </div>
          <div className="hover:bg-muted">
            <LucideReplyAll size={20} />
          </div>
          <div className="hover:bg-muted">
            <LucideShare size={20} />
          </div>
        </div>
      </div>

      <div className="border-b p-3">
        <NewPostForm tabs="bottom" />
      </div>

      <PostReplies id={id} />
    </div>
  )
}
