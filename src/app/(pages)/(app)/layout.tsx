import NewPostButton from "@app/components/NewPostButton";
import LayoutHeader from "@app/components/layout/LayoutHeader";
import ProfileProvider from "@app/contexts/profileContext";
import { getOwnProfileData } from "@app/utils/server/getProfile";
import { RedirectType, redirect } from "next/navigation";
import SideNavItems from "@app/components/nav/SideNavItems";
import { isAdmin } from "@utils/server/roles";
import { ThemeToggle } from "@components/ThemeToggle";
import OnlyDesktop from "@app/components/OnlyDesktop";

export default async function Layout({ children, newPostForm }: { children: React.ReactNode, newPostForm: React.ReactNode }) {
  const { data: profile, error: profileError } = await getOwnProfileData()
  if (profileError) redirect('/', RedirectType.replace)

  const adminPrivileges = await isAdmin()
  const layoutHeaderHeightRem = "4.6rem"

  return (
    <div className="grid">
      <ProfileProvider value={profile}>
        <div className="grid grid-rows-[auto_1fr] relative w-full min-h-[100dvh]">
          <LayoutHeader height={layoutHeaderHeightRem}>
            <ul className="p-1 overflow-x-hidden overflow-ellipsis grid grid-rows-[auto,auto,1fr] gap-2 h-full">
              <SideNavItems adminPrivileges={adminPrivileges} />
              <NewPostButton />
              {newPostForm}
              <ThemeToggle className="self-end place-self-center" />
            </ul>
          </LayoutHeader>

          <div className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr]">
            <div className="relative w-full">
              <OnlyDesktop>
                <nav 
                  style={{ top: layoutHeaderHeightRem }} 
                  className="max-sm:hidden sticky w-full items-start flex justify-end overflow-y-auto"
                >
                  <ul 
                    style={{ 
                      height: `calc(100dvh - ${layoutHeaderHeightRem})` 
                    }}
                    className="grid grid-rows-[auto,auto,1fr] gap-6 w-min h-full p-2"
                  >
                    <SideNavItems adminPrivileges={adminPrivileges} />
                    <NewPostButton />
                    {newPostForm}
                    <ThemeToggle className="self-end place-self-center" />
                  </ul>
                </nav>
              </OnlyDesktop>
            </div>

              <main className="grid md:w-[42rem] sm:border-l sm:border-r">
                {children}
              </main>
          </div>
        </div>

        <footer></footer>
      </ProfileProvider>
    </div>
  )
}
