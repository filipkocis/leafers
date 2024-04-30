"use client"

import { createContext, useContext } from "react";

export const BadgesContext = createContext<string[] | null>(null)

export default function BadgesProvider({ children, value }: { children: React.ReactNode, value: string[] }) {
  return (
    <BadgesContext.Provider value={value}>
      {children}
    </BadgesContext.Provider>
  )
}

export function useBadges() {
  return useContext(BadgesContext)
}
