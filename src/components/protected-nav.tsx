import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/src/types/nav"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/src/lib/utils"
import { Icons } from "@/src/components/icons"

interface MainNavProps {
  items?: NavItem[]
  endItems?: NavItem[]
}

export function MainNav({ items, endItems }: MainNavProps) {
  const renderLinks = (navItems?: NavItem[]) => (
    <nav className="flex gap-6">
      {navItems?.map(
        (item, index) =>
          item.href && (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          )
      )}
    </nav>
  )

  return (
    <div className="flex w-full items-center justify-between gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="size-6" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      <div className="flex-1 flex justify-between items-center">
        {renderLinks(items)}
        {renderLinks(endItems)}
      </div>
    </div>
  )
}
