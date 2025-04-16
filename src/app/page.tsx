"use client"

import Link from "next/link"
import { buttonVariants } from "../components/ui/button"
import { FaUserShield, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa'
import { MdRocketLaunch } from 'react-icons/md'

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <MdRocketLaunch className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-xl md:text-5xl font-extrabold text-foreground tracking-tight">
            College Management System{' '}
            <span className="text-primary">Portal</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your role to login into the respective dashboard.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/admin"
              className={`${buttonVariants({ variant: "default" })} px-8 py-3 text-lg flex items-center gap-2`}
            >
              <FaUserShield className="w-5 h-5" />
              Admin Portal
            </Link>
            <Link
              href="/teacher"
              className={`${buttonVariants({ variant: "secondary" })} px-8 py-3 text-lg flex items-center gap-2`}
            >
              <FaChalkboardTeacher className="w-5 h-5" />
              Teacher Portal
            </Link>
            <Link
              href="/student"
              className={`${buttonVariants({ variant: "outline" })} px-8 py-3 text-lg flex items-center gap-2`}
            >
              <FaUserGraduate className="w-5 h-5" />
              Student Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Keep your How it Works section here if you want it */}
    </div>
  )
}
