import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "@shadcn/components/ui/sonner";
import { ThemeProvider } from "@components/ThemeProvider";
import IsMobileProvider from "@app/contexts/IsMobileContext";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <IsMobileProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </IsMobileProvider>
      </body>

      <Toaster richColors />
    </html>
  );
}
