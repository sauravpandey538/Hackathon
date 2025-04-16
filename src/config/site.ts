export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Code_Sync",
  description:
    "Code_Sync is a platform for developers to share their code and collaborate with others.",
  mainNav: [
   
  ],
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
    {
      title: "Room",
      href: "/dashboard/room",
    },
  ],
  authenticatedLastNav: [
    {
      title: "Logout",
      href: "/",
    }
    ],
  
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/sauravpandey538",
    docs: "https://ui.shadcn.com",
    linkedin: "https://www.linkedin.com/in/saurav-pandey-b3648530a",
    facebook: "https://www.facebook.com/saurav.pandey.3998263",
  },
}
