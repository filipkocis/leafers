"use client"

import { createContext } from "react";

export const ProfileIdContext = createContext<string | null>(null)

export default function ProfileIdProvider({ children, value }: { children: React.ReactNode, value: string }) {
  return (
    <ProfileIdContext.Provider value={value}>
      {children}
    </ProfileIdContext.Provider>
  )
}
