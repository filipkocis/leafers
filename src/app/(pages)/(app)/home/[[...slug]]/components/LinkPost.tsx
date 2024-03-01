import Link from "next/link";
import Post from "@app/components/post/Post";

export default function LinkPost({ post, href, className }: { post: any, href: string, className?: string }) {
  return (
    <Link href={href} className="hover:bg-muted/30">
      <Post post={post} className={className} />
    </Link>
  )
}
