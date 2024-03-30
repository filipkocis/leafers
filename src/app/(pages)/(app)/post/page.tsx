import { Card } from "@shadcn/components/ui/card";
import NewPostForm from "./components/NewPostForm";
import { RedirectType, redirect } from "next/navigation";

export default function NewPost({ searchParams: { parent } }: { searchParams: { parent?: string } }) {
  if (parent) redirect(`/post/${parent}`, RedirectType.replace)

  return (
    <Card className="h-min flex flex-col p-6">
      <NewPostForm />
    </Card>
  )
}
