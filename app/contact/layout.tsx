import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Connexus Medical Supplies',
  description: 'Get in touch with Connexus Medical Supplies. Request a free consultation, product quote, or ask our specialists any questions.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
