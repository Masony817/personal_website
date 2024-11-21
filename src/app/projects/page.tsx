import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  {
    id: 1,
    name: "AI-Powered Customer Service Platform",
    description: "A machine learning-based system that automates customer inquiries and improves response times.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Blockchain Supply Chain Solution",
    description: "A decentralized application for tracking and verifying product authenticity across complex supply chains.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "EdTech Mobile App",
    description: "An interactive learning platform that personalizes content based on student performance and learning style.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Projects() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <Image
              src={project.image}
              alt={project.name}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

