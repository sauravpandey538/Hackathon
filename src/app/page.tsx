"use client"

import Link from "next/link"
import { buttonVariants } from "../components/ui/button"
import { FaCode, FaShareAlt, FaUserFriends, FaKeyboard } from 'react-icons/fa'
import { MdRocketLaunch } from 'react-icons/md'

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background">



      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <FaCode className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Collaborate on Code{' '}
            <span className="text-primary">Instantly</span>
            <br className="hidden sm:inline" />
            with Real-Time Sync
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            CodeSync is a minimalist collaborative code editor that enables you to code together with your friends in real-time.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/auth/signup" 
              className={`${buttonVariants()} px-8 py-3 text-lg flex items-center gap-2`}
            >
              <MdRocketLaunch className="w-5 h-5" />
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="container mx-auto px-4 py-20 ">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            How it works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors border border-border">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FaCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Create a Room</h3>
              <p className="text-muted-foreground">
                Sign up and create your first collaborative coding room
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors border border-border">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FaShareAlt className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Share Room</h3>
              <p className="text-muted-foreground">
                Share the room ID with your friends to invite them
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors border border-border">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FaUserFriends className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Join Room</h3>
              <p className="text-muted-foreground">
                Friends can join using the shared room ID
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card hover:bg-card/80 transition-colors border border-border">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                <FaKeyboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Start Coding</h3>
              <p className="text-muted-foreground">
                Begin coding together in real-time with instant sync
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
