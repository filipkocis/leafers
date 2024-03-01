import NavTabs from "@app/components/nav/NavTabs"
import { RedirectType, redirect } from "next/navigation"
import { validatePage } from "@app/utils/server/validatePage"
import ExplorePosts from "./components/ExplorePosts"
import FollowingPosts from "./components/FollowingPosts"

const navItems = [
  { page: "following", label: "Following", href: "/home/" },
  { page: "explore", label: "Explore", href: "/home/explore" },
]

export default async function Home({ params: { slug } }: { params: { slug?: string[] } }) {
  if (slug && slug.length > 1) redirect("/home", RedirectType.replace)

  const currentPage = validatePage({
    page: slug?.at(0),
    pages: ['explore'] as const,
    fallback: "following",
    illegalRedirect: "/home"
  })

  let content = null;

  if (currentPage === "explore") {
    content = <ExplorePosts />
  } else if (currentPage === "following") {
    content = <FollowingPosts />;
  }
  return (
    <div className="flex flex-col">
      <NavTabs check={(page => page === currentPage)} items={navItems} />

      {content}
    </div>
  )
}
