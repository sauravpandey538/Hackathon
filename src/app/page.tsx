"use client";

import QnaPage from "../components/qna";
import { buttonVariants } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  FaUserShield,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-4">
            <div className="bg-logo w-64 h-64 bg-no-repeat bg-cover rounded-full" />
          </div>
          <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight">
            Welcome to SchoolGrid <br />
            <span className="text-2xl md:text-3xl  text-muted-foreground max-w-2xl mx-auto">
              Where expection meets you
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link
              href="/admin"
              className={`${buttonVariants({
                variant: "default",
              })} px-8 py-3 text-lg flex items-center gap-2`}
            >
              <FaUserShield className="w-5 h-5" />
              Admin Portal
            </Link>
            <Link
              href="/teacher"
              className={`${buttonVariants({
                variant: "secondary",
              })} px-8 py-3 text-lg flex items-center gap-2`}
            >
              <FaChalkboardTeacher className="w-5 h-5" />
              Teacher Portal
            </Link>
            <Link
              href="/student"
              className={`${buttonVariants({
                variant: "outline",
              })} px-8 py-3 text-lg flex items-center gap-2`}
            >
              <FaUserGraduate className="w-5 h-5" />
              Student Portal
            </Link>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your role to login into the respective dashboard.
          </p>
        </div>
      </section>

      {/* Keep your How it Works section here if you want it */}
      {/* Features Section */}
      <h1 className="text-xl md:text-3xl font-bold leading-none tracking-tight w-full text-center mb-4">
        Features
      </h1>
      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {[
          {
            title: "Built For Students",
            content:
              "Created by students for students, with real academic needs in mind.",
          },
          {
            title: "Smart Features",
            content:
              "Weekly Routine,  Real-Time Notice, Academic Calendar and more.",
          },
          {
            title: "PreBuild Modules",
            content: "PreBuild Modules for each semester, each faculty ",
          },
          {
            title: "Tailored for You",
            content:
              "Optimized for BIT, CSIT, and BCA programs with relevant tools.",
          },
          {
            title: "Secure & Responsive",
            content:
              "Modern UI with top-notch security and mobile-friendly design.",
          },
          {
            title: "Always Improving",
            content:
              "We're constantly evolving the platform based on student feedback.",
          },
        ].map(({ title, content }, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{content}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* About Section */}
      <section className="container mx-auto w-full text-center space-y-4 px-4  my-16">
        <h1 className="text-xl md:text-3xl font-bold leading-none tracking-tight w-full text-center mb-4">
          🎯 <span className="ml-1">Our Mission</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          School Grid will provide a platform for students to manage their
          academic life, with a focus on ease of use and functionality. And
          admin can manage the whole system from the admin dashboard.
        </p>
      </section>
      <QnaPage />
    </div>
  );
}
