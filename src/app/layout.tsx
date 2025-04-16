// app/layout.tsx
import "@/src/styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "../config/site"
import { fontSans, fontMono, fontDisplay, fontCode } from "../lib/fonts"
import { cn } from "../lib/utils"
import { ThemeProviderWrapper } from "../components/theme-wrapper"
import { Toaster } from "../components/ui/toaster"
import { AuthProvider } from "../contexts/auth-context"
import { SiteHeader } from "../components/site-header"

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
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(
      fontSans.variable,
      fontMono.variable,
      fontDisplay.variable,
      fontCode.variable
    )}>
      <body className={cn(
        "min-h-screen bg-background antialiased font-sans", 
        fontSans.variable,
        fontMono.variable,
        fontDisplay.variable,
        fontCode.variable
      )}>
        <Toaster />
        <AuthProvider>
          <SiteHeader />
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
