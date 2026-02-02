'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { SUPABASE_CONFIG } from '@/lib/supabase/config'
import Link from 'next/link'
import type { WorkExperience } from '@/lib/types/database'

export default function WorkExperiencePage() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .select('*')
      .order('display_order', { ascending: true })

    if (!error && data) {
      setExperiences(data)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) return

    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .delete()
      .eq('id', id)

    if (!error) {
      fetchExperiences()
    }
  }

  const handleToggleCurrent = async (id: string, currentStatus: boolean) => {
    // First, set all to not current
    await supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .update({ is_current: false })
      .neq('id', id)

    // Then set this one
    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .update({ is_current: !currentStatus })
      .eq('id', id)

    if (!error) {
      fetchExperiences()
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Work Experience</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your work history
          </p>
        </div>
        <Link
          href="/admin/work-experience/new"
          className="px-4 py-2 rounded-lg font-medium"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
          }}
        >
          + New Entry
        </Link>
      </div>

      {/* Experiences List */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div
            className="p-8 text-center rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
              borderWidth: '1px',
            }}
          >
            <p style={{ color: 'var(--text-secondary)' }}>No work experience entries found</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{exp.company_name}</h3>
                    {exp.is_current && (
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--bg-primary)',
                        }}
                      >
                        Current
                      </span>
                    )}
                    <span
                      className="text-xs px-2 py-1 rounded"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      Order: {exp.display_order}
                    </span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {exp.position}
                  </p>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-tertiary)' }}>
                    📍 {exp.location}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    🔗 {exp.company_url}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Link
                    href={`/admin/work-experience/${exp.id}`}
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleToggleCurrent(exp.id, exp.is_current)}
                    className="px-3 py-1 rounded text-sm"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {exp.is_current ? 'Not Current' : 'Set Current'}
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
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

      <div
        className="mt-6 p-4 rounded-lg border"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          💡 Tip: Use the display_order field to control the order of entries. Lower numbers appear first.
        </p>
      </div>
    </div>
  )
}
