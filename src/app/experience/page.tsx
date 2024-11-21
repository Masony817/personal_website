import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const experiences = [
  {
    title: "Full-Stack Product Engineer",
    company: "BuyNothing, Inc.",
    location: "San Francisco, CA (remote)",
    period: "Present",
    description: [
      "Designed and implemented AI-driven features to improve user experience, optimize transaction flows, and boost engagement.",
      "Focused on scaling the user base from 1 million to 5 million and increasing monthly recurring revenue by 5x.",
      "Developed a data-driven funnel strategy to enhance user acquisition, retention, and lifetime value.",
      "Tech Stack: React-Native, Django, PostgreSQL"
    ]
  },
  {
    title: "Co-Founder & Lead Software Engineer",
    company: "GoLocal, Inc.",
    location: "Chattanooga, Tennessee",
    period: "Previous",
    description: [
      "Engineered an AI-driven local experience marketplace mobile app.",
      "Led a team of 6 in full-stack development, integrating LLMs for real-time data and personalized activity matching.",
      "Implemented secure payment processing and drove company growth through product development, fundraising, and local business partnerships.",
      "Tech Stack: Flutter, Django, Supabase"
    ]
  },
  {
    title: "Founding Software Engineer",
    company: "AdScratch LLC",
    location: "Chattanooga, Tennessee",
    period: "Previous",
    description: [
      "Developed a mobile app that gamifies consumer advertising using a daily scratch-off mechanic.",
      "Engineered an advertiser bidding system for dynamic ad pricing.",
      "Designed a reward system that boosts user-engagement, satisfaction, and brand loyalty.",
      "Tech Stack: React Native, Django, Supabase"
    ]
  }
]

export default function Experience() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Work Experience</h1>
      <div className="grid gap-8">
        {experiences.map((exp, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{exp.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{exp.company}</h3>
              <p className="text-sm text-muted-foreground mb-4">{exp.location} - {exp.period}</p>
              <ul className="list-disc pl-5 space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

