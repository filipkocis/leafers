import { cn } from "@shadcn/lib/utils";
import { getSession } from "@utils/server/auth";
import { Button } from "@shadcn/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-2">
          <Image src="/leaf.png" alt="Leafers Logo" width={37} height={37} />
          <span className="text-3xl uppercase font-light">Leafers</span>
        </div>
        <div></div>
      </div>

      <div className="grid gap-[16vh] max-w-screen-sm text-center">
        <h1 className="text-7xl font-extrabold uppercase gap-1 flex flex-wrap justify-center">
          <span>The first</span> 
          <span className={cn(
          "bg-clip-text text-transparent font-extrabold", 
          "bg-gradient-to-l from-green-500 from-20% to-blue-500")}>social leaf</span> 
          <span>network</span> 
        </h1>
        
        <h2 className="text-xl font-sans">Effortlessly connect and share your experiences with the next generation leaf community while ensuring your privacy.</h2>
        
        <div className="[&>*]:p-[2rem_3.5rem] [&>*]:text-xl flex gap-2 justify-center">
        {session ? 
          <Button asChild><Link href="/home">Enter App</Link></Button> :
          <Button asChild><Link href="/register">Become a Leafer</Link></Button>
        }
          <Button asChild variant="outline"><Link href="/login">Login</Link></Button>
        </div>
      </div>

      <div className="grid grid-cols-3">
        
      </div>
    </main>
  );
}
