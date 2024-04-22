import { getProfileStats } from "../utils/server/getStats"

export default async function ProfileStats({ profileId }: { profileId: string }) {
  const { data: stats, error } = await getProfileStats(profileId)

  if (error) throw error

  return (
    <div className="grid grid-cols-4 gap-6">
      <ProfileStat 
        value={stats.followers_count}
        label="Followers" 
      />
      <ProfileStat 
        value={stats.following_count}
        label="Following" 
      />

      <ProfileStat 
        value={stats.posts_count}
        label="Posts" 
      />
      <ProfileStat 
        value={stats.logs_count}
        label="Logs" 
      />
    </div>
  )
}

function ProfileStat({ value, label }: { value: number, label: string }) {
  return (
    <div className="rounded-xl text-center flex flex-col items-center gap-1">
      <p className="text-primary text-3xl font-bold leading-none">{value}</p>
      <p className="leading-none font-semibold text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
