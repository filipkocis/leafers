"use client"

import NavTabs from "@app/components/nav/NavTabs";
import { usePathname } from "next/navigation";

function getNavItems(username: string, isLeafer: boolean) {
  return [
    { page: "posts", label: "Posts", href: `/profile/${username}/` },
    { page: "replies", label: "Replies", href: `/profile/${username}/replies` },
    { page: "logs", label: "Logs", href: `/profile/${username}/logs`, disabled: !isLeafer },
    { page: "stats", label: "Statistics", href: `/profile/${username}/stats`, disabled: !isLeafer },
  ]
}

export default function ProfileNav({ isLeafer, username }: { isLeafer: boolean, username: string }) {
  let pathname = usePathname()
  if (pathname.endsWith(username)) pathname += "/posts"

  const navItems = getNavItems(username, isLeafer)

  return <NavTabs check={(page => pathname.endsWith(page))} items={navItems} />;
}
