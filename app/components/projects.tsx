import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils/date'
import { getProjects } from 'app/projects/data'
import BoxedText from './boxed-text'

// 1. Define Props to make the limit optional
type ProjectsProps = {
  limit?: number
}

export async function Projects({ limit }: ProjectsProps) {
  let allProjects = await getProjects()

  // Sort projects by date
  let sortedProjects = allProjects.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  // 2. Slice the array if a limit is provided
  let displayedProjects = limit ? sortedProjects.slice(0, limit) : sortedProjects

  return (
    <div className="flex flex-col gap-figma-inside-gap">
      {displayedProjects.map((project) => {
        const techStack = project.metadata.tech
          ? project.metadata.tech.split(',').map((t) => t.trim())
          : []

        return (
          <Link
            key={project.slug}
            className="group flex flex-col md:flex-row md:gap-4 items-start mb-4 md:mb-0"
            href={`/projects/${project.slug}`}
          >
            <div 
              className="w-full md:w-40 shrink-0 relative aspect-video md:aspect-[4/3] rounded-lg overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)'
              }}
            >
              {project.metadata.image && (
                <Image
                  src={project.metadata.image}
                  alt={project.metadata.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              )}
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h2 
                  className="font-semibold tracking-tight underline underline-offset-4"
                  style={{
                    color: 'var(--text-primary)',
                    textDecorationColor: 'var(--border-hover)'
                  }}
                >
                  {project.metadata.title}
                </h2>
                <p className="tabular-nums shrink-0 ml-4" style={{ color: 'var(--text-tertiary)' }}>
                  {formatDate(project.metadata.publishedAt, false)}
                </p>
              </div>

              <p className="line-clamp-2 mb-1" style={{ color: 'var(--text-secondary)' }}>
                {project.metadata.summary}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {techStack.map((tech) => (
                  <BoxedText key={tech} text={tech} />
                ))}
              </div>
            </div>
          </Link>
        )
      })}

      {/* 3. Conditional "View All" Button */}
      {limit && (
        <Link
          href="/projects"
          className="inline-flex items-center underline underline-offset-4"
          style={{ textDecorationColor: 'var(--border-hover)' }}
        >
          View all projects
        </Link>
      )}
    </div>
  )
}