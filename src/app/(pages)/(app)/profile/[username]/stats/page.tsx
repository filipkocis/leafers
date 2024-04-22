import { hasRole } from "@utils/server/roles"
import Error from "@app/components/Error"

export default async function StatsPage() {
  if (!await hasRole("leafer")) return <Error message="You do not have permission to view this page" />

  return (
  <div>stats page</div>
  )
}
