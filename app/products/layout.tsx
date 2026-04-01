import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products | Connexus Medical Supplies',
  description: 'Browse our FDA-certified medical equipment: wheelchairs, mobility aids, diabetic care supplies, and orthopedic braces.',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}
