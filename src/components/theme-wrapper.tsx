"use client";

import Footer from "./footer";
import { SiteHeader } from "./site-header";
import { TailwindIndicator } from "./tailwind-indicator";
import { ThemeProvider } from "next-themes";

export function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex min-h-screen flex-col">
        {/* <SiteHeader /> */}
        <div className="flex-1 flex justify-center items-center">
          {children}
        </div>
        <Footer />
      </div>
      <TailwindIndicator />
    </ThemeProvider>
  );
}
