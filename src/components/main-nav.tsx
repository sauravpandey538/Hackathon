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

  console.log(role);

  return (
    <div className="flex w-full items-center justify-between gap-6 md:gap-10">
      <Link href="/" className="flex items-center justify-start space-x-2">
        <div className="bg-logo w-12 h-12 bg-no-repeat bg-cover rounded-full" />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {!isMainLandingPage && (
        <div className="flex-1 flex justify-between items-center">
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
    </div>
  );
}

const renderLinks = (navItems?: NavItem[], role?: string, router?: any) => {
  return (
    <nav className="flex gap-6">
      {navItems
        ?.filter((item) => {
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
