"use client"

import {
  LogOut,
  LucideIcon,
  Settings,
  User,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shadcn/components/ui/dropdown-menu"
import ProfilePicture from "@app/components/ProfilePicture"
import Link from "next/link"
import DropdownLogout from "./DropdownLogout"
import { useProfile } from "@app/contexts/profileContext"

export function LayoutHeaderProfileDropdown() {
  const profile = useProfile()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <ProfilePicture src={profile?.avatar_url} alt="Profile picture" size={42} /> 
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center gap-1.5">
          {`@${profile?.username}`}
          <span className="text-sm font-normal">{profile?.display_name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link href="/profile">
            <MenuItemWrapper Icon={User} label="Profile" />
          </Link>
          <Link href="/settings">
            <MenuItemWrapper Icon={Settings} label="Settings" />
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownLogout className="text-red-500 [&>*]:hover:text-red-500">
          <MenuItemWrapper Icon={LogOut} label="Log out" />
        </DropdownLogout>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MenuItemWrapper({ label, Icon }: { label: string, Icon: LucideIcon }) {
  return (
    <div className="transition-colors grid grid-cols-[auto,1fr] px-2 py-1.5 text-sm items-center rounded-sm hover:bg-accent hover:text-accent-foreground">
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </div>
  )
}

