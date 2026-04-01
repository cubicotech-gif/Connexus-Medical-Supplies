import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Connexus Medical Supplies',
  description: 'Learn about Connexus Medical Supplies — our mission, values, and 15+ years of experience providing quality healthcare solutions.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
