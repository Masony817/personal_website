import Image from "next/image"

interface TechnologiesProps {
  skills: string[]
  animationClass: string
  keySuffix: string
}

const Technologies: React.FC<TechnologiesProps> = ({ skills, animationClass, keySuffix }) => {
  // Duplicate the skills array for seamless scrolling
  const duplicatedSkills = [...skills, ...skills]

  return (
    <div className={`flex ${animationClass}`}>
      {duplicatedSkills.map((tech, index) => (
        <div 
          key={`${tech}-${index}-${keySuffix}`}
          className="inline-flex items-center space-x-2 text-sm px-3 py-1.5 rounded-md bg-accent/10 hover:bg-accent/20 text-accent-foreground transition-all hover:shadow-sm hover:scale-110 mx-2 whitespace-nowrap"
        >
          <Image 
            src={`/logos/${tech.toLowerCase().replace(/\s/g, '-')}.svg`}
            alt={tech}
            width={18}
            height={18}
            className="opacity-75 group-hover:opacity-100"
          />
          <span>{tech}</span>
        </div>
      ))}
    </div>
  )
}

export default Technologies 