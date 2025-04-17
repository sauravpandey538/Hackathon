export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SchoolGrid",
  description: "lorem epsum",
  mainNav: [],
  //last nave must be /[role]/auth/login
  lastNav: [
    {
      title: "Login",
      href: "/auth/login",
    },
    {
      title: "Signup",
      href: "/auth/signup",
    },
  ],

  authenticatedNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    //Admin
    {
      title: "Teachers",
      href: "/dashboard/teachers",
    },
    {
      title: "Students",
      href: "/dashboard/students",
    },
    // teacher and student
    {
      title: "Modules",
      href: "/dashboard/modules",
    },
    {
      title: "Routines",
      href: "/dashboard/routines",
    },
  ],
  authenticatedLastNav: [
    {
      title: "Logout",
      href: "/",
    },
  ],

  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/sauravpandey538",
    docs: "https://ui.shadcn.com",
    linkedin: "https://www.linkedin.com/in/saurav-pandey-b3648530a",
    facebook: "https://www.facebook.com/saurav.pandey.3998263",
  },
};
