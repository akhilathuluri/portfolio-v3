'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { SUPABASE_CONFIG } from '@/lib/supabase/config'
import type { Project } from '@/lib/types/database'

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    const { data, error } = await supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .select('*')
      .eq('id', params.id)
      .single()

    if (!error && data) {
      setProject(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return

    setSaving(true)

    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .update({
        title: project.title,
        slug: project.slug,
        summary: project.summary,
        content: project.content,
        image: project.image,
        tech: project.tech,
        github_url: project.github_url,
        demo_url: project.demo_url,
        published_at: project.published_at,
        is_published: project.is_published,
      })
      .eq('id', project.id)

    if (!error) {
      router.push('/admin/projects')
    } else {
      alert('Error updating project: ' + error.message)
    }
    setSaving(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Update your project details
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
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
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
              value={project.slug}
              onChange={(e) => setProject({ ...project, slug: e.target.value })}
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
              value={project.summary}
              onChange={(e) => setProject({ ...project, summary: e.target.value })}
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
              value={project.content}
              onChange={(e) => setProject({ ...project, content: e.target.value })}
              rows={15}
              className="w-full px-4 py-2 rounded-lg border font-mono text-sm"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Tech Stack */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tech Stack</label>
            <input
              type="text"
              value={project.tech || ''}
              onChange={(e) => setProject({ ...project, tech: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
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
              value={project.image || ''}
              onChange={(e) => setProject({ ...project, image: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* GitHub URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">GitHub URL</label>
            <input
              type="text"
              value={project.github_url || ''}
              onChange={(e) => setProject({ ...project, github_url: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Demo URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Demo URL</label>
            <input
              type="text"
              value={project.demo_url || ''}
              onChange={(e) => setProject({ ...project, demo_url: e.target.value })}
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
              value={project.published_at.split('T')[0]}
              onChange={(e) => setProject({ ...project, published_at: new Date(e.target.value).toISOString() })}
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
                checked={project.is_published}
                onChange={(e) => setProject({ ...project, is_published: e.target.checked })}
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
