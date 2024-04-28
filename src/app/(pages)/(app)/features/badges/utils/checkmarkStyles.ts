const CHECKMARK_STYLE = {
  omnipotent: { 
    start: "#F02000", end: "#FF2020", stroke: "#F0F000",
    description: "it's the owner of the platform" 
  },
  admin: { 
    start: "#F02000", end: "#FF2020" ,
    description: "it has high level security access to the platform" 
  },
  vip: { 
    start: "#FFD700", end: "#FFA500" ,
    description: "a paid subscription with access to private messaging and unlimited AI features" 
  },
  premium: { 
    start: "#22BBFF", end: "#3AF0F0" ,
    description: "a paid subscription with access to private messaging and limited AI features" 
  },
  leafer: { 
    start: "#A0F000", end: "#F0F000" ,
    description: "a member of the Leafers community with special access to its features" 
  },
  crypto: { 
    start: "#9090FF", end: "#a090FF" ,
    description: "a true Cryptobro with access to portfolio tracking" 
  },
  chatter: { 
    start: "#AAEEFF", end: "#DDEEFF" ,
    description: "it has generated private keys with access to the chat feature" 
  },
  new: { 
    start: "#F020FF", end: "#F030F0" ,
    description: "user has joined within the last 30 days" 
  },
}

export type CheckmarkVariant = keyof typeof CHECKMARK_STYLE;

export function getCheckmarkStyle(variant: CheckmarkVariant): { start: string, end: string, stroke?: string } {
  return CHECKMARK_STYLE[variant]
}

export function getCheckmarkDescription(variant: string) {
  if (isCheckmarkVariant(variant)) {
    return CHECKMARK_STYLE[variant].description
  }
}

function isCheckmarkVariant(variant: string): variant is CheckmarkVariant {
  return Object.hasOwn(CHECKMARK_STYLE, variant)
}
