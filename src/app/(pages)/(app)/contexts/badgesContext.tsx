"use client"

import { createContext, useContext } from "react";
import { ProfileFull } from "@app/utils/types";

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
