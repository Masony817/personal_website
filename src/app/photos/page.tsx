import Image from "next/image"

const photos = [
  { src: "/placeholder.svg?height=300&width=400", alt: "Scenic landscape" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Urban architecture" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Tech conference" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Startup team" },
  { src: "/placeholder.svg?height=300&width=400", alt: "AI visualization" },
  { src: "/placeholder.svg?height=300&width=400", alt: "Nature and technology" },
]

export default function PhotosPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Photos</h1>
      <p className="text-muted-foreground">A collection of moments from my journey in tech and entrepreneurship.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <div key={index} className="overflow-hidden rounded-lg">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={400}
              height={300}
              className="object-cover transition-all hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

