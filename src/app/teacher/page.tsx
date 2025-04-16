"use client";

import { buttonVariants } from "@/src/components/ui/button";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function TeacherPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="flex justify-center mb-4">
          <div className="bg-logo w-64 h-64 bg-no-repeat bg-cover rounded-full" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Welcome, Teacher
        </h1>
        <p className="text-muted-foreground">
          Access your schedule, manage routines, and handle student assessments
          here.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/teacher/dashboard" className={buttonVariants()}>
            Go to Dashboard
          </Link>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
