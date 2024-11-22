"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Twitter, FileText } from 'lucide-react'
import { cn } from "../lib/utils"
import ModeToggle from "./mode-toggle"

const navItems = [
  { href: "/experience", label: "Experience" },
  { href: "/essays", label: "Essays" },
  { href: "/photos", label: "Photos" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-[1280px] items-center justify-between px-4">
        <Link href="/" className="font-bold">
          MY
        </Link>
        <nav className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center space-x-1">
            <Link
              href="https://github.com/masonyarbrough"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com/masonyarbrough"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="/essays"
              className="text-muted-foreground hover:text-foreground"
            >
              <FileText className="h-5 w-5" />
              <span className="sr-only">Essays</span>
            </Link>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}

