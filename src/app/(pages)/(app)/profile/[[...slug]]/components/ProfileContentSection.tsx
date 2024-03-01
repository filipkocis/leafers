import NavTabs from "@app/components/nav/NavTabs";
import { validatePage } from "@app/utils/server/validatePage";

function getNavItems(username: string) {
  return [
    { page: "home", label: "Home", href: `/profile/${username}/` },
    { page: "posts", label: "Posts", href: `/profile/${username}/posts` },
    { page: "logs", label: "Logs", href: `/profile/${username}/logs` },
    { page: "stats", label: "Statistics", href: `/profile/${username}/stats` },
  ]
}

export default function ProfileContentSection(
  { profile, page }: 
  { profile: { id: string, username: string } , page: string | undefined 
}) {
  const { id, username } = profile; 
  const navItems = getNavItems(username)

  const currentPage = validatePage({
    page,
    pages: ["posts","logs","stats"] as const,
    fallback: "home",
    illegalRedirect: `/profile/${username}/`
  });

  return (
    <div className="flex flex-col">
      <NavTabs check={(page => page === currentPage)} items={navItems} />

      <div>
      </div>
    </div>
  )
}
