import { RedirectType, redirect } from "next/navigation";
import { hasRole, isAdmin } from "@utils/server/roles";
import AiChat from "./AiChat";

export default async function AiPage() {
  if (await isAdmin()) return <AiChat limited={false} />;
  if (await hasRole('premium') || await hasRole('vip')) return <AiChat limited={true} />;

  redirect('/premium', RedirectType.replace)
}
