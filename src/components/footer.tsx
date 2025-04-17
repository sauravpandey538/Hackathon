import { Icons } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";
import { siteConfig } from "@/src/config/site";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="container  py-6 border-t bg-background ">
      <div className="  flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex flex-1 items-center justify-start space-x-4">
          <nav className="flex items-center space-x-4 ">
            <Link
              href={siteConfig.links.github || ""}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
                onClick={() => {
                  window.open("mailto:sauravpandey0325@gmail.com", "_blank");
                }}
              >
                <Icons.mail className="w-6 h-6 fill-current" />
                <span className="sr-only">Email</span>
              </div>
            </Link>

            <Link
              href={siteConfig.links.twitter || ""}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/saurav-pandey-b3648530a",
                    "_blank"
                  );
                }}
              >
                <Icons.linkedin className="w-6 h-6 fill-current" />
                <span className="sr-only">Linkedin</span>
              </div>
            </Link>

            <ThemeToggle />
          </nav>
        </div>

        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} SchoolGrid. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
