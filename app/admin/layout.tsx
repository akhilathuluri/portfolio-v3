'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AuthProvider, useAuth } from '@/lib/auth'
import Link from 'next/link'

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut, isAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: 'var(--accent-primary)' }}
          ></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // Show login page if not authenticated
  if (!user && pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show unauthorized if not admin
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            You don't have permission to access this area.
          </p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  // Show admin panel if authenticated and authorized
  if (user && isAdmin) {
    return (
      <div className="min-h-screen">
        {/* Admin Header */}
        <header 
          className="border-b sticky top-0 z-10"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-4">
                  <Link
                    href="/admin"
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname === '/admin' ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: pathname === '/admin' ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/writings"
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname?.startsWith('/admin/writings') ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: pathname?.startsWith('/admin/writings') ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                  >
                    Writings
                  </Link>
                  <Link
                    href="/admin/projects"
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname?.startsWith('/admin/projects') ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: pathname?.startsWith('/admin/projects') ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                  >
                    Projects
                  </Link>
                  <Link
                    href="/admin/work-experience"
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname?.startsWith('/admin/work-experience') ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: pathname?.startsWith('/admin/work-experience') ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                  >
                    Work Experience
                  </Link>
                </nav>
              </div>
              
              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {user.email}
                </span>
                <Link
                  href="/"
                  target="_blank"
                  className="text-sm px-3 py-2 rounded-lg hover:underline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  View Site
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Sign Out
                </button>
              </div>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                <nav className="flex flex-col space-y-2">
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname === '/admin' ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: pathname === '/admin' ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/writings"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname?.startsWith('/admin/writings') ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: pathname?.startsWith('/admin/writings') ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                  >
                    Writings
                  </Link>
                  <Link
                    href="/admin/projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname?.startsWith('/admin/projects') ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: pathname?.startsWith('/admin/projects') ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                  >
                    Projects
                  </Link>
                  <Link
                    href="/admin/work-experience"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      pathname?.startsWith('/admin/work-experience') ? 'font-semibold' : ''
                    }`}
                    style={{
                      backgroundColor: pathname?.startsWith('/admin/work-experience') ? 'var(--bg-tertiary)' : 'transparent',
                    }}
                  >
                    Work Experience
                  </Link>
                </nav>
                
                <div className="mt-4 pt-4 border-t flex flex-col space-y-2" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-sm px-3" style={{ color: 'var(--text-secondary)' }}>
                    {user.email}
                  </span>
                  <Link
                    href="/"
                    target="_blank"
                    className="text-sm px-3 py-2 rounded-lg hover:underline"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    View Site
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-sm px-3 py-2 rounded-lg text-left"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    )
  }

  return null
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}
