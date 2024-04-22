"use client"

import { usePathname } from "next/navigation"
import { 
  LucideCctv, 
  LucideCpu, 
  LucideFlame, 
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

export default function SideNavItems({ adminPrivileges }: { adminPrivileges: boolean }) {
  return (
    <div className="grid gap-2 max-lg:items-center">
      <SideNavButton href="/home" label="Home" Icon={LucideHome} /> 
      <SideNavButton disabled={true} href="/explore" label="Explore" Icon={LucideCctv} /> 
      <SideNavButton disabled={true} href="/chat" label="Chat" Icon={LucideMessagesSquare} /> 
      <SideNavButton disabled={true} href="/leaderboard" label="Leaderboard" Icon={LucideMedal} /> 
      <SideNavButton href="/profile" label="Profile" Icon={LucideLeaf} /> 
      <SideNavButton disabled={true} href="/ai" label="AI" Icon={LucideCpu} /> 
      <SideNavButton href="/premium" label="Premium" Icon={LucideFlame} /> 
      <SideNavButton visible={adminPrivileges} href="/admin" label="Admin" Icon={LucideKey} /> 
    </div>
  )
}

function SideNavButton({ 
  disabled, visible, href, label, Icon 
}: { 
  disabled?: boolean, visible?: boolean, href: string, label: string, Icon: LucideIcon 
}) {
  if (visible === false) return null;

  const pathname = usePathname();

  return (
    <li>
      <Button 
        variant="secondary" 
        className={cn(
          "text-xl lg:w-[250px] h-auto bg-transparent p-0 rounded-full font-normal",
          disabled ? "cursor-not-allowed" : "hover:bg-primary/10", 
          pathname.startsWith(href) && "font-semibold text-primary"
        )} asChild>
        <Link href={disabled ? "#" : href} className="gap-4 p-3 lg:px-4 lg:py-3 flex lg:grid-cols-[auto_1fr] lg:grid">
          <Icon width={28} height={28} />
          <span className="hidden lg:inline-block">{label}</span>
        </Link>
      </Button>
    </li>
  )
}
