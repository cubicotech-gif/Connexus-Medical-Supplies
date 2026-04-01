import Link from 'next/link'
import { Heart, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { companyInfo } from '@/lib/data'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white text-xl">Connexus</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Premium medical equipment and supplies, delivered with expert care
              and personalized guidance for every patient.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <div><Link href="/" className="hover:text-primary transition-colors">Home</Link></div>
              <div><Link href="/products" className="hover:text-primary transition-colors">Our Products</Link></div>
              <div><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></div>
              <div><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></div>
              <div><Link href="/contact" className="hover:text-primary transition-colors">Get a Quote</Link></div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <div className="space-y-2 text-sm">
              <div><Link href="/products" className="hover:text-primary transition-colors">Wheelchairs</Link></div>
              <div><Link href="/products" className="hover:text-primary transition-colors">Mobility Aids</Link></div>
              <div><Link href="/products" className="hover:text-primary transition-colors">Diabetic Care</Link></div>
              <div><Link href="/products" className="hover:text-primary transition-colors">Orthopedic Braces</Link></div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
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

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Connexus Medical Supplies. All rights reserved.</p>
          <p className="mt-2 text-gray-500">
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
