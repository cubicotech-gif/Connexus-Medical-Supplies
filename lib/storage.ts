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
export async function uploadImage(slot: ImageSlot, file: File): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) return { url: null, error: 'Supabase is not configured' }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'png'
  const path = `${slot}.${ext}`

  // Try to clean up old files first (don't fail if this errors)
  try {
    const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico', 'gif']
    const oldPaths = exts.map(e => `${slot}.${e}`)
    await supabase.storage.from(BUCKET).remove(oldPaths)
  } catch {
    // Ignore cleanup errors — old files might not exist
  }

  // Upload the new file
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type })

  if (error) {
    console.error('Upload error:', error)

    // Provide helpful error messages
    if (error.message?.includes('Bucket not found') || error.message?.includes('not found')) {
      return { url: null, error: 'Storage bucket "site-images" not found. Create it in Supabase Dashboard → Storage → New Bucket (name: site-images, public: ON).' }
    }
    if (error.message?.includes('policy') || error.message?.includes('security')) {
      return { url: null, error: 'Permission denied. Run the storage policies SQL in Supabase SQL Editor (see supabase-storage-policies.sql).' }
    }
    if (error.message?.includes('mime') || error.message?.includes('type')) {
      return { url: null, error: 'File type not allowed. Use PNG, JPG, WEBP, SVG, or GIF.' }
    }
    if (error.message?.includes('size')) {
      return { url: null, error: 'File too large. Maximum size is 5MB.' }
    }

    return { url: null, error: error.message || 'Upload failed. Check console for details.' }
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

// Get all image URLs at once
export async function getAllImageUrls(): Promise<Record<string, string>> {
  if (!supabase) return {}

  try {
    const { data: files, error } = await supabase.storage.from(BUCKET).list('', {
      limit: 100,
      sortBy: { column: 'name', order: 'asc' },
    })

    if (error || !files) {
      console.error('Failed to list images:', error)
      return {}
    }

    const urls: Record<string, string> = {}
    for (const file of files) {
      // Skip empty placeholder files
      if (file.name === '.emptyFolderPlaceholder') continue
      const slot = file.name.replace(/\.[^.]+$/, '') // remove extension
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(file.name)
      urls[slot] = data.publicUrl
    }

    return urls
  } catch (err) {
    console.error('Failed to load images:', err)
    return {}
  }
}

// Delete an image from a slot
export async function deleteImage(slot: ImageSlot): Promise<{ success: boolean; error: string | null }> {
  if (!supabase) return { success: false, error: 'Supabase is not configured' }

  try {
    const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'ico', 'gif']
    const paths = exts.map(e => `${slot}.${e}`)
    const { error } = await supabase.storage.from(BUCKET).remove(paths)
    if (error) return { success: false, error: error.message }
    return { success: true, error: null }
  } catch (err) {
    return { success: false, error: 'Failed to delete image' }
  }
}
