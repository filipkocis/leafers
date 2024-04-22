import { hasRole } from "@utils/server/roles";
import Error from "@app/components/Error";
import ServerFeedWrapper from "@app/components/ServerFeedWrapper";
import { getProfileDataByUsername } from "@app/utils/server/getProfile";

export default async function LogsPage({ params: { username } }: { params: { username: string } }) {
  if (!await hasRole("leafer")) return <Error message="You do not have permission to view this page" />

  const { data: profile, error } = await getProfileDataByUsername(username);
  if (error) return <Error message={error.message} />

  return <ServerFeedWrapper profileId={profile.id} type="log" />
}
