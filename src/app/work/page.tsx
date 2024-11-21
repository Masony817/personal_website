import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const workHistory = [
  {
    id: 1,
    company: "TechInnovate Inc.",
    position: "Founder & CEO",
    period: "2018 - Present",
    description: "Leading a team of 50+ to build cutting-edge AI solutions for enterprise clients."
  },
  {
    id: 2,
    company: "DataDrive Solutions",
    position: "Head of Product",
    period: "2015 - 2018",
    description: "Managed the development and launch of a data analytics platform used by Fortune 500 companies."
  },
  {
    id: 3,
    company: "StartupBoost",
    position: "Software Engineer",
    period: "2012 - 2015",
    description: "Developed scalable backend systems for a startup accelerator program."
  },
]

export default function Work() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Work History</h1>
      <div className="grid gap-8">
        {workHistory.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.position}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{job.company}</h3>
              <p className="text-sm text-muted-foreground mb-4">{job.period}</p>
              <p>{job.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

