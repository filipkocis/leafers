"use client"

import { logout } from "@utils/client/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@shadcn/lib/utils";

export default function DropdownLogout({ children, className }: { children: React.ReactNode, className?: string }) {
  const router = useRouter()

  const handleLogout = () => {
    logout().then(({ error }) => {
      if (error) toast.error(error.message)
      else {
        toast.success("Logged out")
        router.refresh()
      }
    }).catch(() => {
      toast.error("Could not log out") 
    })
  }

  return (
    <div 
      onClick={handleLogout} 
      className={cn(
        "h-auto p-0 m-0 cursor-pointer",
        className,
      )}
    >
      {children}
    </div>
  )
}
