import { createServerSupabaseClient } from '../supabase/client'
import { SUPABASE_CONFIG } from '../supabase/config'
import type { BlogPost } from '../types/database'

/**
 * Blog Posts Service Layer
 * Handles all database operations for blog posts
 */

export class BlogPostsService {
  private supabase = createServerSupabaseClient()
  
  /**
   * Get all published blog posts
   */
  async getAllPublished(limit?: number): Promise<BlogPost[]> {
    if (!this.supabase) return []
    
    const query = this.supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    
    if (limit) {
      query.limit(limit)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      return []
    }
    
    return data || []
  }
  
  /**
   * Get all blog posts (including unpublished) - for admin
   */
  async getAll(): Promise<BlogPost[]> {
    if (!this.supabase) return []
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .select('*')
      .order('published_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching all blog posts:', error)
      return []
    }
    
    return data || []
  }
  
  /**
   * Get a single blog post by slug
   */
  async getBySlug(slug: string): Promise<BlogPost | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    
    if (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error)
      return null
    }
    
    return data
  }
  
  /**
   * Create a new blog post
   */
  async create(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .insert(post)
      .select()
      .single()
    
    if (error) {
      console.error('Error creating blog post:', error)
      return null
    }
    
    return data
  }
  
  /**
   * Update an existing blog post
   */
  async update(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
    if (!this.supabase) return null
    
    const { data, error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .update(post)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating blog post:', error)
      return null
    }
    
    return data
  }
  
  /**
   * Delete a blog post
   */
  async delete(id: string): Promise<boolean> {
    if (!this.supabase) return false
    
    const { error } = await this.supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting blog post:', error)
      return false
    }
    
    return true
  }
}

// Export singleton instance
export const blogPostsService = new BlogPostsService()
