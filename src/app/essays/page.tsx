"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Essay {
  title: string
  content: string
  publishDate: string
  reviewers: string[]
  summary: string
}

interface EssayMetadata {
  title: string
  file: string
  publishDate: string
  reviewers: string[]
  summary: string
}

export default function EssaysPage() {
  const [essays, setEssays] = useState<Essay[]>([])
  const [activeEssay, setActiveEssay] = useState<Essay | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadEssays = async () => {
      try {
        const metadataResponse = await fetch("/essays/essaysMetadata.json")
        if (!metadataResponse.ok) {
          throw new Error("Failed to fetch essays metadata.")
        }
        const essayMetadata: EssayMetadata[] = await metadataResponse.json()

        const loadedEssays = await Promise.all(
          essayMetadata.map(async (essay) => {
            const response = await fetch(essay.file)
            if (!response.ok) {
              throw new Error(`Failed to fetch content for ${essay.title}.`)
            }
            const text = await response.text()
            return {
              title: essay.title,
              content: text,
              publishDate: essay.publishDate,
              reviewers: essay.reviewers,
              summary: essay.summary,
            }
          })
        )

        setEssays(loadedEssays)
      } catch (error: any) {
        console.error(error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadEssays()
  }, [])

  const handleSelectEssay = (essay: Essay) => {
    setActiveEssay(essay)
  }

  const handleBackToList = () => {
    setActiveEssay(null)
  }

  if (isLoading) {
    return <div className="text-center text-xl">Loading essays...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  return (
    <div className="max-w-[640px] mx-auto space-y-12 py-16">
      <h1 className="text-4xl font-bold">Essays</h1>

      {!activeEssay ? (
        /* Essay List Screen */
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          {essays.map((essay, index) => (
            <Card
              key={index}
              className="w-full bg-card dark:bg-card/80 border border-border/30 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-101 mb-3"
              onClick={() => handleSelectEssay(essay)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold">{essay.title}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Published on {new Date(essay.publishDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <p className="text-muted-foreground text-sm leading-snug">{essay.summary}</p>
              </CardContent>
              <CardFooter className="pt-2">
                <Button variant="ghost" className="text-sm p-0 h-auto">Read More →</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        /* Essay Detail Screen */
        <div className="space-y-6">
          <Button onClick={handleBackToList} className="mb-4">
            ← Back to Essays
          </Button>
          <Card className="bg-card dark:bg-card/80 border border-border/30 rounded-lg p-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl mb-2">{activeEssay.title}</CardTitle>
              <CardDescription className="text-muted-foreground">
                Mason Yarbrough - Published on {new Date(activeEssay.publishDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown 
                components={{
                  p: ({node, ...props}) => (
                    <p className="mb-6 text-muted-foreground leading-relaxed" {...props} />
                  ),
                  h1: ({node, ...props}) => (
                    <h1 className="text-2xl font-bold mb-4 mt-8" {...props} />
                  ),
                  h2: ({node, ...props}) => (
                    <h2 className="text-xl font-semibold mb-3 mt-6" {...props} />
                  ),
                  ul: ({node, ...props}) => (
                    <ul className="list-disc list-inside mb-6" {...props} />
                  ),
                  li: ({node, ...props}) => (
                    <li className="text-muted-foreground mb-2" {...props} />
                  ),
                  a: ({node, ...props}) => (
                    <a className="text-primary hover:underline" {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {activeEssay.content}
              </ReactMarkdown>
              <div className="mt-6">
                <p className="text-muted-foreground">
                  <a href="https://www.linkedin.com/in/jaydshaffer/" className="text-primary hover:underline">Jay Shaffer</a> - Short-term mentor and Chattanooga VC
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
