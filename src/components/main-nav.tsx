"use client"
import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/src/types/nav"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/src/lib/utils"
import { Icons } from "@/src/components/icons"
import { Button, buttonVariants } from "./ui/button"
import { useAuth } from "@/src/contexts/auth-context"
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
interface MainNavProps {
  items?: NavItem[]
  endItems?: NavItem[]
  authenticatedNav?: NavItem[]
  authenticatedLastNav?: NavItem[]
  isAuthenticated: boolean
  name: string | null
}



export function MainNav({ items, endItems, authenticatedNav, authenticatedLastNav, isAuthenticated, name }: MainNavProps) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isMainLandingPage = pathname === "/"
  const role = pathname?.split("/")[1] as "admin" | "student" | "teacher" 

  console.log(role)

  return (
    <div className="flex w-full items-center justify-between gap-6 md:gap-10">

       
          <Link href="/" className="flex items-center justify-start space-x-2">
        <Icons.logo className="size-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
  {  !isMainLandingPage &&  <div className="flex-1 flex justify-between items-center">
        { isAuthenticated ? renderLinks(authenticatedNav, role, router) : renderLinks(items, role, router)}
        { isAuthenticated ? (<div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground flex items-center gap-2"><Icons.profile className="size-4" /> {name}</p>
        <div className={buttonVariants({variant: "outline"})} onClick={() => logout()}>
        {role ? renderLinks(authenticatedLastNav, role, router) : null}
        </div>
        </div>) : (renderLinks(endItems, role, router))}
      </div>}
    </div>
  )
}

const renderLinks = (navItems?: NavItem[], role?: string, router?: any) => {
  return (
    <nav className="flex gap-6">
      {navItems
        ?.filter(item => {
          // Exclude "Register" if role is not admin
          return !(item.title === "Signup" && role !== "admin");
        })
        .map(
          (item, index) =>
            item.href && (
              <Button
                variant="link"
                key={index}
                onClick={() => router.push(`/${role}/${item.href}`)}
                className={cn(
                  "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Button>
            )
        )}
    </nav>
  );
};


