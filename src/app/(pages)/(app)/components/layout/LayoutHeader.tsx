import { Input } from "@shadcn/components/ui/input";
import Image from "next/image";
import { getOwnProfileData } from "@app/utils/server/getProfile";
import Error from "@app/components/Error";
import { LayoutHeaderProfileDropdown } from "./LayoutHeaderProfileDropdown";
import Link from "next/link";

export default async function LayoutHeader({ height }: { height: string }) {
  let profile = await getOwnProfileData()

  if (profile.error) return <Error message={profile.error.message} /> 

  return (
    <header 
      style={{ height }} 
      className="z-50 backdrop-blur-md sticky top-0 px-4 py-3 gap-6 border-b grid grid-cols-[auto_1fr_auto] items-center"
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src="/leaf.png" alt="Leafers logo" width={40} height={40} /> 
        <h1 className="hidden md:block text-3xl font-light">Leafers</h1>
      </Link>

      <Input placeholder="Search" className="w-[20rem] max-w-full justify-self-end" />

      <LayoutHeaderProfileDropdown 
        username={profile.data.username} 
        displayName={profile.data.display_name}
        avatarUrl={profile.data.avatar_url}
      />
    </header>
  )
}
