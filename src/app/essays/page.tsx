import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function EssaysPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Essays</h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            I haven&apos;t written any essays yet, but I have plans to start sharing my thoughts and experiences soon. Stay tuned!
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

