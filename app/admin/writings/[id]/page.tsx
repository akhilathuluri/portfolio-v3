'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { SUPABASE_CONFIG } from '@/lib/supabase/config'
import type { BlogPost } from '@/lib/types/database'

export default function EditWritingPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [post, setPost] = useState<BlogPost | null>(null)

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .select('*')
      .eq('id', params.id)
      .single()

    if (!error && data) {
      setPost(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post) return

    setSaving(true)

    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .update({
        title: post.title,
        slug: post.slug,
        summary: post.summary,
        content: post.content,
        image: post.image,
        published_at: post.published_at,
        is_published: post.is_published,
      })
      .eq('id', post.id)

    if (!error) {
      router.push('/admin/writings')
    } else {
      alert('Error updating post: ' + error.message)
    }
    setSaving(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Blog Post</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Update your blog post
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
          }}
        >
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              required
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Slug */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              required
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border font-mono text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Summary */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Summary *</label>
            <textarea
              required
              value={post.summary}
              onChange={(e) => setPost({ ...post, summary: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Content (Markdown) *</label>
            <textarea
              required
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-2 rounded-lg border font-mono text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={post.image || ''}
              onChange={(e) => setPost({ ...post, image: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Published Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Published Date *</label>
            <input
              type="date"
              required
              value={post.published_at.split('T')[0]}
              onChange={(e) => setPost({ ...post, published_at: new Date(e.target.value).toISOString() })}
              className="px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Published Status */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={post.is_published}
                onChange={(e) => setPost({ ...post, is_published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Published</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg font-medium disabled:opacity-50"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
