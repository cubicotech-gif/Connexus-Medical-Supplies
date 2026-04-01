'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
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
  const [logoError, setLogoError] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const logo = useSiteImage('logo')
  const showLogo = logo && !logoError

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY

      // Show/hide on scroll direction
      if (y > lastScrollY && y > 200) {
        setHidden(true) // scrolling down past 200px — hide
      } else {
        setHidden(false) // scrolling up — show
      }

      setScrolled(y > 50)
      setLastScrollY(y)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Logo Bar — glassmorphism */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-sm'
            : 'bg-white/90 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-center">
          <Link href="/" className={`block transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            {showLogo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={logo}
                alt="Connexus Medical Supplies"
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-14' : 'h-20 md:h-24'}`}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="text-center">
                <div className={`font-bold text-navy tracking-tight transition-all duration-300 ${scrolled ? 'text-xl' : 'text-2xl md:text-3xl'}`}>
                  Connexus Medical
                </div>
                <div className="text-xs md:text-sm text-primary font-medium">
                  Quality Healthcare Solutions
                </div>
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Pill Navigation — positioned below logo with proper spacing */}
      <div className="flex justify-center px-4 py-2">
        <nav
          className={`rounded-full shadow-lg px-2 py-1.5 transition-all duration-300 ${
            scrolled
              ? 'bg-navy/80 backdrop-blur-xl'
              : 'bg-navy/95 backdrop-blur-md'
          }`}
        >
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'bg-primary text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="ml-1">
              <Button size="sm" className="rounded-full px-5">Get a Quote</Button>
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-white text-sm font-medium pl-4">Menu</span>
            <button
              onClick={() => setOpen(!open)}
              className="p-2.5 text-white rounded-full hover:bg-white/10 transition"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mx-4 mt-1">
          <div className="bg-navy/90 backdrop-blur-xl rounded-2xl shadow-lg p-4 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  pathname === link.href
                    ? 'bg-primary text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full mt-2 rounded-xl">Get a Quote</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
