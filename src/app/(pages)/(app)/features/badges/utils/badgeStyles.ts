export function getBadgeStyle(badge: string) {
  const style = {
    color: null as string | null, // define bg color
    ring: null as string | null, // define from,via,to colors
    shine: null as string | null, // define shadow color
    shimmer: null as string | null, // define border and shadow color
  }

  switch (badge) {
    // owner
    case "omnipotent":
      style.color = "bg-red-600 dark:text-white"
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

// each group starts with the next multiple of 10 
const badgesOrder = {
  "omnipotent": 0,

  "admin": 10,

  "vip": 20,
  "premium": 21,

  "leafer": 30,
  "chatter": 31,
  "crypto": 32,

  "new": 40,
  "basic": 41,

  "banned": 50,
}

export const BADGES_ORDER: Record<string, number> = new Proxy(badgesOrder, {
  get: function(target, prop) {
    if (prop in target) {
      return target[prop as keyof typeof badgesOrder]
    }
    return 999
  }
})
