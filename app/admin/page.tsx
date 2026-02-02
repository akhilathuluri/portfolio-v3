'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { blogPostsService, projectsService, workExperienceService } from '@/lib/services'

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    posts: 0,
    projects: 0,
    experiences: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [posts, projects, experiences] = await Promise.all([
          blogPostsService.getAll(),
          projectsService.getAll(),
          workExperienceService.getAll(),
        ])
        
        setCounts({
          posts: posts.length,
          projects: projects.length,
          experiences: experiences.length,
        })
      } catch (error) {
        console.error('Error fetching counts:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCounts()
  }, [])

  const sections = [
    {
      title: 'Writings',
      description: 'Manage blog posts and articles',
      href: '/admin/writings',
      icon: '📝',
      count: loading ? '...' : `${counts.posts} post${counts.posts !== 1 ? 's' : ''}`,
    },
    {
      title: 'Projects',
      description: 'Manage portfolio projects',
      href: '/admin/projects',
      icon: '🚀',
      count: loading ? '...' : `${counts.projects} project${counts.projects !== 1 ? 's' : ''}`,
    },
    {
      title: 'Work Experience',
      description: 'Manage previous work history',
      href: '/admin/work-experience',
      icon: '💼',
      count: loading ? '...' : `${counts.experiences} ${counts.experiences !== 1 ? 'entries' : 'entry'}`,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Welcome to your admin panel. Manage your portfolio content below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block p-6 rounded-lg border transition-all hover:scale-105"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{section.icon}</span>
              <span 
                className="text-xs px-2 py-1 rounded"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}
              >
                {section.count}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {section.description}
            </p>
          </Link>
        ))}
      </div>

      <div 
        className="mt-8 p-6 rounded-lg border"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Quick Tips</h2>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <li>• Use Markdown formatting in content fields for rich text</li>
          <li>• Slugs must be unique and URL-friendly (lowercase, hyphens only)</li>
          <li>• Images can be URLs or paths to files in the /public folder</li>
          <li>• Unpublished content won't appear on the public site</li>
          <li>• Changes are saved immediately to the database</li>
        </ul>
      </div>
    </div>
  )
}
