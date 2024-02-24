import { Card } from "@/app/lib/shadcn/components/ui/card";
import LoginForm from "./components/LoginForm";
import { getSession } from "@/app/utils/server/auth";
import { cn } from "@/app/lib/shadcn/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

export default async function Register() {
  const session = await getSession()

  if (session) {
    redirect('/home', RedirectType.replace)
  }

  return (
    <main 
      className={cn(
        "flex min-h-[100dvh] flex-col items-center justify-center p-24", 
        "bg-primary/10 z-0 relative overflow-hidden")}
      >
      <div className="-z-10 botom-0 right-0 -rotate-[24deg] translate-x-[10%] translate-y-[40%] absolute">
        <Image src="/tree2.png" alt="Tree" width={800} height={800} />
      </div>
      <div className="-z-10 left-0 rotate-[24deg] -translate-x-[35%] translate-y-[10%] absolute flex items-center justify-center">
        <Image src="/tree3.png" alt="Tree" width={800} height={800} />
      </div>
      <Card className="backdrop-blur-sm bg-transparent gap-6 border-0 shadow-none w-full max-w-screen-sm p-6 grid">
        <h2 className="text-4xl font-bold mb-6">Welcome back</h2>
        <LoginForm />
        <p className="flex gap-2 justify-center">
          <span className="">Don't have an account?</span>
          <Link href="/login" className="underline text-primary">Login</Link>
        </p>
      </Card>
    </main>
  )
}
