"use client"

import { cn } from "@shadcn/lib/utils"
import { useEffect, useState } from "react"
import Checkmark from "./components/Checkmark"
import { getProfileBadgesArray } from "./utils/client/getBadges"

export default function Checkmarks({ className, profileId }: { className?: string, profileId: string }) {
  const [roles, setRoles] = useState<Record<string, boolean>>({}) 

  useEffect(() => {
    getProfileBadgesArray(profileId).then(({ data, error }) => {
      if (error) return;
      const objectified = data.reduce((acc, role) => ({ ...acc, [role]: true }), {})
      setRoles(objectified)
    })
  }, [profileId])

  return (
    <div className={cn("flex gap-0.5", className)}>
      {roles.omnipotent && <Checkmark variant="omnipotent" />}
      {roles.admin && <Checkmark variant="admin" />}
      {roles.vip && <Checkmark variant="vip" />}
      {roles.premium && <Checkmark variant="premium" />}
      {roles.leafer && <Checkmark variant="leafer" />}
      {roles.crypto && <Checkmark variant="crypto" />}
      {roles.chatter && <Checkmark variant="chatter" />}
      {roles.new && <Checkmark variant="new" />}
    </div>
  ) 
}
