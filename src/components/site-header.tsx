"use client";

import { siteConfig } from "@/src/config/site"
import { MainNav } from "@/src/components/main-nav"
import { useAuth } from "@/src/contexts/auth-context"

export function SiteHeader() {
  const { isAuthenticated, name } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav
         items={siteConfig?.mainNav}
          endItems={siteConfig?.lastNav}
           isAuthenticated={isAuthenticated}
           authenticatedNav={siteConfig?.authenticatedNav}
           authenticatedLastNav={siteConfig?.authenticatedLastNav}
           name={name}
           />
       
      </div>
    </header>
  
  )
}
