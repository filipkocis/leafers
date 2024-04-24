import { Card } from "@shadcn/components/ui/card";
import { RedirectType, redirect } from "next/navigation";
import NewPostForm from "@app/features/postform/NewPostForm";

export default function NewPost({ searchParams: { parent } }: { searchParams: { parent?: string } }) {
  if (parent) redirect(`/post/${parent}`, RedirectType.replace)

  return (
    <Card className="h-min flex flex-col px-3 py-2 rounded-none border-t-0 border-l-0 border-r-0">
      <NewPostForm preventRefresh />
    </Card>
  )
}
