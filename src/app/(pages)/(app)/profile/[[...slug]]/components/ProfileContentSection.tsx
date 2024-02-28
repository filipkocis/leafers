import { cn } from "@/app/lib/shadcn/lib/utils";
import Link from "next/link";
import { RedirectType, redirect } from "next/navigation";

type PageType = "home" | "posts" | "logs" | "stats"

function parsePageType(page: string | undefined): PageType {
  if (page === "posts") return page;
  if (page === "logs") return page;
  if (page === "stats") return page;
  if (!page || !page.length || page === "home") return "home";
  
  redirect("/404", RedirectType.replace)
}

export default function ProfileContentSection(
  { profile, page }: 
  { profile: { id: string, username: string } , page: string | undefined 
}) {
  const { id, username } = profile; 
  const currentPage = parsePageType(page);

  return (
    <div className="flex flex-col">
      <ProfileNav username={username} currentPage={currentPage} /> 

      <div>
      </div>
    </div>
  )
}

function ProfileNav({ username, currentPage }: { username: string, currentPage: PageType }) {
  return (
    <div className="grid grid-cols-[repeat(4,_auto)] border-b">
      <ProfileNavItem selected={currentPage === "home"} username={username} page="" label="Home" />
      <ProfileNavItem selected={currentPage === "posts"} username={username} page="posts" label="Posts" />
      <ProfileNavItem selected={currentPage === "logs"} username={username} page="logs" label="Logs" />
      <ProfileNavItem selected={currentPage === "stats"} username={username} page="stats" label="Statistics" />
    </div>
  )
}

function ProfileNavItem({ username, page, label, selected }: { selected: boolean, username: string, page: string, label: string }) {
  return (
    <Link 
      className="transition-all hover:bg-slate-200/50 flex justify-center font-semibold text-muted-foreground" 
      href={`/profile/${username}/${page}`}>
      <div className="grid grid-rows-[1fr_5px]">
        <span className={cn("py-3", selected && "text-foreground")}>{label}</span>
        <div className={cn("rounded-full", selected && "bg-primary")}></div>
      </div>
    </Link>
  )
}
