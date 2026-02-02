import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if environment variables are set
const shouldCreateClient = supabaseUrl && supabaseAnonKey && 
  !supabaseUrl.includes('your-') && !supabaseAnonKey.includes('your-')

// Client-side Supabase client
export const supabase = shouldCreateClient 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null as any // Fallback when not configured

// Server-side Supabase client (for use in Server Components)
export const createServerSupabaseClient = () => {
  if (!shouldCreateClient) {
    return null as any // Fallback when not configured
  }
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
