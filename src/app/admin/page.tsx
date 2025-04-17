"use client";

import { Button, buttonVariants } from "@/src/components/ui/button";
import { useAuth } from "@/src/contexts/auth-context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaTools } from "react-icons/fa";

export default function AdminPage() {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const path = pathname.split("/")[1];
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="bg-admin w-64 h-64 bg-no-repeat bg-cover rounded-full" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Welcome, Admin
        </h1>
        <p className="text-muted-foreground">
          Manage users, faculties, and monitor the system activities across the
          platform.
        </p>
        <div className="flex justify-center gap-4">
          {isAuthenticated ? (
            <div
              className={buttonVariants()}
              onClick={() => {
                router.push(`/${role}/dashboard`);
              }}
            >
              {`Go To ${role}`}
            </div>
          ) : (
            <Button
              onClick={() => {
                router.push(`/${path}/auth/login`);
              }}
              className={buttonVariants()}
            >
              Login to {path}
            </Button>
          )}
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
