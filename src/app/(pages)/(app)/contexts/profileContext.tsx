"use client"

import { createContext, useContext } from "react";
import { ProfileFull } from "@app/utils/types";

export const ProfileContext = createContext<ProfileFull | null>(null)

export default function ProfileProvider({ children, value }: { children: React.ReactNode, value: ProfileFull }) {
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  return useContext(ProfileContext)
}
