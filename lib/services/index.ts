// Service Layer Barrel Export
// Centralized export for all services

export { blogPostsService, BlogPostsService } from './blogPosts.service'
export { projectsService, ProjectsService } from './projects.service'
export { workExperienceService, WorkExperienceService } from './workExperience.service'

// Re-export types
export type { BlogPost, Project, WorkExperience } from '../types/database'
