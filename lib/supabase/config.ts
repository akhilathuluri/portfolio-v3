// Supabase Configuration Constants

export const SUPABASE_CONFIG = {
  tables: {
    BLOG_POSTS: 'blog_posts',
    PROJECTS: 'projects',
    WORK_EXPERIENCE: 'work_experience',
  },
  
  // Default query options
  defaultLimit: 100,
  
  // Storage buckets (if you want to add file uploads later)
  buckets: {
    IMAGES: 'images',
    PROJECTS: 'projects',
  },
} as const

// Admin configuration
export const ADMIN_CONFIG = {
  // Admin email from environment variable
  get adminEmail() {
    return process.env.NEXT_PUBLIC_ADMIN_EMAIL || ''
  },
  
  // Session duration (in seconds)
  sessionDuration: 3600, // 1 hour
} as const

// Error messages
export const ERROR_MESSAGES = {
  AUTH_REQUIRED: 'Authentication required',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
  DATABASE_ERROR: 'Database error occurred',
} as const
