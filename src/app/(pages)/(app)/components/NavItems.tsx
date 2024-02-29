"use client"

import { usePathname } from "next/navigation"
import { 
  LucideCctv, 
  LucideCpu, 
  LucideHome, 
  LucideKey, 
  LucideLeaf, 
  LucideMedal, 
  LucideMessagesSquare 
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@shadcn/components/ui/button";
import { cn } from "@shadcn/lib/utils";

export default function NavItems() {
  return (
    <div className="grid gap-2 max-lg:items-center">
      <NavButton href="/home" label="Home" Icon={LucideHome} /> 
      <NavButton href="/explore" label="Explore" Icon={LucideCctv} /> 
      <NavButton href="/chat" label="Chat" Icon={LucideMessagesSquare} /> 
      <NavButton href="/leaderboard" label="Leaderboard" Icon={LucideMedal} /> 
      <NavButton href="/profile" label="Profile" Icon={LucideLeaf} /> 
      <NavButton href="/ai" label="AI" Icon={LucideCpu} /> 
      <NavButton href="/admin" label="Admin" Icon={LucideKey} /> 
    </div>
  )
}

function NavButton({ href, label, Icon }: { href: string, label: string, Icon: LucideIcon }) {
  const pathname = usePathname();

  return (
    <li>
      <Button 
        variant="secondary" 
        className={cn(
          "text-xl lg:w-[250px] h-auto bg-transparent p-0 rounded-full font-normal hover:bg-primary/10", 
          pathname.includes(href) && "font-semibold text-primary"
        )} asChild>
        <Link href={href} className="gap-4 p-3 lg:px-4 lg:py-3 flex lg:grid-cols-[auto_1fr] lg:grid">
          <Icon width={28} height={28} />
          <span className="hidden lg:inline-block">{label}</span>
        </Link>
      </Button>
    </li>
  )
}
