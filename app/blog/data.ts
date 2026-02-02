import { blogPostsService } from '@/lib/services'

/**
 * Get all blog posts from database
 */
export async function getBlogPosts() {
  const dbPosts = await blogPostsService.getAllPublished()
  
  return dbPosts.map(post => ({
    metadata: {
      title: post.title,
      publishedAt: post.published_at,
      summary: post.summary,
      image: post.image || undefined,
    },
    slug: post.slug,
    content: post.content,
  }))
}

export async function getBlogPostBySlug(slug: string) {
  const dbPost = await blogPostsService.getBySlug(slug)
  
  if (!dbPost) return null
  
  return {
    metadata: {
      title: dbPost.title,
      publishedAt: dbPost.published_at,
      summary: dbPost.summary,
      image: dbPost.image || undefined,
    },
    slug: dbPost.slug,
    content: dbPost.content,
  }
}
