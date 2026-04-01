'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Phone, Mail, MapPin, Heart, Shield, Truck, Users,
  Award, Clock, ArrowRight, Star, Menu, X
} from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900">Connexus Medical</div>
                <div className="text-xs text-gray-600">Quality Healthcare Solutions</div>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary">Home</Link>
              <Link href="#products" className="text-sm font-medium text-gray-700 hover:text-primary">Products</Link>
              <Link href="#about" className="text-sm font-medium text-gray-700 hover:text-primary">About</Link>
              <Link href="#contact" className="text-sm font-medium text-gray-700 hover:text-primary">Contact</Link>
              <Button size="sm">Get Quote</Button>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-3">
              <Link href="/" className="block text-sm font-medium text-gray-700">Home</Link>
              <Link href="#products" className="block text-sm font-medium text-gray-700">Products</Link>
              <Link href="#about" className="block text-sm font-medium text-gray-700">About</Link>
              <Link href="#contact" className="block text-sm font-medium text-gray-700">Contact</Link>
              <Button size="sm" className="w-full">Get Quote</Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 diagonal-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <span className="badge-primary">
                Trusted Medical Equipment Supplier
              </span>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Providing Quality & Reliable Health Solutions
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Connexus Medical offers comprehensive medical equipment and healthcare solutions for clinical excellence and better patient care.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="group">
                  Discover More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 border-2 border-white"></div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">4.9/5 - Happy Customers</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                  alt="Medical professional"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Stats Badge */}
                <div className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-6">
                  <div className="text-5xl font-bold text-primary">125+</div>
                  <div className="text-gray-700 font-medium">Happy Clients</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, number: '15+', label: 'Team Experience', color: 'bg-blue-100 text-blue-600' },
              { icon: Heart, number: '9,662+', label: 'Happy Clients', color: 'bg-rose-100 text-rose-600' },
              { icon: Award, number: '6,254+', label: 'Certifications', color: 'bg-amber-100 text-amber-600' },
              { icon: Shield, number: '2,560+', label: 'Satisfied Users', color: 'bg-emerald-100 text-emerald-600' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Priority Section */}
      <section className="py-20 diagonal-gradient" id="about">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Our Only Priority Is To Keep You Healthy
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive medical equipment and healthcare solutions with a focus on quality, reliability, and exceptional customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Quality Products', desc: 'FDA-approved medical equipment and supplies' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Quick and reliable shipping nationwide' },
              { icon: Users, title: 'Expert Support', desc: '24/7 customer assistance and guidance' },
              { icon: Award, title: 'Certified', desc: 'Industry-standard certifications and compliance' },
              { icon: Heart, title: 'Patient Care', desc: 'Your health and wellbeing is our priority' },
              { icon: Clock, title: 'Always Available', desc: 'Round-the-clock service and support' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-8 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white" id="products">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Featured Products
            </motion.h2>
            <p className="text-xl text-gray-600">Quality medical supplies at affordable prices</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Digital Thermometers', discount: '$15', img: 'photo-1584308666744-24d5c474f2ae', badge: 'Best Price' },
              { name: 'N95 Medical Mask', discount: '$5', img: 'photo-1584036561566-baf8f5f1b144', badge: 'New Arrival' },
              { name: 'Medical Equipment', discount: '$15', img: 'photo-1631217868264-e5b90bb7e133', badge: 'Popular' },
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="product-card"
              >
                <div className="relative h-64">
                  <Image
                    src={`https://images.unsplash.com/${product.img}?w=600&q=80`}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="badge-discount absolute top-4 left-4">
                    {product.badge}
                  </span>
                  <span className="badge-primary absolute top-4 right-4">
                    Save up to {product.discount}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4">Premium quality medical supplies with fast shipping and expert support.</p>
                  <Button className="w-full group">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 diagonal-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Experienced professionals dedicated to your health</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {['Professional 1', 'Professional 2', 'Professional 3', 'Professional 4'].map((name, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gradient-to-br from-primary-200 to-primary-400"></div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-lg text-gray-900">{name}</h3>
                  <p className="text-gray-600 text-sm">Medical Specialist</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Collaborated With 40+ Hospitals in the World
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <Card key={i} className="p-6 flex items-center justify-center h-24 hover:shadow-md transition-shadow">
                <div className="text-gray-400 font-semibold">Hospital {i}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 diagonal-gradient-blue text-white" id="contact">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Improve Your Healthcare?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Contact us today for expert consultation and quality medical supplies
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2" />
                +1 (512) 872-1111
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold">15+</div>
                <div className="text-primary-100">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold">500+</div>
                <div className="text-primary-100">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-primary-100">Support</div>
              </div>
              <div>
                <div className="text-4xl font-bold">100%</div>
                <div className="text-primary-100">Quality</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-white text-xl">Connexus</span>
              </div>
              <p className="text-sm mb-6">Quality healthcare solutions for better living.</p>
              <div className="flex gap-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                    <Heart className="h-5 w-5" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <div><Link href="/" className="hover:text-primary transition-colors">Home</Link></div>
                <div><Link href="#products" className="hover:text-primary transition-colors">Products</Link></div>
                <div><Link href="#about" className="hover:text-primary transition-colors">About</Link></div>
                <div><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Products</h3>
              <div className="space-y-2 text-sm">
                <div>Wheelchairs</div>
                <div>Mobility Aids</div>
                <div>Diabetic Care</div>
                <div>Orthopedic Braces</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>30 N Gould St Suite R<br/>Sheridan, WY 82801</span>
                </div>
                <div className="flex gap-2">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>+1 (512) 872-1111</span>
                </div>
                <div className="flex gap-2">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>info@connexusmed.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 Connexus Medical Supplies | All Rights Reserved</p>
            <p className="mt-2 text-gray-500">Powered by Cubico Technologies</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
