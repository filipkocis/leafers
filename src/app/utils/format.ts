import { formatDistanceToNow } from "date-fns";
import { UnitTypeEnum } from "@app/utils/types";

export function formatPostDate(date: string) {
  const dateObj = new Date(date)
  const formated = formatDistanceToNow(dateObj, { addSuffix: true });

  return formated.replace("about ", "")
}

export function formatUnit(unit: UnitTypeEnum) {
  switch (unit) {
    case 'gram': return 'g';
    case 'miligram': return 'mg';
    case 'second': return 's';
    case 'hour': return 'h';
    default: return unit;
  }
}

const amountFormatterCompact = new Intl.NumberFormat("en-US", { 
  compactDisplay: "short",
  notation: "compact",
  maximumSignificantDigits: 3,
})

const amountFormatterScientific = new Intl.NumberFormat("en-US", { 
  compactDisplay: "short",
  notation: "scientific",
  maximumSignificantDigits: 3,
})

export function formatAmount(number?: number) {
  if (number == undefined) return null;
  return number < 10**15 ? 
    amountFormatterCompact.format(number) :
    amountFormatterScientific.format(number)
}
