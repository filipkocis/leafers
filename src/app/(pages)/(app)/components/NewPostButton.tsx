"use client"

import { Button } from "@shadcn/components/ui/button";
import { LucideFeather } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@app/contexts/IsMobileContext";
import { cn } from "@shadcn/lib/utils";

export default function NewPostButton() {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const isPostPage = pathname === "/post"

  return (
    <Button className="rounded-full h-auto p-3 font-semibold text-[1.1rem]" asChild>
      {isPostPage ? (
        <div className={cn("cursor-pointer", !isMobile && "max-lg:w-min")}>
          <ButtonContent />
        </div>
      ) : (
        <Link className={cn(!isMobile && "max-lg:w-min")} href={"/post"}>
          <ButtonContent />
        </Link>
      )}
    </Button>
  )
}

function ButtonContent() {
  const isMobile = useIsMobile()

  return (
    <>
      <span className={cn("hidden lg:inline-block", isMobile && "inline-block")}>Post</span>
      <LucideFeather className={cn("lg:hidden", isMobile && "hidden")} width={28} height={28} />
    </>
  )
}
