import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatSupport from "@/components/chat-support"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })

export const metadata: Metadata = {
  title: "Urban Fynix | Fashion & Design Brand",
  description: "Premium t-shirts, hoodies and accessories with unique designs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatSupport />
        </body>
      </html>
    </ClerkProvider>
  )
}


import './globals.css'