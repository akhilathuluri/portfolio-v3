import { supabase } from '../supabase/client'
import { ADMIN_CONFIG } from '../supabase/config'

/**
 * Authentication utilities for admin panel
 */

export const authService = {
  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      throw new Error(error.message)
    }
    
    return { success: true }
  },
  
  /**
   * Sign out
   */
  async signOut() {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw new Error(error.message)
    }
    
    return { success: true }
  },
  
  /**
   * Get current user
   */
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      throw new Error(error.message)
    }
    
    return user
  },
  
  /**
   * Check if user is authenticated
   */
  async isAuthenticated() {
    try {
      const user = await this.getCurrentUser()
      return !!user
    } catch {
      return false
    }
  },
  
  /**
   * Check if user is admin
   */
  async isAdmin() {
    try {
      const user = await this.getCurrentUser()
      if (!user) return false
      
      // Check if user email matches admin email
      const adminEmail = ADMIN_CONFIG.adminEmail
      return user.email === adminEmail
    } catch {
      return false
    }
  },
  
  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null)
    })
  },
}
