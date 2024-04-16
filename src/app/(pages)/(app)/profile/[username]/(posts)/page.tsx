import Error from "@app/components/Error"
import { getProfileDataByUsername } from "@app/utils/server/getProfile"
import ServerFeedWrapper from "@app/components/ServerFeedWrapper";

export default async function PostsPage({ params: { username } }: { params: { username: string } }) {
  const { data: profile, error } = await getProfileDataByUsername(username);
  if (error) return <Error message={error.message} />

  return <ServerFeedWrapper profileId={profile.id} />
}
