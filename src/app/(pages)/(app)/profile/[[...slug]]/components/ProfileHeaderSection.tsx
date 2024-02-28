import Image from "next/image";

export default function ProfileHeaderSection({ profile }: { profile: { username: string } }) {
  return (
    <div className="flex flex-col items-center gap-6 pt-16">
      <div className="rounded-xl bg-green-500/25 p-4">
        <Image 
          className="w-[84px] h-[84px]" 
          src="/tree1.png" 
          alt="profile picture" 
          height={84} width={84} />
      </div>
      <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-primary via-40% to-lime-500">
        @{profile.username}
      </p>
      <div className="grid grid-cols-3 gap-6">
        <ProfileStat 
          value={420}
          label="Likes" 
        />
        <ProfileStat 
          value={69}
          label="Posts" 
        />
        <ProfileStat 
          value={666}
          label="Logs" 
        />
      </div>
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
