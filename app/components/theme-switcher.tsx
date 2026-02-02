'use client'

import { useEffect, useState } from 'react'

const themes = [
  { id: 'light', name: 'Light', icon: '☀️' },
  { id: 'dark', name: 'Dark', icon: '🌙' },
  { id: 'cyberpunk', name: 'Cyberpunk', icon: '🌆' },
  { id: 'matrix', name: 'Matrix', icon: '💻' },
  { id: 'synthwave', name: 'Synthwave', icon: '🌃' },
  { id: 'nord', name: 'Nord', icon: '❄️' },
  { id: 'dracula', name: 'Dracula', icon: '🧛' },
  { id: 'ocean', name: 'Ocean', icon: '🌊' },
  { id: 'monokai', name: 'Monokai', icon: '🎨' },
]

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Get theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light'
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    document.documentElement.setAttribute('data-theme', themeId)
    localStorage.setItem('theme', themeId)
    setIsOpen(false)
  }

  const currentThemeData = themes.find(t => t.id === currentTheme) || themes[0]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Theme Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg p-2 min-w-[160px]"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-color)',
          }}
        >
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-left"
              style={{
                backgroundColor: currentTheme === theme.id ? 'var(--bg-tertiary)' : 'transparent',
                color: 'var(--text-primary)',
              }}
            >
              <span className="text-lg">{theme.icon}</span>
              <span className="text-sm font-medium">{theme.name}</span>
              {currentTheme === theme.id && (
                <span className="ml-auto text-xs" style={{ color: 'var(--accent-primary)' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full shadow-lg font-medium text-sm transition-all hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
        }}
        aria-label="Change theme"
      >
        <span className="text-xl">{currentThemeData.icon}</span>
        <span>{currentThemeData.name}</span>
      </button>
    </div>
  )
}
