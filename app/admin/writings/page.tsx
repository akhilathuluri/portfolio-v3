'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { SUPABASE_CONFIG } from '@/lib/supabase/config'
import Link from 'next/link'
import type { BlogPost } from '@/lib/types/database'

export default function WritingsPage() {
  const [writings, setWritings] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    fetchWritings()
  }, [])

  const fetchWritings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .select('*')
      .order('published_at', { ascending: false })

    if (!error && data) {
      setWritings(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .delete()
      .eq('id', id)

    if (!error) {
      fetchWritings()
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.BLOG_POSTS)
      .update({ is_published: !currentStatus })
      .eq('id', id)

    if (!error) {
      fetchWritings()
    }
  }

  const filteredWritings = writings.filter(w => {
    if (filter === 'published') return w.is_published
    if (filter === 'draft') return !w.is_published
    return true
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Writings</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your blog posts and articles
          </p>
        </div>
        <Link
          href="/admin/writings/new"
          className="px-4 py-2 rounded-lg font-medium"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
          }}
        >
          + New Post
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6">
        {['all', 'published', 'draft'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className="px-4 py-2 rounded-lg capitalize transition-all"
            style={{
              backgroundColor: filter === f ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderWidth: '1px',
              borderColor: filter === f ? 'var(--border-hover)' : 'var(--border-color)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Writings List */}
      <div className="space-y-4">
        {filteredWritings.length === 0 ? (
          <div
            className="p-8 text-center rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              borderWidth: '1px',
            }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>No posts found</p>
          </div>
        ) : (
          filteredWritings.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: post.is_published
                          ? 'var(--accent-primary)'
                          : 'var(--bg-tertiary)',
                        color: post.is_published
                          ? 'var(--bg-primary)'
                          : 'var(--text-secondary)',
                      }}
                    >
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {post.summary}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {new Date(post.published_at).toLocaleDateString()} • Slug: {post.slug}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link
                    href={`/admin/writings/${post.id}`}
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(post.id, post.is_published)}
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {post.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      backgroundColor: '#ef4444',
                      color: 'white',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
