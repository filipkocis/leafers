import { cn } from "@shadcn/lib/utils";
import { capitalize } from "@utils/string";
import { getBadgeStyle } from "../utils/badgeStyles";

export default function ProfileBadgeBasic({ small, role, index = 0 }: { small?: boolean, role: string, index?: number }) {
  const badgeStyle = getBadgeStyle(role)

  return (
    <div className={cn(
      "relative z-0 flex items-center justify-center rounded-lg overflow-hidden cursor-pointer", 
      !!badgeStyle.ring && "p-[2px]",

      !!badgeStyle.shine && (small ? "shadow-[0_0_5px_1px_white]" : "shadow-[0_0_8px_1px_white]"),
      !!badgeStyle.shine && badgeStyle.shine,
    )}>

      {!!badgeStyle.shimmer && (
        <div 
          style={{
            rotate: "45deg",
          }}
          className={cn(
            "border-l border-white animate-shimmer absolute z-10 top-0 left-0 w-full h-[200%] shadow-[1.2rem_0rem_0.6rem_-1rem_white_inset]",
            badgeStyle.shimmer,
          )} 
        />
      )}

      {!!badgeStyle.ring && (
        <div 
          style={{
            backgroundImage: "conic-gradient(var(--tw-gradient-stops))",
            animationDuration: "2s",
            width: `${Math.max(role.length, 5)}rem`,
            height: `${Math.max(role.length, 5)}rem`,
            rotate: `${index * 90}deg`,
          }}
          className={cn(
            "absolute -z-10 rounded-full animate-spin",
            badgeStyle.ring,
          )} 
        />
      )}

      <div 
        className={cn(
          "text-[0.8rem] px-2 py-1 font-bold rounded-md bg-primary dark:text-black text-white",
          !!badgeStyle.color && badgeStyle.color,
          small && "text-[0.75rem] leading-none px-1.5 py-1",
        )} 
      >
        {capitalize(role)}
      </div>

    </div>
  )
}
