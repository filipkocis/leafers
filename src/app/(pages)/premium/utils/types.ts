export type SubscriptionType = {
  badge: string
  name: string
  price: number
  description: string
  features: string[]
  extra?: {
    [key: string]: any
  }
}

export type SubscriptionStatusType = 
  | { granted: true; requested: false; rejected: false }   // Granted
  | { granted: false; requested: true; rejected: false }   // Requested
  | { granted: false; requested: false; rejected: true }   // Rejected
  | { granted: false; requested: false; rejected: false }  // None (all false)
