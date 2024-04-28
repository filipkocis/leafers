import Error from "@app/components/Error"
import ProfileCard from "@app/features/profile/ProfileCard"
import { getAllProfiles } from "./utils/server/getAllProfiles"

export default async function ExplorePage() {
  const { data: profiles, error } = await getAllProfiles() 
  if (error) return <Error message={error.message} />

  return (
    <div className="flex flex-col">
      {profiles.map((profile) => <ProfileCard profile={profile} /> )}
    </div>
  )
}
