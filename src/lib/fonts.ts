import { Fira_Code, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ['400', '500', '600', '700'],
})


export const fontCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
  weight: ['400', '500', '600', '700'],
})