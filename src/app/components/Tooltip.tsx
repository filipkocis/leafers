import {
  Tooltip as TooltipShadcn,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@shadcn/components/ui/tooltip"

export default function Tooltip({ children, text }: { children: React.ReactNode, text: string }) {
  return (
    <TooltipProvider>
      <TooltipShadcn>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </TooltipShadcn>
    </TooltipProvider>
  )
}
