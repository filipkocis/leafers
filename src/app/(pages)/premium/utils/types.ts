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
