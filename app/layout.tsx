import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'Connexus Medical Supplies | Quality Healthcare Solutions',
  description: 'Trusted medical equipment supplier in Sheridan, Wyoming. Quality medical equipment and healthcare solutions for clinical excellence and better patient care.',
  keywords: ['medical supplies', 'healthcare', 'medical equipment', 'Sheridan Wyoming', 'Connexus Medical'],
  openGraph: {
    title: 'Connexus Medical Supplies | Quality Healthcare Solutions',
    description: 'Trusted medical equipment supplier in Sheridan, Wyoming',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
