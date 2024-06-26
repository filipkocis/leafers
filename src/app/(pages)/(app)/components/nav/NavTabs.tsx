import { cn } from "@shadcn/lib/utils";
import Link from "next/link";

type ItemProps = {
  label: string,
  href: string,
  page: string,
  disabled?: boolean
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
        <NavItem 
          disabled={item.disabled}
          selected={check(item.page)} 
          href={item.href} 
          label={item.label} 
          key={index} 
        />
      ))}
    </div>  
  )
}

function NavItem({ href, label, selected, disabled }: { href: string, selected: boolean, label: string, disabled?: boolean }) {
  return (
    <Link 
      className={cn(
        "transition-all hover:bg-muted flex justify-center font-semibold text-muted-foreground",
        disabled && "cursor-not-allowed"
      )} 
      href={disabled ? "#" : href}
    >
      <div className="grid grid-rows-[1fr_5px]">
        <span className={cn("py-3", selected && "text-foreground")}>{label}</span>
        <div className={cn("rounded-full", selected && "bg-primary")}></div>
      </div>
    </Link>
  )
}
