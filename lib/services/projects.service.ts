import { createServerSupabaseClient } from '../supabase/client'
import { SUPABASE_CONFIG } from '../supabase/config'
import type { Project } from '../types/database'

/**
 * Projects Service Layer
 * Handles all database operations for projects
 */

export class ProjectsService {
  private supabase = createServerSupabaseClient()
  
  /**
   * Get all published projects
   */
  async getAllPublished(limit?: number): Promise<Project[]> {
    if (!this.supabase) return []
    
    const query = this.supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    
    if (limit) {
      query.limit(limit)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching projects:', error)
      return []
    }
    
    return data || []
  }
  
  /**
   * Get all projects (including unpublished) - for admin
   */
  async getAll(): Promise<Project[]> {
    if (!this.supabase) return []
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .select('*')
      .order('published_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching all projects:', error)
      return []
    }
    
    return data || []
  }
  
  /**
   * Get a single project by slug
   */
  async getBySlug(slug: string): Promise<Project | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    
    if (error) {
      console.error(`Error fetching project with slug ${slug}:`, error)
      return null
    }
    
    return data
  }
  
  /**
   * Create a new project
   */
  async create(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .insert(project)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating project:', error)
      return null
    }
    
    return data
  }
  
  /**
   * Update an existing project
   */
  async update(id: string, project: Partial<Project>): Promise<Project | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .update(project)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating project:', error)
      return null
    }
    
    return data
  }
  
  /**
   * Delete a project
   */
  async delete(id: string): Promise<boolean> {
    if (!this.supabase) return false
    
    const { error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting project:', error)
      return false
    }
    
    return true
  }
}

// Export singleton instance
export const projectsService = new ProjectsService()
