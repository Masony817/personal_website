import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mason Yarbrough",
  description: "Full-Stack Product Engineer and Co-Founder",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navigation />
            <main className="flex-grow container mx-auto px-4 py-8 mt-14 max-w-4xl">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

