import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@shadcn/lib/utils";
import { Toaster } from "@shadcn/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leafers",
  description: "Grab all the leaves and become the biggest tree!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="">
      <body className={cn(inter.className, "")}>{children}</body>
      <Toaster richColors />
    </html>
  );
}
