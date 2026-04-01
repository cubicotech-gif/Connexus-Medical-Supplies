'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { useSiteImage } from '@/lib/image-context'
import type { ImageSlot } from '@/lib/storage'

interface SiteImageProps {
  slot: ImageSlot
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholderText?: string
}

export function SiteImage({
  slot,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
  placeholderText,
}: SiteImageProps) {
  const src = useSiteImage(slot)
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className={`bg-gradient-to-br from-primary-50 to-navy-50 flex flex-col items-center justify-center ${fill ? 'absolute inset-0' : ''} ${className}`}>
        <ImageIcon className="h-10 w-10 text-primary/30 mb-2" />
        {placeholderText && (
          <span className="text-navy/40 text-xs font-medium">{placeholderText}</span>
        )}
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  )
}
