import { SubscriptionType } from "./types"

export const SUBSCRIPTIONS: SubscriptionType[] = [
  {
    badge: 'basic',
    name: 'Basic',
    price: 4.20,
    description: '',
    features: [
      'Follow users',
      'Create posts',
      'Reply, like and share posts',
      'Edit and delete posts',
    ]
  },
  {
    badge: 'premium',
    name: 'Premium',
    price: 6.90,
    description: 'Everything in Basic, and',
    features: [
      'Private messaging',
      'Limited access to AI chat',
      'Upload images and videos',
      'Priority support',
      'Premium badge',
    ]
  },
  {
    badge: 'vip',
    name: 'VIP',
    price: 8.90,
    description: 'Everything in Premium, and',
    features: [
      'Full access to AI chat',
      'Hide likes and shares',
      'Customize profile',
      'Private profile',
      'Private posts',
      'VIP badge',
    ],
    extra: {
      highlight: true,
    }
  },
]

const SPECIAL: SubscriptionType[] = [
  {
    badge: 'leafer',
    name: 'Leafer',
    price: 11.40,
    description: '',
    features: [
      'Special access to Leafers community',
      'Create logs',
      'Profile analytics',
      'Leafer badge',
    ],
    extra: {
      lifetime: true,
      button: "bg-primary hover:bg-primary/90",
      card: "border-2 border-primary",
      cta: "Request",
    }
  },
  {
    badge: 'crypto',
    name: 'Cryptobro',
    price: 11.40,
    description: '',
    features: [
      'Special access to Cryptobros community',
      'Token tracking',
      'Crypto analytics',
      'Portfolio management',
      'Crypto badge',
    ],
    extra: {
      lifetime: true,
      button: "bg-purple-500 hover:bg-purple-500/90",
      card: "border-2 border-purple-500",
      cta: "Request",
    }
  },
]

const TIERS = {
  subscriptions: SUBSCRIPTIONS,
  special: SPECIAL,
}

export default TIERS
