import { projectsService } from '@/lib/services'

/**
 * Get all projects from database
 */
export async function getProjects() {
  const dbProjects = await projectsService.getAllPublished()
  
  return dbProjects.map(project => ({
    metadata: {
      title: project.title,
      publishedAt: project.published_at,
      summary: project.summary,
      image: project.image || undefined,
      tech: project.tech || undefined,
    },
    slug: project.slug,
    content: project.content,
  }))
}

export async function getProjectBySlug(slug: string) {
  const dbProject = await projectsService.getBySlug(slug)
  
  if (!dbProject) return null
  
  return {
    metadata: {
      title: dbProject.title,
      publishedAt: dbProject.published_at,
      summary: dbProject.summary,
      image: dbProject.image || undefined,
      tech: dbProject.tech || undefined,
    },
    slug: dbProject.slug,
    content: dbProject.content,
  }
}
