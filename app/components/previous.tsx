import Image from "next/image"
import { workExperienceService } from "@/lib/services"

const Previous = async () => {
  // Try to fetch from database, fallback to hardcoded data
  let experiences = []
  
  try {
    experiences = await workExperienceService.getPrevious()
  } catch (error) {
    console.log('Database not configured, using hardcoded data')
    // Fallback to original hardcoded data
    experiences = [
      {
        id: '1',
        company_name: 'leapx.ai',
        company_url: 'https://leapx.ai/',
        position: 'ai engineer intern',
        location: 'gurgaon, india',
        favicon_url: '/leapx-ai-favicon.svg',
        display_order: 1,
      },
      {
        id: '2',
        company_name: 'composio.dev',
        company_url: 'https://composio.dev/',
        position: 'software engineering (python)',
        location: 'bangalore, india',
        favicon_url: '/composio-dev-favicon.svg',
        display_order: 2,
      },
      {
        id: '3',
        company_name: 'successscholar.in',
        company_url: 'https://successscholar.in/',
        position: 'product owner/developer',
        location: 'kolkata, india',
        favicon_url: '/successscholar-favicon.svg',
        display_order: 3,
      },
    ]
  }

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
