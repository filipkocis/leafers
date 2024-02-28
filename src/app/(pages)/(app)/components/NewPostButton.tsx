"use client"

import { Button } from "@/app/lib/shadcn/components/ui/button";
import { cn } from "@/app/lib/shadcn/lib/utils";
import { LucideFeather } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NewPostButton() {
  const pathname = usePathname()
  const isPostPage = pathname === "/post"

  return (
    <Button className="rounded-full h-auto p-3 font-semibold text-[1.1rem]" asChild>
      {isPostPage ? (
        <div className="cursor-pointer max-lg:w-min">
          <ButtonContent />
        </div>
      ) : (
        <Link className="max-lg:w-min" href={"/post"}>
          <ButtonContent />
        </Link>
      )}
    </Button>
  )
}

function ButtonContent() {
  return (
    <>
      <span className="hidden lg:inline-block">Post</span>
      <LucideFeather className="lg:hidden" width={28} height={28} />
    </>
  )
}
