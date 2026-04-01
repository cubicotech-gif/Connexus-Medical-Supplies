'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, Heart, Shield, Users, Truck, CheckCircle } from 'lucide-react'
import { companyInfo, milestones, values } from '@/lib/data'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const valueIcons: Record<string, React.ElementType> = {
  'Patient First': Heart,
  'Quality Assured': Shield,
  'Expert Team': Users,
  'Fast Delivery': Truck,
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 diagonal-gradient">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-4 inline-block">About Us</span>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Our Story & Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since {companyInfo.founded}, Connexus Medical Supplies has been dedicated to making
              premium medical equipment accessible to everyone who needs it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  Connexus Medical Supplies was founded in {companyInfo.founded} as a small medical
                  equipment store in Sheridan, Wyoming. What started as a local operation driven
                  by a passion for patient care has grown into a trusted supplier serving patients,
                  families, and healthcare facilities across the nation.
                </p>
                <p>
                  Our team of experienced medical equipment specialists provides personalized
                  consultation, expert fitting, and ongoing support — because we believe that
                  quality healthcare equipment should come with quality service.
                </p>
                <p>
                  Today, we deliver over 1,000 products annually to more than 500 customers,
                  and every single one receives the same personalized attention that has defined
                  Connexus from day one.
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <div className="relative h-[450px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                  alt="Healthcare professionals"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 diagonal-gradient">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <span className="badge-primary mb-4 inline-block">Our Mission</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              &ldquo;To make premium medical equipment accessible to everyone who needs it.&rdquo;
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are driven by the belief that every patient deserves access to quality,
              FDA-certified medical equipment — regardless of location, budget, or circumstance.
              Through expert guidance and personalized service, we help our customers find
              comfort, independence, and a better quality of life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div {...fadeUp}>
              <span className="badge-primary mb-4 inline-block">Our Values</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Guides Everything We Do
              </h2>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => {
              const Icon = valueIcons[value.title] || Shield
              return (
                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                  <Card className="p-8 text-center hover:shadow-xl transition-all h-full">
                    <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-5">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 diagonal-gradient">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div {...fadeUp}>
              <span className="badge-primary mb-4 inline-block">Our Journey</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Key Milestones
              </h2>
            </motion.div>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }}>
                <Card className="p-8 hover:shadow-xl transition-all">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{milestone.year}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-sky-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-bold mb-6">
              Experience the Connexus Difference
            </h2>
            <p className="text-xl mb-8 text-sky-100">
              Let our team of specialists help you find the right medical equipment
              for your needs. Schedule a free consultation today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="group">
                  Schedule a Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
