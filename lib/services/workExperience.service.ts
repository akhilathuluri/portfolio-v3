import { createServerSupabaseClient } from '../supabase/client'
import { SUPABASE_CONFIG } from '../supabase/config'
import type { WorkExperience } from '../types/database'

/**
 * Work Experience Service Layer
 * Handles all database operations for work experience
 */

export class WorkExperienceService {
  private supabase = createServerSupabaseClient()
  
  /**
   * Get all work experience entries ordered by display_order
   */
  async getAll(): Promise<WorkExperience[]> {
    if (!this.supabase) return []
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .select('*')
      .order('display_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching work experience:', error)
      return []
    }
    
    return data || []
  }
  
  /**
   * Get current work experience
   */
  async getCurrent(): Promise<WorkExperience | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .select('*')
      .eq('is_current', true)
      .single()
    
    if (error) {
      console.error('Error fetching current work experience:', error)
      return null
    }
    
    return data
  }
  
  /**
   * Get previous work experiences (not current)
   */
  async getPrevious(): Promise<WorkExperience[]> {
    if (!this.supabase) return []
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .select('*')
      .eq('is_current', false)
      .order('display_order', { ascending: true })
    
    if (error) {
      console.error('Error fetching previous work experience:', error)
      return []
    }
    
    return data || []
  }
  
  /**
   * Create a new work experience entry
   */
  async create(experience: Omit<WorkExperience, 'id' | 'created_at' | 'updated_at'>): Promise<WorkExperience | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .insert(experience)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating work experience:', error)
      return null
    }
    
    return data
  }
  
  /**
   * Update an existing work experience entry
   */
  async update(id: string, experience: Partial<WorkExperience>): Promise<WorkExperience | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .update(experience)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating work experience:', error)
      return null
    }
    
    return data
  }
  
  /**
   * Delete a work experience entry
   */
  async delete(id: string): Promise<boolean> {
    if (!this.supabase) return false
    
    const { error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting work experience:', error)
      return false
    }
    
    return true
  }
  
  /**
   * Reorder work experience entries
   */
  async reorder(items: { id: string; display_order: number }[]): Promise<boolean> {
    if (!this.supabase) return false
    
    try {
      for (const item of items) {
        await this.supabase
          .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
          .update({ display_order: item.display_order })
          .eq('id', item.id)
      }
      return true
    } catch (error) {
      console.error('Error reordering work experience:', error)
      return false
    }
  }
}

// Export singleton instance
export const workExperienceService = new WorkExperienceService()
