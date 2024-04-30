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
import { useIsMobile } from "@app/contexts/IsMobileContext";

export default function SideNavItems({ adminPrivileges }: { adminPrivileges: boolean }) {
  return (
    <div className="grid gap-2 max-lg:items-center list-none">
      <SideNavButton href="/home" label="Home" Icon={LucideHome} /> 
      <SideNavButton href="/explore" label="Explore" Icon={LucideCctv} /> 
      <SideNavButton disabled={true} href="/chat" label="Chat" Icon={LucideMessagesSquare} /> 
      <SideNavButton disabled={true} href="/leaderboard" label="Leaderboard" Icon={LucideMedal} /> 
      <SideNavButton href="/profile" label="Profile" Icon={LucideLeaf} /> 
      <SideNavButton href="/ai" label="AI" Icon={LucideCpu} /> 
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
  const isMobile = useIsMobile();
  const pathname = usePathname();

  if (visible === false) return null;

  return (
    <li>
      <Button 
        variant="secondary" 
        className={cn(
          "text-xl lg:w-[250px] h-auto bg-transparent p-0 rounded-full font-normal",
          disabled ? "cursor-not-allowed" : "hover:bg-primary/10", 
          pathname.startsWith(href) && "font-semibold text-primary",
          isMobile && "w-full text-lg"
        )} asChild>
        <Link 
          href={disabled ? "#" : href} 
          className={cn(
            "gap-4 p-3 lg:px-4 lg:py-3 flex lg:grid-cols-[auto_1fr] lg:grid",
            isMobile && "px-3 py-2 gap-3 grid grid-cols-[auto_1fr]"
          )}>
          <Icon width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} />
          <span className={cn("hidden lg:inline-block", isMobile && "inline-block")}>{label}</span>
        </Link>
      </Button>
    </li>
  )
}
