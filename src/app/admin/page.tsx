"use client"

import { buttonVariants } from "@/src/components/ui/button"
import Link from "next/link"
import { FaTools } from "react-icons/fa"

export default function AdminPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/10 text-primary">
            <FaTools className="w-10 h-10" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Welcome, Admin</h1>
        <p className="text-muted-foreground">
          Manage users, faculties, and monitor the system activities across the platform.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/admin/dashboard" className={buttonVariants()}>
            Go to Dashboard
          </Link>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
