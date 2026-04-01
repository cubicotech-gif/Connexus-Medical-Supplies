'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useSiteImage } from '@/lib/image-context'

const links = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const logo = useSiteImage('logo')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            {logo ? (
              <Image src={logo} alt="Connexus Medical Supplies" width={180} height={48} className="h-10 w-auto object-contain" />
            ) : (
              <div>
                <div className="font-bold text-lg text-navy">Connexus Medical</div>
                <div className="text-xs text-gray-500">Quality Healthcare Solutions</div>
              </div>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-primary'
                    : 'text-navy hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact">
              <Button size="sm">Get a Quote</Button>
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-navy">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block text-sm font-medium py-2 ${
                  pathname === link.href ? 'text-primary' : 'text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full mt-2">Get a Quote</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
