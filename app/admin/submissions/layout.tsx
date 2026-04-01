import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submissions | Admin | Connexus Medical Supplies',
  robots: 'noindex, nofollow',
}

export default function SubmissionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
