"use client";

import { Button, buttonVariants } from "./ui/button";
import { Icons } from "@/src/components/icons";
import { siteConfig } from "@/src/config/site";
import { useAuth } from "@/src/contexts/auth-context";
import { cn } from "@/src/lib/utils";
import { NavItem } from "@/src/types/nav";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";

interface MainNavProps {
  items?: NavItem[];
  endItems?: NavItem[];
  authenticatedNav?: NavItem[];
  authenticatedLastNav?: NavItem[];
  isAuthenticated: boolean;
  name: string | null;
}

export function MainNav({
  items,
  endItems,
  authenticatedNav,
  authenticatedLastNav,
  isAuthenticated,
  name,
}: MainNavProps) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isMainLandingPage = pathname === "/";
  const role = pathname?.split("/")[1] as "admin" | "student" | "teacher";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <div className="flex w-full items-center justify-between gap-6 md:gap-10 py-4">
      {/* Logo */}
      <Link href="/" className="flex items-center justify-start space-x-2">
        <div className="bg-logo w-12 h-12 bg-no-repeat bg-cover rounded-full" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>

      {/* Desktop nav */}
      {!isMainLandingPage && (
        <div className="hidden md:flex flex-1 justify-between items-center">
          {isAuthenticated
            ? renderLinks(authenticatedNav, role, router)
            : renderLinks(items, role, router)}

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Icons.profile className="size-4" /> {name}
              </p>
              <div
                className={buttonVariants({ variant: "outline" })}
                onClick={() => logout()}
              >
                {role ? renderLinks(authenticatedLastNav, role, router) : null}
              </div>
            </div>
          ) : (
            renderLinks(endItems, role, router)
          )}
        </div>
      )}

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
          <Icons.menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-black border-t border-border z-50 md:hidden p-4 space-y-4 shadow-lg rounded-lg">
          {isAuthenticated
            ? renderLinks(authenticatedNav, role, router)
            : renderLinks(items, role, router)}

          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              {renderLinks(authenticatedLastNav, role, router)}
            </div>
          ) : (
            renderLinks(endItems, role, router)
          )}
        </div>
      )}
    </div>
  );
}

const renderLinks = (navItems?: NavItem[], role?: string, router?: any) => {
  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-6">
      {navItems
        ?.filter((item) => !(item.title === "Signup" && role !== "admin"))
        ?.filter((item) => !(item.title === "Students" && role !== "admin"))
        ?.filter((item) => !(item.title === "Teachers" && role !== "admin"))
        ?.filter((item) => !(item.title === "Routines" && role !== "student"))
        ?.filter((item) => !(item.title === "Modules" && role !== "student"))
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
