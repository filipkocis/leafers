"use client"

import { Button } from "@shadcn/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shadcn/components/ui/dropdown-menu"
import { cn } from "@shadcn/lib/utils"
import { LucideCopy, LucideLink, LucidePencil, LucideTrash } from "lucide-react"
import { PostWithProfile } from "@app/utils/types"
import { toast } from "sonner"
import { useProfile } from "@app/contexts/profileContext"
import createClient from "@services/supabase/client"
import { useRouter } from "next/navigation"
import AlertDialog from "@components/AlertDialog"

const SvgIconMore = ({ size = 16, className }: { size?: number, className?: string }) => { 
  return (
    <svg 
      className={cn("fill-current", className)}
      width={`${size}px`}
      height={`${size}px`} 
      viewBox="0 0 24 24" 
      fill="#000000" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8,12a2,2,0,1,1-2-2A2,2,0,0,1,8,12Zm10-2a2,2,0,1,0,2,2A2,2,0,0,0,18,10Zm-6,0a2,2,0,1,0,2,2A2,2,0,0,0,12,10Z" 
        id="Horizontal"
      />
    </svg>
  )
}

export default function PostOptionsButton({ className, post }: { className?: string, post: PostWithProfile }) {
  const profile = useProfile()
  const router = useRouter()

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`)
    toast.info("Link copied to clipboard")
  }

  async function copyContent() {
    await navigator.clipboard.writeText(post.content ?? "")
    toast.info("Content copied to clipboard")
  }

  async function deletePost() {
    const supabase = createClient()
    const { error } = await supabase.from("posts").delete().eq("id", post.id).select("id").single()
    if (error) toast.error("Failed to delelete post")
    else { 
      toast.success("Post deleted")
      router.refresh()
      window.location.reload()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={cn("p-1 w-auto h-auto", className)} variant="ghost" size="icon">
          <SvgIconMore size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => { e.stopPropagation(); }}>
        <DropdownMenuItem onClick={copyLink}>
          <LucideLink size={16} className="mr-2" /> 
          Share link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyContent}>
          <LucideCopy size={16} className="mr-2" /> 
          Copy content
        </DropdownMenuItem>

        {profile?.id === post.profile_id && <>
          <DropdownMenuItem disabled={true} onClick={() => {}}>
            <LucidePencil size={16} className="mr-2" /> 
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AlertDialog
              className="hover:bg-transparent justify-start"
              title="Delete post" 
              description="This action is pernament and cannot be undone. Are you sure you want to delete this post?"
              action="Delete"
              actionVariant="destructive"
              onAction={deletePost}
            > 
              <LucideTrash size={16} className="mr-2" /> 
              Delete
            </AlertDialog>
          </DropdownMenuItem>
        </>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
