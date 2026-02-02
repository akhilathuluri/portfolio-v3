'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { SUPABASE_CONFIG } from '@/lib/supabase/config'
import Link from 'next/link'
import type { Project } from '@/lib/types/database'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .select('*')
      .order('published_at', { ascending: false })

    if (!error && data) {
      setProjects(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .delete()
      .eq('id', id)

    if (!error) {
      fetchProjects()
    }
  }

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.PROJECTS)
      .update({ is_published: !currentStatus })
      .eq('id', id)

    if (!error) {
      fetchProjects()
    }
  }

  const filteredProjects = projects.filter(p => {
    if (filter === 'published') return p.is_published
    if (filter === 'draft') return !p.is_published
    return true
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-4 py-2 rounded-lg font-medium"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
          }}
        >
          + New Project
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

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <div
            className="p-8 text-center rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              borderWidth: '1px',
            }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>No projects found</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: project.is_published
                          ? 'var(--accent-primary)'
                          : 'var(--bg-tertiary)',
                        color: project.is_published
                          ? 'var(--bg-primary)'
                          : 'var(--text-secondary)',
                      }}
                    >
                      {project.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    {project.summary}
                  </p>
                  {project.tech && (
                    <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>
                      Tech: {project.tech}
                    </p>
                  )}
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {new Date(project.published_at).toLocaleDateString()} • Slug: {project.slug}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(project.id, project.is_published)}
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {project.is_published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
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
