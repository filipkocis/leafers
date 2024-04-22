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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shadcn/components/ui/dropdown-menu"
import ProfilePicture from "@app/components/ProfilePicture"
import Link from "next/link"
import DropdownLogout from "./DropdownLogout"

export function LayoutHeaderProfileDropdown({ 
  avatarUrl, displayName, username 
}: { 
  avatarUrl: string | null, displayName: string | null, username: string 
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-4 cursor-pointer">
          <p className="text-lg font-semibold">
            {displayName || '@' + username}
          </p>
          <ProfilePicture src={avatarUrl} alt="Profile picture" size={42} /> 
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
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

