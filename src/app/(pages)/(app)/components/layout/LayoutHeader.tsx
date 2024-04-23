"use client"

import { Input } from "@shadcn/components/ui/input";
import Image from "next/image";
import { LayoutHeaderProfileDropdown } from "./LayoutHeaderProfileDropdown";
import Link from "next/link";
import { LayoutHeaderSheet } from "./LayoutHeaderSheet";
import { useIsMobile } from "@app/contexts/IsMobileContext";

export default function LayoutHeader({ height, children }: { height: string, children?: React.ReactNode }) {
  const isMobile = useIsMobile()

  if (isMobile && children === undefined) return null;
  if (isMobile) return (
    <header className="z-50 backdrop-blur-md sticky top-0 px-4 py-3 gap-6 border-b grid grid-cols-[auto_1fr_auto] items-center">
      <LayoutHeaderSheet>{children}</LayoutHeaderSheet>

      <div className="flex justify-center">
        <Image src="/leaf.png" alt="Leafers logo" width={40} height={40} /> 
      </div>

      <LayoutHeaderProfileDropdown />
    </header>
  )

  return (
    <header 
      style={{ height }} 
      className="z-50 backdrop-blur-md sticky top-0 px-4 py-3 gap-6 border-b grid grid-cols-[auto_1fr_auto] items-center"
    >
      <Link href="/" className="max-sm:invisible flex items-center gap-2">
        <Image src="/leaf.png" alt="Leafers logo" width={40} height={40} /> 
        <h1 className="hidden md:block text-3xl font-light">Leafers</h1>
      </Link>

      <Input disabled placeholder="Search" className="max-sm:invisible sm:w-[20rem] max-w-full justify-self-end" />

      <LayoutHeaderProfileDropdown />
    </header>
  )
}
