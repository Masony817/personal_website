import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "BuyNothing App",
    description: "Scaled user base from 1 million to 5 million with AI-driven features.",
    technologies: ["React Native", "Django", "PostgreSQL", "AI"],
    logo: "/logos/buynothing.svg"
  },
  {
    title: "GoLocal Marketplace",
    description: "AI-driven local experience marketplace mobile app.",
    technologies: ["Flutter", "Django", "Supabase", "LLMs"],
    logo: "/logos/golocal.svg"
  },
  {
    title: "AdScratch",
    description: "Gamified consumer advertising platform with dynamic ad pricing.",
    technologies: ["React Native", "Django", "Supabase"],
    logo: "/logos/adscratch.svg"
  },
]

export default function ExperiencePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Experience</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((experience) => (
          <Card key={experience.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-4">
              <Image 
                src={experience.logo} 
                alt={`${experience.title} logo`}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <CardTitle>{experience.title}</CardTitle>
                <CardDescription>{experience.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

