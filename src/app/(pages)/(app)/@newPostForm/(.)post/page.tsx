import { getUsernameByPostId } from "@app/utils/server/getProfile";
import ResponsiveDialogDrawer from "./components/ResponsiveDialogDrawer";

export default async function InterceptedPost({ searchParams: { parent } }: { searchParams: { parent?: string } }) {
  let username, error;
  if (parent) {
    const res = await getUsernameByPostId(parent)
    if (res.error) error = res.error.message;
    else username = res.data;
  }

  return (
    <div>
      <ResponsiveDialogDrawer parent={parent} username={username} error={error} />
    </div>
  )
}
