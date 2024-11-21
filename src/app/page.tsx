import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-12 pt-12">
      <div className="text-center space-y-4">
        <div className="relative w-40 h-40 mx-auto mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-lg opacity-75"></div>
          <Image
            src="/placeholder.svg?height=160&width=160"
            alt="Mason Yarbrough"
            width={160}
            height={160}
            className="rounded-full relative z-10"
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Mason Yarbrough</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Full-Stack Product Engineer with expertise in AI-driven features, mobile app development, and scalable solutions.
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="mailto:your.email@example.com">Email</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://twitter.com/yourusername">Twitter</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://github.com/yourusername">GitHub</Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Professional journey and roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Full-Stack Product Engineer at BuyNothing, Inc.</li>
              <li>Co-Founder & Lead Software Engineer at GoLocal, Inc.</li>
              <li>Founding Software Engineer at AdScratch LLC</li>
            </ul>
            <Button asChild className="mt-4 w-full">
              <Link href="/experience">View Full Experience</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Technical expertise and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Python</Badge>
              <Badge>Dart</Badge>
              <Badge>JavaScript</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Flutter</Badge>
              <Badge>React</Badge>
              <Badge>Django</Badge>
              <Badge>Node.js</Badge>
            </div>
            <Button asChild className="mt-4 w-full">
              <Link href="/skills">View All Skills</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Innovative solutions and applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>AI-driven local experience marketplace</li>
              <li>Gamified consumer advertising platform</li>
              <li>Scalable data analytics solution</li>
            </ul>
            <Button asChild className="mt-4 w-full">
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

