import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const essays = [
  { id: 1, title: "The Future of AI in Startups", date: "2023-06-15", excerpt: "Exploring how artificial intelligence is shaping the startup ecosystem..." },
  { id: 2, title: "Building a Culture of Innovation", date: "2023-05-22", excerpt: "Key strategies for fostering creativity and innovation in your organization..." },
  { id: 3, title: "The Importance of User-Centric Design", date: "2023-04-10", excerpt: "Why putting users at the center of your design process leads to better products..." },
]

export default function Essays() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Essays</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {essays.map((essay) => (
          <Card key={essay.id}>
            <CardHeader>
              <CardTitle>{essay.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{essay.date}</p>
              <p className="mb-4">{essay.excerpt}</p>
              <Link href={`/essays/${essay.id}`} className="text-primary hover:underline">
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

