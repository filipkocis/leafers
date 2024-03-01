import { cn } from "@shadcn/lib/utils";
import Image from "next/image";

export default function ProfilePicture({ src, alt, size, className }: { src: string | undefined | null, alt: string, size: number, className?: string }) {
  return (
    <div 
      className={cn(
        "rounded-full self-center overflow-hidden border flex items-center justify-center bg-green-200",
        className
      )}
    >
      <Image src={src ?? "/tree1.png"} style={{ width: `${size}px`, height: `${size}px` }} width={size} height={size} alt={alt} />
    </div>
  )
}
