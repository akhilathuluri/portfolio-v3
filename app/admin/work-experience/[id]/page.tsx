'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { SUPABASE_CONFIG } from '@/lib/supabase/config'
import type { WorkExperience } from '@/lib/types/database'

export default function EditWorkExperiencePage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [experience, setExperience] = useState<WorkExperience | null>(null)

  useEffect(() => {
    fetchExperience()
  }, [params.id])

  const fetchExperience = async () => {
    const { data, error } = await supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .select('*')
      .eq('id', params.id)
      .single()

    if (!error && data) {
      setExperience(data)
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!experience) return

    setSaving(true)

    // If marking as current, unset others
    if (experience.is_current) {
      await supabase
        .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
        .update({ is_current: false })
        .neq('id', experience.id)
    }

    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .update({
        company_name: experience.company_name,
        company_url: experience.company_url,
        position: experience.position,
        location: experience.location,
        start_date: experience.start_date,
        end_date: experience.end_date,
        is_current: experience.is_current,
        display_order: experience.display_order,
      })
      .eq('id', experience.id)

    if (!error) {
      router.push('/admin/work-experience')
    } else {
      alert('Error updating entry: ' + error.message)
    }
    setSaving(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!experience) {
    return <div>Work experience entry not found</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Edit Work Experience</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Update work experience details
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
          {/* Company Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Company Name *</label>
            <input
              type="text"
              required
              value={experience.company_name}
              onChange={(e) => setExperience({ ...experience, company_name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Company URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Company URL *</label>
            <input
              type="text"
              required
              value={experience.company_url}
              onChange={(e) => setExperience({ ...experience, company_url: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Position */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Position *</label>
            <input
              type="text"
              required
              value={experience.position}
              onChange={(e) => setExperience({ ...experience, position: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              required
              value={experience.location}
              onChange={(e) => setExperience({ ...experience, location: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Start Date *</label>
            <input
              type="date"
              required
              value={experience.start_date.split('T')[0]}
              onChange={(e) => setExperience({ ...experience, start_date: new Date(e.target.value).toISOString() })}
              className="px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Current Position Checkbox */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={experience.is_current}
                onChange={(e) => setExperience({ 
                  ...experience, 
                  is_current: e.target.checked,
                  end_date: e.target.checked ? null : experience.end_date
                })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">This is my current position</span>
            </label>
          </div>

          {/* End Date */}
          {!experience.is_current && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                value={experience.end_date ? experience.end_date.split('T')[0] : ''}
                onChange={(e) => setExperience({ ...experience, end_date: e.target.value ? new Date(e.target.value).toISOString() : null })}
                className="px-4 py-2 rounded-lg border"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          )}

          {/* Display Order */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Display Order *</label>
            <input
              type="number"
              required
              min="1"
              value={experience.display_order}
              onChange={(e) => setExperience({ ...experience, display_order: parseInt(e.target.value) })}
              className="w-32 px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
              Lower numbers appear first
            </p>
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
