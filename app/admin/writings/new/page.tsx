'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { SUPABASE_CONFIG } from '@/lib/supabase/config'

export default function NewWritingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    image: '',
    published_at: new Date().toISOString().split('T')[0],
    is_published: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .insert({
        ...formData,
        published_at: new Date(formData.published_at).toISOString(),
      })

    if (!error) {
      router.push('/admin/writings')
    } else {
      alert('Error creating post: ' + error.message)
    }
    setLoading(false)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">New Blog Post</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Create a new blog post or article
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
              value={formData.title}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: formData.slug || generateSlug(e.target.value),
                })
              }}
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
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border font-mono text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              URL-friendly version (lowercase, hyphens only)
            </p>
          </div>

          {/* Summary */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Summary *</label>
            <textarea
              required
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
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
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={20}
              className="w-full px-4 py-2 rounded-lg border font-mono text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              placeholder="Write your content here using Markdown..."
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              placeholder="/images/post.jpg or https://..."
            />
          </div>

          {/* Published Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Published Date *</label>
            <input
              type="date"
              required
              value={formData.published_at}
              onChange={(e) => setFormData({ ...formData, published_at: e.target.value })}
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
                checked={formData.is_published}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Publish immediately</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-lg font-medium disabled:opacity-50"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            {loading ? 'Creating...' : 'Create Post'}
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
