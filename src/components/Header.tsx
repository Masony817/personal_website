"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { ThemeToggle } from './ThemeToggle'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Mason Yarbrough</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Home
            </Link>
            <Link
              href="/experience"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/experience")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Experience
            </Link>
            <Link
              href="/skills"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/skills")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Skills
            </Link>
            <Link
              href="/projects"
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname?.startsWith("/projects")
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Projects
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

