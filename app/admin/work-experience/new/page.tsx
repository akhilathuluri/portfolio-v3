'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { SUPABASE_CONFIG } from '@/lib/supabase/config'

export default function NewWorkExperiencePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    company_name: '',
    company_url: '',
    position: '',
    location: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    is_current: false,
    display_order: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // If marking as current, unset others
    if (formData.is_current) {
      await supabase
        .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
        .update({ is_current: false })
        .neq('id', '00000000-0000-0000-0000-000000000000')
    }

    const { error } = await supabase
      .from(SUPABASE_CONFIG.tables.WORK_EXPERIENCE)
      .insert({
        ...formData,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
      })

    if (!error) {
      router.push('/admin/work-experience')
    } else {
      alert('Error creating entry: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">New Work Experience</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Add a new work experience entry
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
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
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
              value={formData.company_url}
              onChange={(e) => setFormData({ ...formData, company_url: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              placeholder="https://company.com"
            />
          </div>

          {/* Position */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Position *</label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              placeholder="Software Engineer, Product Manager, etc."
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              placeholder="City, Country or Remote"
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Start Date *</label>
            <input
              type="date"
              required
              value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
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
                checked={formData.is_current}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  is_current: e.target.checked,
                  end_date: e.target.checked ? '' : formData.end_date
                })}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">This is my current position</span>
            </label>
          </div>

          {/* End Date */}
          {!formData.is_current && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
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
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
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
            disabled={loading}
            className="px-6 py-2 rounded-lg font-medium disabled:opacity-50"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            {loading ? 'Creating...' : 'Create Entry'}
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
