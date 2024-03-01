import { cn } from "@shadcn/lib/utils";
import Link from "next/link";

type ItemProps = {
  label: string,
  href: string,
  page: string,
}

type ItemsType = ItemProps[]

export default function NavTabs({ check, items }: { check: (page: string) => boolean, items: ItemsType }) {
  return (
    <div 
      className="grid border-b"
      style={{
        gridTemplateColumns: `repeat(${items.length}, auto)`
      }}>
      {items.map((item, index) => (
        <ProfileNavItem selected={check(item.page)} href={item.href} label={item.label} key={index} />
      ))}
    </div>  
  )
}

function ProfileNavItem({ href, label, selected }: { href: string, selected: boolean, label: string }) {
  return (
    <Link 
      className="transition-all hover:bg-muted flex justify-center font-semibold text-muted-foreground" 
      href={href}>
      <div className="grid grid-rows-[1fr_5px]">
        <span className={cn("py-3", selected && "text-foreground")}>{label}</span>
        <div className={cn("rounded-full", selected && "bg-primary")}></div>
      </div>
    </Link>
  )
}
