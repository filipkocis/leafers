"use client"

import { useWindowSize } from "@hooks/useWindowSize";
import { createContext, useContext } from "react";

export const IsMobileContext = createContext<boolean | undefined>(undefined)

export default function IsMobileProvider({ children }: { children: React.ReactNode }) {
  const window = useWindowSize()
  const isMobile = window.width !== undefined ? window.width < 640 : undefined

  return (
    <IsMobileContext.Provider value={isMobile}>
      {children}
    </IsMobileContext.Provider>
  )
}

export function useIsMobile() {
  return useContext(IsMobileContext)
}
