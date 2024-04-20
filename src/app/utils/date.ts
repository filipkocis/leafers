export function compareDateAge(date: Date | string | number, days: number) {
  return (new Date(date).getTime() + 1000 * 60 * 60 * 24 * days) > Date.now()
}
