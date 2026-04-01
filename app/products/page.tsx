'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, CheckCircle, Phone } from 'lucide-react'
import { products, companyInfo } from '@/lib/data'
import { useSiteImage } from '@/lib/image-context'
import type { ImageSlot } from '@/lib/storage'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

function ProductCard({ product, index }: { product: { name: string; imageSlot: ImageSlot; description: string; features: string[] }; index: number }) {
  const image = useSiteImage(product.imageSlot)
  return (
    <motion.div {...fadeUp} transition={{ delay: index * 0.15 }}>
      <Card className="overflow-hidden hover:shadow-2xl transition-all h-full">
        <div className="relative h-64">
          <Image src={image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
          <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>
          <div className="space-y-2 mb-6">
            {product.features.map((feature, fi) => (
              <div key={fi} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <Link href="/contact">
            <Button className="w-full group">
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 diagonal-gradient">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-4 inline-block">Our Products</span>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Medical Equipment & Supplies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our complete catalog of FDA-certified medical equipment.
              Every product is rigorously tested for safety, durability, and performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      {products.map((category, catIndex) => (
        <section
          key={category.slug}
          id={category.slug}
          className={catIndex % 2 === 0 ? 'py-20 bg-white' : 'py-20 diagonal-gradient'}
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div {...fadeUp} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.category}</h2>
              <p className="text-lg text-gray-600">{category.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10">
              {category.items.map((product, i) => (
                <ProductCard key={product.name} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-sky-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-4xl font-bold mb-6">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-xl mb-8 text-sky-100">
              We carry hundreds of additional products. Contact us for personalized
              recommendations and pricing.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Get a Free Consultation
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                {companyInfo.phone}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
