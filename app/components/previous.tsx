import Image from "next/image"
import { workExperienceService } from "@/lib/services"

const Previous = async () => {
  const experiences = await workExperienceService.getPrevious()

  return (
    <section>
      <div className="flex flex-col gap-figma-inside-gap">
        <h1 className="font-semibold italic">
          Previous
        </h1>

        {experiences.map((exp) => (
          <div key={exp.id} className="flex items-center justify-start gap-2">
            {exp.favicon_url && (
              <Image 
                src={exp.favicon_url} 
                alt={`${exp.company_name} favicon`} 
                height={10} 
                width={10} 
              />
            )}
            <p>
              <a target="_blank" 
                rel="noopener noreferrer"
                href={exp.company_url}
                className="underline underline-offset-4"
                style={{ textDecorationColor: 'var(--border-hover)' }}
              >
                {exp.company_name}
              </a>
              {' '} ~ {exp.position} [{exp.location}]
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Previous
