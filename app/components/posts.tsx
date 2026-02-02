import Link from 'next/link'
import { formatDate } from '@/lib/utils/date'
import { getBlogPosts } from 'app/blog/data'

type BlogPostsProps = {
  limit?: number
}

export async function BlogPosts({ limit }: BlogPostsProps) {
  let allBlogs = await getBlogPosts()

  let sortedBlogs = allBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })

  // 1. Calculate if we actually need the button
  // It only shows if a limit exists AND we have more posts than that limit
  const showViewAll = limit && allBlogs.length > limit

  // 2. Slice the array
  let displayedBlogs = limit ? sortedBlogs.slice(0, limit) : sortedBlogs

  return (
    <div>
      {displayedBlogs.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col gap-figma-inside-gap group"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-row md:flex-row items-center space-x-0 md:space-x-2">
            <p className="mr-4 md:mr-10 tabular-nums shrink-0" style={{ color: 'var(--text-tertiary)' }}>
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="tracking-tight underline underline-offset-4" style={{ 
              color: 'var(--text-primary)',
              textDecorationColor: 'var(--border-hover)'
            }}>
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}

      {/* 3. Use the calculated boolean here */}
      {showViewAll && (
        <Link
          href="/blog"
          className="inline-flex items-center underline underline-offset-4"
          style={{ textDecorationColor: 'var(--border-hover)' }}
        >
          Read all writings
        </Link>
      )}
    </div>
  )
}