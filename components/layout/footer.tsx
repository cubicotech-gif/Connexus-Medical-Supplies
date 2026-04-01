'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { companyInfo } from '@/lib/data'
import { useSiteImage } from '@/lib/image-context'

export function Footer() {
  const logo = useSiteImage('logo')
  const [logoError, setLogoError] = useState(false)
  const showLogo = logo && !logoError

  return (
    <footer className="bg-navy text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              {showLogo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={logo}
                  alt="Connexus Medical Supplies"
                  className="h-10 w-auto object-contain max-w-[200px] brightness-0 invert"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="font-bold text-white text-xl">Connexus Medical</span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-navy-100">
              Premium medical equipment and supplies, delivered with expert care
              and personalized guidance for every patient.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <div><Link href="/" className="text-navy-100 hover:text-primary transition-colors">Home</Link></div>
              <div><Link href="/products" className="text-navy-100 hover:text-primary transition-colors">Our Products</Link></div>
              <div><Link href="/about" className="text-navy-100 hover:text-primary transition-colors">About Us</Link></div>
              <div><Link href="/contact" className="text-navy-100 hover:text-primary transition-colors">Contact Us</Link></div>
              <div><Link href="/contact" className="text-navy-100 hover:text-primary transition-colors">Get a Quote</Link></div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <div className="space-y-2 text-sm">
              <div><Link href="/products#wheelchairs" className="text-navy-100 hover:text-primary transition-colors">Wheelchairs</Link></div>
              <div><Link href="/products#mobility-aids" className="text-navy-100 hover:text-primary transition-colors">Mobility Aids</Link></div>
              <div><Link href="/products#diabetic-care" className="text-navy-100 hover:text-primary transition-colors">Diabetic Care</Link></div>
              <div><Link href="/products#orthopedic-braces" className="text-navy-100 hover:text-primary transition-colors">Orthopedic Braces</Link></div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm text-navy-100">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>{companyInfo.address.street}<br />{companyInfo.address.city}, {companyInfo.address.state} {companyInfo.address.zip}</span>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>{companyInfo.email}</span>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <div>Mon–Fri: 9AM – 6PM</div>
                  <div>Sat: 10AM – 4PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-400 pt-8 text-center text-sm text-navy-200">
          <p>&copy; {new Date().getFullYear()} Connexus Medical Supplies. All rights reserved.</p>
          <p className="mt-2 text-navy-300">
            Powered by{' '}
            <a
              href="https://cubicotechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Cubico Technologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
