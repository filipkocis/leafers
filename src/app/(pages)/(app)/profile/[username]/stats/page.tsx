import { hasRole } from "@utils/server/roles"
import Error from "@app/components/Error"
import { getProfileDataByUsername, getProfileLogStats } from "@app/utils/server/getProfile"

export default async function StatsPage({ params: { username } }: { params: { username: string } }) {
  if (!await hasRole("leafer")) return <Error message="You do not have permission to view this page" />

  const { data: profile, error: profileError } = await getProfileDataByUsername(username)
  if (profileError) return <Error message={profileError.message} />
  const { data: stats, error: statsError } = await getProfileLogStats(profile.id)
  if (statsError) return <Error message={statsError.message} />

  return (
    <div className="grid sm:grid-cols-4 grid-cols-2 p-3 gap-3">
      <div className="gap-2 rounded-md border p-3 flex flex-col items-center">
        <p className="text-2xl font-bold">{stats.total ? stats.total + 'g' : 0}</p>
        <p className="text-sm">Total Leaf</p>
      </div>
      <div className="gap-2 rounded-md border p-3 flex flex-col items-center">
        <p className="text-2xl font-bold">{stats.month ? stats.month + 'g' : 0}</p>
        <p className="text-sm">Monthly Leaf</p>
      </div>
      <div className="gap-2 rounded-md border p-3 flex flex-col items-center">
        <p className="text-2xl font-bold">{stats.week ? stats.week + 'g' : 0}</p>
        <p className="text-sm">Weekly Leaf</p>
      </div>
      <div className="gap-2 rounded-md border p-3 flex flex-col items-center">
        <p className="text-2xl font-bold">{stats.day ? stats.day + 'g' : 0}</p>
        <p className="text-sm">Daily Leaf</p>
      </div>
    </div>
  )
}
