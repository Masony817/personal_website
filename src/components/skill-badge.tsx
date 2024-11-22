import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface SkillBadgeProps {
  name: string
  logo: string
}

export function SkillBadge({ name, logo }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className="flex items-center space-x-1 py-1 px-2">
      <Image src={logo} alt="" width={16} height={16} className="w-4 h-4" />
      <span>{name}</span>
    </Badge>
  )
}

