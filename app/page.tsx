'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SiteImage } from '@/components/ui/site-image'
import {
  Phone, Heart, Shield, Truck, Users,
  Award, Clock, ArrowRight, Star, FileText, Wrench,
  CheckCircle,
} from 'lucide-react'
import { products, services, companyInfo } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  Users, Shield, FileText, Wrench, Heart, Truck,
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

function ProductCategoryCard({ cat, index }: { cat: typeof products[number]; index: number }) {
  return (
    <motion.div {...fadeUp} transition={{ delay: index * 0.1 }}>
      <Link href="/products">
        <Card className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer h-full">
          <div className="relative h-48">
            <SiteImage slot={cat.items[0].imageSlot} alt={cat.category} fill className="object-cover group-hover:scale-105 transition-transform duration-500" placeholderText={cat.category} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent z-10" />
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <h3 className="text-white font-bold text-lg">{cat.category}</h3>
              <p className="text-white/80 text-sm">{cat.items.length} products</p>
            </div>
          </div>
          <div className="p-5">
            <p className="text-gray-600 text-sm leading-relaxed">{cat.description}</p>
            <div className="flex items-center gap-1 mt-3 text-primary font-medium text-sm">
              View Products <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-52 pb-20 diagonal-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <span className="badge-primary">
                Trusted Medical Equipment Supplier
              </span>

              <h1 className="text-5xl lg:text-6xl font-bold text-navy leading-tight">
                Your Trusted Partner in{' '}
                <span className="text-primary">Quality Healthcare</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                We are a dedicated team of medical equipment specialists with over 15 years
                of experience providing FDA-certified products. Our mission is to help patients,
                families, and healthcare facilities find comfort and independence.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="group">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline">
                    View Products
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-50 to-primary border-2 border-white" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">500+ Happy Customers</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[520px] rounded-3xl overflow-hidden shadow-2xl">
                <SiteImage slot="hero-main" alt="Medical professional with equipment" fill className="object-cover" priority placeholderText="Upload Hero Image" />
                <div className="absolute bottom-8 left-8 right-8 glass rounded-2xl p-6 z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                      <Award className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-navy">15+ Years</div>
                      <div className="text-gray-600 font-medium">Of Trusted Service</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Clock, number: '15+', label: 'Years Experience', color: 'bg-primary-50 text-primary' },
              { icon: Heart, number: '500+', label: 'Happy Customers', color: 'bg-rose-50 text-rose-500' },
              { icon: Award, number: '1,000+', label: 'Products Delivered', color: 'bg-amber-50 text-amber-500' },
              { icon: Shield, number: '100%', label: 'FDA Certified', color: 'bg-emerald-50 text-emerald-500' },
            ].map((stat, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="text-center p-8 hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-navy mb-1">{stat.number}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 diagonal-gradient" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div {...fadeUp}>
              <span className="badge-primary mb-4 inline-block">What We Offer</span>
              <h2 className="text-4xl font-bold text-navy mb-4">
                Comprehensive Healthcare Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From expert consultation to reliable delivery, we provide end-to-end support
                for all your medical equipment needs.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Shield
              return (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                  <Card className="p-8 hover:shadow-lg transition-all group h-full">
                    <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-white" id="products">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div {...fadeUp}>
              <span className="badge-primary mb-4 inline-block">Our Products</span>
              <h2 className="text-4xl font-bold text-navy mb-4">
                Quality Medical Supplies You Can Trust
              </h2>
              <p className="text-xl text-gray-600">
                FDA-certified equipment across four essential categories
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((cat, i) => (
              <ProductCategoryCard key={cat.slug} cat={cat} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" className="group">
                Browse All Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 diagonal-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <span className="badge-primary mb-4 inline-block">Why Connexus</span>
              <h2 className="text-4xl font-bold text-navy mb-6">
                Making Premium Medical Equipment Accessible to Everyone
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Since {companyInfo.founded}, we have been committed to providing the highest quality
                medical supplies with personalized service. We believe everyone deserves
                access to reliable healthcare equipment.
              </p>
              <div className="space-y-4">
                {[
                  'FDA-certified and rigorously tested products',
                  'Personalized consultation and custom fitting',
                  'Insurance and billing assistance',
                  'Reliable door-to-door delivery',
                  '24/7 emergency availability',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link href="/about">
                  <Button size="lg" variant="outline" className="group">
                    Learn More About Us
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="relative h-[480px] rounded-3xl overflow-hidden shadow-2xl">
                <SiteImage slot="why-us" alt="Medical supplies and equipment" fill className="object-cover" placeholderText="Upload Image" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp}>
            <Card className="p-12 lg:p-16 text-center border-0 shadow-2xl diagonal-gradient-blue text-white rounded-3xl">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
                Ready to Improve Your Quality of Life?
              </h2>
              <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
                Schedule a free consultation with our medical equipment specialists.
                We&apos;ll help you find the perfect solution for your needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="group">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  {companyInfo.phone}
                </Button>
              </div>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { num: '15+', label: 'Years Experience' },
                  { num: '500+', label: 'Happy Customers' },
                  { num: '24/7', label: 'Support Available' },
                  { num: '100%', label: 'Quality Guaranteed' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-4xl font-bold text-white">{s.num}</div>
                    <div className="text-primary-100 text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
