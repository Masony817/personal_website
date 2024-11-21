import Link from 'next/link'
import { Twitter, Linkedin, Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Mason Yarbrough. The source code is available on{" "}
            <Link
              href="https://github.com/yourusername/your-repo"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex space-x-4">
          <Link href="https://twitter.com/yourusername" className="text-muted-foreground hover:text-primary">
            <Twitter size={20} />
          </Link>
          <Link href="https://linkedin.com/in/yourusername" className="text-muted-foreground hover:text-primary">
            <Linkedin size={20} />
          </Link>
          <Link href="https://github.com/yourusername" className="text-muted-foreground hover:text-primary">
            <Github size={20} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

