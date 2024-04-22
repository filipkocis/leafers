import { isAdmin } from "@utils/server/roles";
import { RedirectType, redirect } from "next/navigation";

export default async function AdminPage() {
  if (!await isAdmin()) redirect('/home', RedirectType.replace)

  return (
    <div>Admin page</div>
  )
}
