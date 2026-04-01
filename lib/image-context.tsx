'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getAllImageUrls, type ImageSlot } from './storage'

type ImageMap = Record<string, string>

const ImageContext = createContext<ImageMap>({})

// Default fallback images (Unsplash placeholders)
const DEFAULTS: Partial<Record<ImageSlot, string>> = {
  'hero-main': 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
  'why-us': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80',
  'about-story': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
  'product-standard-wheelchair': 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&q=80',
  'product-transport-wheelchair': 'https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?w=600&q=80',
  'product-rollator-walker': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
  'product-walking-cane': 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80',
  'product-glucose-monitor': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
  'product-diabetic-kit': 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600&q=80',
  'product-knee-brace': 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&q=80',
  'product-back-support': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
}

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageMap>({})

  useEffect(() => {
    getAllImageUrls().then((urls) => {
      setImages(urls)
    })
  }, [])

  return <ImageContext.Provider value={images}>{children}</ImageContext.Provider>
}

export function useSiteImage(slot: ImageSlot): string {
  const images = useContext(ImageContext)
  return images[slot] || DEFAULTS[slot] || ''
}

export function useSiteImages(): ImageMap {
  return useContext(ImageContext)
}

export { DEFAULTS }
