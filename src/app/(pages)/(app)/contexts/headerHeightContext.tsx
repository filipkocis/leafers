"use client"

import { createContext, useContext } from "react";

export const HeaderHeightContext = createContext<string>("4.6rem")

export default function HeaderHeightProvider({ children, value }: { children: React.ReactNode, value: string }) {
  return (
    <HeaderHeightContext.Provider value={value}>
      {children}
    </HeaderHeightContext.Provider>
  )
}

export function useHeaderHeight() {
  return useContext(HeaderHeightContext)
}
