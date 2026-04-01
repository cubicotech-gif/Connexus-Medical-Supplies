import { supabase } from './supabase'

const BUCKET = 'site-images'

// All image slots used across the site
export type ImageSlot =
  | 'logo'
  | 'favicon'
  | 'hero-main'
  | 'hero-about'
  | 'about-story'
  | 'why-us'
  | 'product-standard-wheelchair'
  | 'product-transport-wheelchair'
  | 'product-rollator-walker'
  | 'product-walking-cane'
  | 'product-glucose-monitor'
  | 'product-diabetic-kit'
  | 'product-knee-brace'
  | 'product-back-support'

export const IMAGE_SLOTS: { key: ImageSlot; label: string; section: string; description: string }[] = [
  // Branding
  { key: 'logo', label: 'Site Logo', section: 'Branding', description: 'Main logo displayed in navbar and footer (recommended: 200×60 PNG with transparency)' },
  { key: 'favicon', label: 'Favicon', section: 'Branding', description: 'Small browser tab icon (recommended: 32×32 or 64×64 PNG)' },
  // Hero & General
  { key: 'hero-main', label: 'Homepage Hero Image', section: 'Homepage', description: 'Large hero image on the homepage (recommended: 800×600)' },
  { key: 'why-us', label: 'Why Choose Us Image', section: 'Homepage', description: 'Image in the "Why Connexus" section (recommended: 800×600)' },
  // About
  { key: 'hero-about', label: 'About Page Hero', section: 'About Page', description: 'Hero background for the about page header' },
  { key: 'about-story', label: 'Our Story Image', section: 'About Page', description: 'Image next to the "Who We Are" story section (recommended: 800×600)' },
  // Products
  { key: 'product-standard-wheelchair', label: 'Standard Wheelchair', section: 'Products', description: 'Product image for Standard Wheelchair' },
  { key: 'product-transport-wheelchair', label: 'Transport Wheelchair', section: 'Products', description: 'Product image for Transport Wheelchair' },
  { key: 'product-rollator-walker', label: 'Rollator Walker', section: 'Products', description: 'Product image for Rollator Walker' },
  { key: 'product-walking-cane', label: 'Walking Cane', section: 'Products', description: 'Product image for Walking Cane' },
  { key: 'product-glucose-monitor', label: 'Blood Glucose Monitor', section: 'Products', description: 'Product image for Blood Glucose Monitor' },
  { key: 'product-diabetic-kit', label: 'Diabetic Supply Kit', section: 'Products', description: 'Product image for Diabetic Supply Kit' },
  { key: 'product-knee-brace', label: 'Knee Brace', section: 'Products', description: 'Product image for Knee Brace' },
  { key: 'product-back-support', label: 'Back Support Belt', section: 'Products', description: 'Product image for Back Support Belt' },
]

// Upload an image to a specific slot
export async function uploadImage(slot: ImageSlot, file: File): Promise<string | null> {
  if (!supabase) return null

  const ext = file.name.split('.').pop()
  const path = `${slot}.${ext}`

  // Remove old file first (ignore error if doesn't exist)
  await supabase.storage.from(BUCKET).remove([path])

  // Also remove other extensions for this slot
  const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico']
  const oldPaths = exts.map(e => `${slot}.${e}`).filter(p => p !== path)
  await supabase.storage.from(BUCKET).remove(oldPaths)

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type })

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

// Get the public URL for an image slot
export async function getImageUrl(slot: ImageSlot): Promise<string | null> {
  if (!supabase) return null

  // List files in the bucket to find the one matching this slot
  const { data: files } = await supabase.storage.from(BUCKET).list('', {
    search: slot,
  })

  if (!files || files.length === 0) return null

  const match = files.find(f => f.name.startsWith(slot + '.'))
  if (!match) return null

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(match.name)
  return data.publicUrl
}

// Get all image URLs at once
export async function getAllImageUrls(): Promise<Record<string, string>> {
  if (!supabase) return {}

  const { data: files } = await supabase.storage.from(BUCKET).list()
  if (!files) return {}

  const urls: Record<string, string> = {}
  for (const file of files) {
    const slot = file.name.replace(/\.[^.]+$/, '') // remove extension
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(file.name)
    urls[slot] = data.publicUrl
  }

  return urls
}

// Delete an image from a slot
export async function deleteImage(slot: ImageSlot): Promise<boolean> {
  if (!supabase) return false

  const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico']
  const paths = exts.map(e => `${slot}.${e}`)
  const { error } = await supabase.storage.from(BUCKET).remove(paths)
  return !error
}
