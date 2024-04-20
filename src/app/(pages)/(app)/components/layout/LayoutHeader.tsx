import { Input } from "@shadcn/components/ui/input";
import Image from "next/image";
import ProfilePicture from "@app/components/ProfilePicture";
import { getOwnProfileData } from "@app/utils/server/getProfile";
import Error from "@app/components/Error";

export default async function LayoutHeader({ height }: { height: string }) {
  let profile = await getOwnProfileData()

  if (profile.error) return <Error message={profile.error.message} /> 

  return (
    <header 
      style={{ height }} 
      className="z-50 backdrop-blur-md border sticky top-0 px-4 py-3 gap-6 border-b grid grid-cols-[auto_1fr_auto] items-center"
    >
      <div className="flex items-center gap-2">
        <Image src="/leaf.png" alt="Leafers logo" width={40} height={40} /> 
        <h1 className="hidden md:block text-3xl font-light">Leafers</h1>
      </div>

      <Input placeholder="Search" className="w-[20rem] max-w-full justify-self-end" />

      <div className="flex items-center gap-4">
        <ProfilePicture src={profile.data.avatar_url} alt="Profile picture" size={42} /> 
        <p className="text-lg font-semibold">{
          profile.data.display_name || '@' + profile.data.username
        }</p>
      </div>
    </header>
  )
}
