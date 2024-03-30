export function getNumberFromSqlCount(count: any) {
  if (!count) return 0
  if (Object.hasOwn(count, 'count') && typeof count.count === 'number') return count.count as number ?? 0
  if (Array.isArray(count) && typeof count[0]?.count === 'number') return count[0].count as number ?? 0
  if (typeof count === 'number') return count

  return 0
}
