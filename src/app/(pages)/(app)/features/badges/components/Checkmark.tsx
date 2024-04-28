import { cn } from "@shadcn/lib/utils";
import { CheckmarkVariant, getCheckmarkStyle } from "../utils/checkmarkStyles";
import HoverCardCheckmark from "./HoverCardCheckmark";

export function CheckmarkBasic({ 
  size = 20, className, variant 
}: { 
  size?: number, className?: string, variant: CheckmarkVariant 
}) { 
  const colors = getCheckmarkStyle(variant)
  const gradientId = `checkmark-gradient-${variant}`

  return (
  <HoverCardCheckmark role={variant}>
    <svg 
      className={cn("fill-current cursor-pointer", className)}
      width={`${size}px`}
      height={`${size}px`} 
      viewBox="0 0 22 22" 
      fill="#000000" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor={colors.start} />
        <stop offset="100%" stopColor={colors.end} />
      </linearGradient>
      <g clipRule="evenodd" fillRule="evenodd">
        <circle cx="11" cy="11" r="5" fill={colors.stroke ?? "transparent"} /> 
        <path 
          stroke={colors.stroke ?? "transparent"}
          strokeWidth={colors.stroke ? 1 : 0}
          d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z"
          fill={`url(#${gradientId})`} />
      </g>
    </svg>
  </HoverCardCheckmark>
  )
}


export default function Checkmark({ 
  size = 20, className, variant 
}: { 
  size?: number, className?: string, variant: CheckmarkVariant 
}) { 
  return (
    <HoverCardCheckmark role={variant}>
      <CheckmarkBasic size={size} className={className} variant={variant} />
    </HoverCardCheckmark>
  )
}
