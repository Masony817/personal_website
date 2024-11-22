import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  const skills = [
    "Python", "Dart", "JavaScript", "TypeScript", "Java",
    "Flutter", "React", "React Native", "Django", "Node.js",
    "Supabase", "PostgreSQL", "Firebase", "MongoDB",
    "TensorFlow", "LLMs", "OpenAI API", "Prompt Engineering"
  ]

  return (
    <div className="max-w-[640px] mx-auto space-y-12 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Mason Yarbrough</h1>
        <p className="text-lg text-muted-foreground">
          Full-Stack Product Engineer and Co-Founder passionate about AI-driven solutions and scalable applications.
        </p>
      </div>

      <div className="space-y-4 leading-relaxed">
        <p>
          Working at <Link href="#" className="text-primary hover:underline">BuyNothing, Inc.</Link>, 
          where I design and implement AI-driven features to improve user experiences and optimize workflows.
        </p>
        
        <p>
          Creator of{" "}
          <Link href="#" className="text-primary hover:underline">GoLocal</Link>, an AI-driven local experience marketplace, and{" "}
          <Link href="#" className="text-primary hover:underline">AdScratch</Link>, a gamified consumer advertising platform.
        </p>

        <p>
          I specialize in scaling applications and improving user engagement through AI integration. My journey has taken me from founding startups to increasing monthly recurring revenue for established companies.
        </p>

        <p>
          I write <Link href="/essays" className="text-primary hover:underline">essays</Link> about software development, AI, and entrepreneurship.
          You can find my open-source projects on{" "}
          <Link href="https://github.com/masonyarbrough" className="text-primary hover:underline">GitHub</Link>.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Technologies</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((tech) => (
            <div 
              key={tech}
              className="inline-flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Image 
                src={`/logos/${tech.toLowerCase().replace(/\s/g, '-')}.svg`}
                alt=""
                width={16}
                height={16}
                className="opacity-75 group-hover:opacity-100"
              />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Featured Work</h2>
        <ul className="space-y-4">
          <li className="flex items-baseline gap-4">
            <span className="text-muted-foreground font-medium w-32">BuyNothing, Inc.</span>
            <span>Scaled user base from 1 million to 5 million with AI-driven features</span>
          </li>
          <li className="flex items-baseline gap-4">
            <span className="text-muted-foreground font-medium w-32">GoLocal, Inc.</span>
            <span>Led development of AI-driven local experience marketplace</span>
          </li>
          <li className="flex items-baseline gap-4">
            <span className="text-muted-foreground font-medium w-32">AdScratch LLC</span>
            <span>Developed gamified consumer advertising platform</span>
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p className="text-muted-foreground">
          Feel free to reach out if you'd like to collaborate on a project, discuss technology, or just have a chat about the latest in AI and software development.
        </p>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/projects">View My Projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="mailto:mason@example.com">Contact Me</Link>
          </Button>
        </div>
      </section>

      <div className="pt-8">
        <p className="text-sm text-muted-foreground">
          If you find my work useful, consider{" "}
          <Link href="/sponsors" className="text-primary hover:underline">
            sponsoring me
          </Link>{" "}
          to help me continue building open source software.
        </p>
      </div>
    </div>
  )
}

