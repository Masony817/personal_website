import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skills = [
  {
    category: "Languages",
    items: ["Python", "Dart", "JavaScript", "TypeScript", "Java"]
  },
  {
    category: "Frameworks",
    items: ["Flutter", "React", "React Native", "Django", "Node.js", "P5.js"]
  },
  {
    category: "Databases",
    items: ["Supabase", "PostgreSQL", "Firebase", "MongoDB"]
  },
  {
    category: "AI/ML",
    items: ["TensorFlow", "Llama Models", "OpenAI & Claude API's", "Prompt Engineering", "PyTorch"]
  }
]

export default function Skills() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Technical Skills</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {skills.map((skill, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{skill.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {skill.items.map((item, i) => (
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

