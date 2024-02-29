import NavItems from "@app/components/NavItems";
import LogoutButton from "@app/components/LogoutButton";
import NewPostButton from "@app/components/NewPostButton";

export default async function Layout({ children, newPostForm }: { children: React.ReactNode, newPostForm: React.ReactNode }) {
  return (
    <div className="grid">
      <div className="grid grid-rows-[auto_1fr] w-full min-h-[100dvh]">
        {newPostForm}

        <header className=""></header>

        <div className="grid grid-cols-[auto_1fr] md:grid-cols-[1fr_auto_1fr]">
          <div className="relative w-full">
            <nav className="sticky w-full items-start flex justify-end top-0 overflow-y-auto">
              <ul className="flex flex-col gap-6 w-min h-full p-2">
                <NavItems />
                <NewPostButton />
                <LogoutButton />
              </ul>
            </nav>
          </div>

          <main className="grid md:w-[42rem] border">
            {children}
          </main>
        </div>
      </div>

      <footer></footer>
    </div>
  )
}
