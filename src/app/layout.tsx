// app/layout.tsx
import "@/src/styles/globals.css";
import { SiteHeader } from "../components/site-header";
import { ThemeProviderWrapper } from "../components/theme-wrapper";
import { siteConfig } from "../config/site";
import { AuthProvider } from "../contexts/auth-context";
import { fontSans, fontMono, fontDisplay, fontCode } from "../lib/fonts";
import { cn } from "../lib/utils";
import { Toaster } from "@/src/components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        fontSans.variable,
        fontMono.variable,
        fontDisplay.variable,
        fontCode.variable
      )}
    >
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-sans",
          fontSans.variable,
          fontMono.variable,
          fontDisplay.variable,
          fontCode.variable
        )}
      >
        <Toaster />

        <AuthProvider>
          <SiteHeader />
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </AuthProvider>
        <script src="https://js.pusher.com/8.3.0/pusher.min.js"></script>
      </body>
    </html>
  );
}
