import { RedirectType, redirect } from "next/navigation";

export function validatePage<P extends string[], F extends string>({ page, fallback, illegalRedirect, pages }: { page: string | undefined, fallback: F, illegalRedirect?: string, pages: P }): P[number] | F {
  if (!page || !page.length) return fallback;
  if (pages.includes(page)) return page as P[number];
  
  redirect(illegalRedirect ?? "/404", RedirectType.replace)
}
