import LogoutButton from "@app/components/LogoutButton";
import NewPostButton from "@app/components/NewPostButton";
import LayoutHeader from "@app/components/layout/LayoutHeader";
import ProfileIdProvider from "@app/contexts/profileIdContext";
import { getOwnProfileId } from "@app/utils/server/getProfile";
import { RedirectType, redirect } from "next/navigation";
import SideNavItems from "@app/components/nav/SideNavItems";
import { isAdmin } from "@utils/server/roles";

export default async function Layout({ children, newPostForm }: { children: React.ReactNode, newPostForm: React.ReactNode }) {
  const { data: profileId, error: profileIdError } = await getOwnProfileId()
  if (profileIdError) redirect('/', RedirectType.replace)

  const adminPrivileges = await isAdmin()
  const layoutHeaderHeightRem = "4.6rem"

  return (
    <div className="grid">
      <div className="grid grid-rows-[auto_1fr] relative w-full min-h-[100dvh]">
        <LayoutHeader height={layoutHeaderHeightRem} />

        <div className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr]">
          <div className="relative w-full">
            <nav 
              style={{ top: layoutHeaderHeightRem }} 
              className="sticky w-full items-start flex justify-end overflow-y-auto"
            >
              <ul className="flex flex-col gap-6 w-min h-full p-2">
                <SideNavItems adminPrivileges={adminPrivileges} />
                <NewPostButton />
                {newPostForm}
                <LogoutButton />
              </ul>
            </nav>
          </div>

          <ProfileIdProvider value={profileId}>
            <main className="grid md:w-[42rem] border-l border-r">
              {children}
            </main>
          </ProfileIdProvider>
        </div>
      </div>

      <footer></footer>
    </div>
  )
}
