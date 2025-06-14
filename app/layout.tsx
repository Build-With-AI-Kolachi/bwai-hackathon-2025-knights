import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, BarChart3, Upload } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TalentCanvas - AI-Powered Talent Intelligence",
  description: "Internal talent intelligence platform with AI-powered performance analysis and insights",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-white">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-xl font-bold text-blue-600">
                TalentCanvas
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button variant="ghost" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
