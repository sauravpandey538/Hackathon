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
import Script from "next/script";

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
        {/* ✅ Pusher script */}
        <Script
          src="https://js.pusher.com/8.3.0/pusher.min.js"
          strategy="afterInteractive"
        />

        {/* ✅ Tawk.to script */}
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
            (function() {
              var s1 = document.createElement("script"),
                  s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = 'https://embed.tawk.to/6800b0bd9503a6190d3e4499/1ip1b4puv';
              s1.charset = 'UTF-8';
              s1.setAttribute('crossorigin', '*');
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
