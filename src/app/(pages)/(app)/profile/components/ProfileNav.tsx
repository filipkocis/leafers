"use client"

import NavTabs from "@app/components/nav/NavTabs";
import { usePathname } from "next/navigation";

function getNavItems(username: string) {
  return [
    { page: "posts", label: "Posts", href: `/profile/${username}/` },
    { page: "replies", label: "Replies", href: `/profile/${username}/replies` },
    { page: "logs", label: "Logs", href: `/profile/${username}/logs` },
    { page: "stats", label: "Statistics", href: `/profile/${username}/stats` },
  ]
}

export default function ProfileNav({ username }: { username: string }) {
  let pathname = usePathname()
  if (pathname.endsWith(username)) pathname += "/posts"

  const navItems = getNavItems(username)

  return <NavTabs check={(page => pathname.endsWith(page))} items={navItems} />;
}
