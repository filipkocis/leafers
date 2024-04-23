"use client"

import { useIsMobile } from "@app/contexts/IsMobileContext";

export default function OnlyDesktop({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return children;
}
