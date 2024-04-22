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
