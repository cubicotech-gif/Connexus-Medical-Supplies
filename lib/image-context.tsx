'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getAllImageUrls, type ImageSlot } from './storage'

type ImageMap = Record<string, string>

const ImageContext = createContext<ImageMap>({})

export function ImageProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageMap>({})

  useEffect(() => {
    getAllImageUrls().then((urls) => {
      setImages(urls)
    })
  }, [])

  return <ImageContext.Provider value={images}>{children}</ImageContext.Provider>
}

// Returns the uploaded image URL or empty string if none uploaded
export function useSiteImage(slot: ImageSlot): string {
  const images = useContext(ImageContext)
  return images[slot] || ''
}

export function useSiteImages(): ImageMap {
  return useContext(ImageContext)
}
