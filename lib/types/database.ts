// Database Types for Supabase Tables

export interface BlogPost {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  image?: string | null
  published_at: string
  created_at: string
  updated_at: string
  is_published: boolean
  metadata?: Record<string, any>
}

export interface Project {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  image?: string | null
  tech?: string | null // Comma-separated tech stack
  github_url?: string | null
  demo_url?: string | null
  published_at: string
  created_at: string
  updated_at: string
  is_published: boolean
  metadata?: Record<string, any>
}

export interface WorkExperience {
  id: string
  company_name: string
  company_url: string
  position: string
  location: string
  favicon_url?: string | null
  start_date: string
  end_date?: string | null
  is_current: boolean
  display_order: number
  created_at: string
  updated_at: string
}

// Form types for admin panel
export interface BlogPostFormData {
  slug: string
  title: string
  summary: string
  content: string
  image?: string
  published_at: string
  is_published: boolean
}

export interface ProjectFormData {
  slug: string
  title: string
  summary: string
  content: string
  image?: string
  tech?: string
  published_at: string
  is_published: boolean
}

export interface WorkExperienceFormData {
  company_name: string
  company_url: string
  position: string
  location: string
  favicon_url?: string
  start_date?: string
  end_date?: string
  is_current: boolean
  display_order: number
}

// Database response types
export type DatabaseBlogPost = BlogPost
export type DatabaseProject = Project
export type DatabaseWorkExperience = WorkExperience
