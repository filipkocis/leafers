import { cn } from "@shadcn/lib/utils";
import { capitalize } from "@/app/utils/string";

export default function ProfileBadge({ role, index = 0 }: { role: string, index?: number }) {
  const badgeStyle = getBadgeStyle(role)

  return (
    <div className={cn(
      "relative z-0 rounded-lg overflow-hidden cursor-pointer", 
      !!badgeStyle.ring && "p-[2px]",

      !!badgeStyle.shine && "shadow-[0_0_8px_1px_white]",
      !!badgeStyle.shine && badgeStyle.shine,
    )}>

      {!!badgeStyle.shimmer && (
        <div 
          style={{
            rotate: "45deg",
          }}
          className={cn(
            "border-l border-white animate-shimmer absolute z-10 top-0 left-0 w-full h-[200%] shadow-[1.2rem_0rem_0.6rem_-1rem_white_inset]",
            badgeStyle.shimmer,
          )} 
        />
      )}

      {!!badgeStyle.ring && (
        <div 
          style={{
            backgroundImage: "conic-gradient(var(--tw-gradient-stops))",
            animationDuration: "2s",
            width: `${Math.max(role.length, 5)}rem`,
            height: `${Math.max(role.length, 5)}rem`,
            rotate: `${index * 90}deg`,
          }}
          className={cn(
            "absolute -z-10 inset-0 self-center justify-self-center rounded-full animate-spin",
            badgeStyle.ring,
          )} 
        />
      )}

      <div 
        className={cn(
          "text-[0.8rem] px-2 py-1 font-bold rounded-md bg-primary text-white",
          !!badgeStyle.color && badgeStyle.color,
        )} 
      >
        {capitalize(role)}
      </div>

    </div>
  )
}

function getBadgeStyle(badge: string) {
  const style = {
    color: null as string | null, // define bg color
    ring: null as string | null, // define from,via,to colors
    shine: null as string | null, // define shadow color
    shimmer: null as string | null, // define border and shadow color
  }

  switch (badge) {
    // owner
    case "omnipotent":
      style.color = "bg-red-600"
      style.ring = "from-red-600 via-yellow-400 to-red-600"
      style.shine = "shadow-[hsl(0_100%_50%)]"
      style.shimmer = "border-yellow-300 shadow-yellow-300"
      break;
    case "admin":
      style.color = "bg-orange-500"
      style.ring = "from-orange-500 to-red-500"
      style.shine = "shadow-[hsl(25_100%_50%)]"
      break;

    // subscription
    case "vip":
      style.color = "bg-yellow-400"
      style.ring = "from-yellow-400 to-yellow-500"
      style.shine = "shadow-[hsl(50_100%_50%)]"
      break;
    case "premium":
      style.color = "bg-yellow-400"
      break;

    // app specific
    case "leafer":
      style.color = "bg-lime-500"
      break;
    case "crypto":
      style.color = "bg-purple-500"
      break;
    case "chatter":
      style.color = "bg-blue-400"
      break;

    // default
    case "basic":
      style.color = "bg-gray-500"
      break;
    case "new":
      style.color = "bg-pink-400"
      style.ring = "from-pink-400 via-purple-500 to-pink-400"
      style.shine = "shadow-[0_0_8px_1px_hsl(300_100%_50%)]"
      break;
    case "banned":
      style.color = "bg-red-500"
      break;
  }

  return style
}
