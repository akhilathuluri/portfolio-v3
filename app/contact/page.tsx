'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again later.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Have a question or want to work together? Drop me a message below.
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
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              placeholder="Your name"
              disabled={status === 'loading'}
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              placeholder="your.email@example.com"
              disabled={status === 'loading'}
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              placeholder="Your message..."
              disabled={status === 'loading'}
            />
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div
              className="mb-4 p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--bg-primary)',
              }}
            >
              <p className="font-medium">Message sent successfully! 🎉</p>
              <p className="text-sm mt-1">Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          )}

          {status === 'error' && (
            <div
              className="mb-4 p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
              }}
            >
              <p className="font-medium">❌ {errorMessage}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-2 rounded-lg font-medium disabled:opacity-50 transition-all"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
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

      {/* Additional Contact Info */}
      <div
        className="mt-8 p-6 rounded-lg border"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Me</h2>
        <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>
            📧 Email:{' '}
            <a
              href="mailto:8309889800a@gmail.com"
              className="underline underline-offset-4"
              style={{ textDecorationColor: 'var(--border-hover)' }}
            >
              8309889800a@gmail.com
            </a>
          </p>
          <p>
            📄 Resume:{' '}
            <a
              href="https://qozgofaixbrkkguxvxld.supabase.co/storage/v1/object/public/files/resume/Athuluri_Akhil_Resume_L%20(2).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
              style={{ textDecorationColor: 'var(--border-hover)' }}
            >
              View Resume
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
