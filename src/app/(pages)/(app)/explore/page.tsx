import Error from "@app/components/Error"
import { getAllProfiles } from "./utils/server/getAllProfiles"
import ProfileCardLink from "../features/profile/ProfileCardLink"

export default async function ExplorePage() {
  const { data: profiles, error } = await getAllProfiles() 
  if (error) return <Error message={error.message} />

  return (
    <div className="flex flex-col">
      {profiles.map((profile) => <ProfileCardLink key={profile.id} profile={profile} /> )}
    </div>
  )
}
