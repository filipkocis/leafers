export type PostType = "text" | "log" | "media" | "poll" | "link" | "event" | "repost" 

export const unitEnum = [
  'gram',
  'miligram',
  'second',
  'hour',
] as const

export type UnitEnum = typeof unitEnum[number]
