import './global.css'
import type { Metadata } from 'next'
import Footer from './components/footer'
import ThemeSwitcher from './components/theme-switcher'
import { baseUrl } from './sitemap'
import { Space_Grotesk } from 'next/font/google'

// Configure Space Grotesk
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  fallback: [],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Athuluri Akhil | AI Engineer',
    template: '%s | Athuluri Akhil',
  },
  description: 'AI & Full-Stack Developer building real-world, scalable systems with a strong focus on security, data intelligence, and research-driven solutions.',
  
  // 1. Keywords: Derived from your "Previous" and "Builds" components
  keywords: [
    'Athuluri Akhil',
    'AI Engineer',
    'Full Stack Developer',
    'Product Engineer',
    'Bangalore',
    'Nepal',
    'TwoSpoon.ai',
    'Composio.dev',
    'LeapX.ai',
    'Next.js',
    'Python',
    'Django',
    'LLM',
    'Generative AI'
  ],

  // 2. Authors & Creator info
  authors: [{ name: 'Athuluri Akhil', url: baseUrl }],
  creator: 'Athuluri Akhil',
  
  // 3. Open Graph (Facebook, LinkedIn, iMessage)
  openGraph: {
    title: 'Athuluri Akhil | AI Engineer',
    description: 'AI & Full-Stack Developer building real-world, scalable systems with a strong focus on security, data intelligence, and research-driven solutions.',
    url: baseUrl,
    siteName: 'Athuluri Akhil Portfolio',
    locale: 'en_US',
    type: 'website',
    // This will automatically grab the file from app/opengraph-image.tsx
  },

  // 4. Twitter Card (X)
  twitter: {
    card: 'summary_large_image',
    title: 'Athuluri Akhil | AI Engineer',
    description: 'AI & Full-Stack Developer building real-world, scalable systems with a strong focus on security, data intelligence, and research-driven solutions.',
    creator: '@athuluri_akhil',
  },

  // 5. Robots control (ensure you are indexed)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 6. Verification (Optional: Add if you use Google Search Console)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={spaceGrotesk.variable}
    >
      <body className={`${spaceGrotesk.className} antialiased max-w-xl mx-4 mt-8 lg:mx-auto text-sm tracking-tight lowercase`}>
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
          <Footer />
          <ThemeSwitcher />
        </main>
      </body>
    </html>
  )
}
