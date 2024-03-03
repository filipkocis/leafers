"use client"

import { LucideHeart, LucideReplyAll, LucideShare } from "lucide-react";

export default function PostInteractionButtons({ id }: { id: string }) {
  return (
    <div className="col-span-2 flex justify-around [&>*]:p-1 [&>*]:rounded-full"> 
      <div className="hover:text-red-500 hover:bg-red-500/25 hover:shadow-[0_0_0_0.2rem_rgb(239_68_68_/_0.25)]">
        <LucideHeart size={16} />
      </div>
      <div className="hover:text-primary hover:bg-primary/25 hover:shadow-[0_0_0_0.2rem_hsl(var(--primary)_/_25%)]">
        <LucideReplyAll size={16} />
      </div>
      <div className="hover:text-primary hover:bg-primary/25 hover:shadow-[0_0_0_0.2rem_hsl(var(--primary)_/_25%)]">
        <LucideShare size={16} />
      </div>
    </div>
  )
}
