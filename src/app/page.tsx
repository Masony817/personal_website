import Link from "next/link"
import { Button } from "@/components/ui/button"
import Technologies from "@/components/Technologies"
import Image from "next/image"
export default function Home() {
  // Define two distinct arrays of skills
  const skillsRow1 = [
    "Python", "Dart", "JavaScript", "TypeScript", "Java",
    "Flutter", "React", "React Native", "Django",
  ]

  const skillsRow2 = [
    "Nodejs", "Supabase", "PostgreSQL", "Firebase", "MongoDB",
    "Go", "TensorFlow", "LLMs", "OpenAI API",
  ]

  return (
    <div className="max-w-[640px] mx-auto space-y-12 py-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Mason Yarbrough</h1>
        <p className="text-lg text-muted-foreground">
          Founder and Full-Stack Product Engineer building AI that improves the way humans interact with technology.
        </p>
      </div>

      <div className="space-y-4 leading-relaxed text-gray-300">
        <p>
          I&apos;m currently working on <Link href="#" className="text-primary hover:underline font-semibold transition-colors duration-200">Kallro</Link>, an AI-driven platform that enhances business phone systems, making customer interactions smoother and more efficient.
        </p>

        <p>
          I&apos;m also helping build AI features at <Link href="#" className="text-primary hover:underline font-semibold transition-colors duration-200">BuyNothing</Link>, a platform that connects local communities by facilitating hyperlocal gifting and sharing.
        </p>

        <p>
          Before these, I created <Link href="#" className="text-primary hover:underline font-semibold transition-colors duration-200">GoLocal</Link>, a marketplace for discovering local experiences, and <Link href="#" className="text-primary hover:underline font-semibold transition-colors duration-200">AdScratch</Link>, a gamified advertising platform that connects brands with users in a fun and engaging way.
        </p>

        <p>
          When I&apos;m not coding, I write <Link href="/essays" className="text-primary hover:underline font-semibold transition-colors duration-200">essays</Link> about software development, AI, and entrepreneurship. You can find my open-source projects on <Link href="https://github.com/masonyarbrough" className="text-primary hover:underline font-semibold transition-colors duration-200">GitHub</Link>.
        </p>
      </div>

      <div className="space-y-6 p-6 rounded-lg bg-card shadow-md dark:bg-card/80 border border-border/30 mx-auto max-w-3xl overflow-hidden">
        <h2 className="text-2xl font-semibold text-center">Technologies</h2>
        <div className="relative overflow-hidden">
          <div className="flex flex-col gap-4">
            {/* Row 1 */}
            <Technologies skills={skillsRow1} animationClass="animate-scroll-left-1" keySuffix="row1" />
            {/* Row 2 */}
            <Technologies skills={skillsRow2} animationClass="animate-scroll-left-2" keySuffix="row2" />
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card dark:bg-card/80 border border-border/30 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 mr-2">
                <Image src="/logos/kallro-logo.svg" alt="Kallro Logo" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold">Kallro</h3>
            </div>
            <p className="text-muted-foreground mb-4">Developing an AI-driven platform for B2B phone management</p>
            <Link href="#" className="text-primary hover:underline text-sm">Learn more →</Link>
          </div>
          <div className="bg-card dark:bg-card/80 border border-border/30 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 mr-2">
                <Image src="/logos/buynothing-logo.png" alt="BuyNothing Logo" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold">BuyNothing, Inc.</h3>
            </div>
            <p className="text-muted-foreground mb-4">Building AI-driven features and user funnels for hyperlocal gifting</p>
            <Link href="https://buynothingproject.org/" className="text-primary hover:underline text-sm">Learn more →</Link>
          </div>
          <div className="bg-card dark:bg-card/80 border border-border/30 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 mr-2">
                <Image src="/logos/golocal-logo.svg" alt="GoLocal Logo" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold">GoLocal, Inc.</h3>
            </div>
            <p className="text-muted-foreground mb-4">Led development of AI-driven local experience marketplace</p>
            <Link href="#" className="text-primary hover:underline text-sm">Learn more →</Link>
          </div>
          <div className="bg-card dark:bg-card/80 border border-border/30 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 mr-2">
                <Image src="/logos/adscratch_logo.png" alt="AdScratch Logo" width={24} height={24} />
              </div>
              <h3 className="text-xl font-semibold">AdScratch LLC</h3>
            </div>
            <p className="text-muted-foreground mb-4">Developed gamified consumer advertising platform</p>
            <Link href="#" className="text-primary hover:underline text-sm">Learn more →</Link>
          </div>
        </div>
      </section>

      <section className="space-y-6 flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p className="text-muted-foreground max-w-lg">
          Feel free to reach out if you&apos;d like to help me build Kallro, discuss technology, or just want to talk.
        </p>
        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/projects">View My Projects</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="mailto:masony817@gmail.com">Contact Me</Link>
          </Button>
        </div>
      </section>

      <div className="pt-8">
        <p className="text-sm text-muted-foreground">
          If you find my work useful, consider{" "}
          <Link href="https://venmo.com/u/Masony0817" className="text-primary hover:underline">
            sponsoring me
          </Link>{" "}
          to help me continue building open source software.
        </p>
      </div>
    </div>
  )
}

