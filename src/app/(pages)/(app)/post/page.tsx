import { Card } from "@/app/lib/shadcn/components/ui/card";
import NewPostForm from "./components/NewPostForm";

export default function NewPost() {
  return (
    <Card className="h-min flex flex-col p-6">
      <NewPostForm />
    </Card>
  )
}
