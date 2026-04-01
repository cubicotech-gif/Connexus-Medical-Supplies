'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { IMAGE_SLOTS, uploadImage, deleteImage, getAllImageUrls, type ImageSlot } from '@/lib/storage'
import { DEFAULTS } from '@/lib/image-context'
import {
  Upload, Trash2, Check, X, LogIn, Eye, AlertCircle,
  Image as ImageIcon, Shield, Loader2,
} from 'lucide-react'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const [successSlot, setSuccessSlot] = useState<string | null>(null)
  const [supabaseConnected, setSupabaseConnected] = useState(false)

  // Simple admin password check (set via env var)
  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'connexus2025'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('admin_auth')
      if (saved === 'true') setAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (authenticated) {
      setSupabaseConnected(!!supabase)
      loadImages()
    }
  }, [authenticated])

  const loadImages = async () => {
    const urls = await getAllImageUrls()
    setImageUrls(urls)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASS) {
      setAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  const [errorSlot, setErrorSlot] = useState<{ slot: string; message: string } | null>(null)

  const handleUpload = async (slot: ImageSlot, file: File) => {
    setUploading(slot)
    setSuccessSlot(null)
    setErrorSlot(null)

    const result = await uploadImage(slot, file)
    if (result.url) {
      setImageUrls(prev => ({ ...prev, [slot]: result.url! }))
      setSuccessSlot(slot)
      setTimeout(() => setSuccessSlot(null), 3000)
    } else {
      setErrorSlot({ slot, message: result.error || 'Upload failed' })
    }
    setUploading(null)
  }

  const handleDelete = async (slot: ImageSlot) => {
    if (!confirm(`Delete the image for "${slot}"? The site will revert to the default placeholder.`)) return
    setErrorSlot(null)
    const result = await deleteImage(slot)
    if (result.success) {
      setImageUrls(prev => {
        const copy = { ...prev }
        delete copy[slot]
        return copy
      })
    } else {
      setErrorSlot({ slot, message: result.error || 'Delete failed' })
    }
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen pt-28 pb-20 diagonal-gradient flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-navy">Admin Panel</h1>
              <p className="text-gray-500 mt-1">Enter your password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-[#0098D6] transition flex items-center justify-center gap-2"
              >
                <LogIn className="h-5 w-5" />
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Group slots by section
  const sections = IMAGE_SLOTS.reduce((acc, slot) => {
    if (!acc[slot.section]) acc[slot.section] = []
    acc[slot.section].push(slot)
    return acc
  }, {} as Record<string, typeof IMAGE_SLOTS>)

  return (
    <div className="min-h-screen pt-28 pb-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Admin Nav */}
        <div className="flex gap-3 mb-8">
          <span className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
            Image Manager
          </span>
          <a href="/admin/submissions" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-navy hover:bg-gray-50 transition">
            Contact Submissions
          </a>
        </div>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-navy">Image Management</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage all images across the website. Changes appear instantly on the live site.
          </p>

          {/* Connection status */}
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            supabaseConnected
              ? 'bg-green-100 text-green-700'
              : 'bg-amber-100 text-amber-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-green-500' : 'bg-amber-500'}`} />
            {supabaseConnected
              ? 'Connected to Supabase'
              : 'Supabase not configured — add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment'
            }
          </div>
        </div>

        {/* Image sections */}
        {Object.entries(sections).map(([sectionName, slots]) => (
          <div key={sectionName} className="mb-12">
            <h2 className="text-xl font-bold text-navy mb-6 flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              {sectionName}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {slots.map((slot) => (
                <ImageUploadCard
                  key={slot.key}
                  slot={slot}
                  currentUrl={imageUrls[slot.key]}
                  defaultUrl={(DEFAULTS as Record<string, string>)[slot.key]}
                  isUploading={uploading === slot.key}
                  isSuccess={successSlot === slot.key}
                  errorMessage={errorSlot?.slot === slot.key ? errorSlot.message : undefined}
                  onUpload={(file) => handleUpload(slot.key, file)}
                  onDelete={() => handleDelete(slot.key)}
                  disabled={!supabaseConnected}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Setup instructions */}
        {!supabaseConnected && (
          <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
            <h2 className="text-xl font-bold text-navy mb-4">Supabase Setup Instructions</h2>
            <div className="space-y-4 text-gray-600">
              <p>To enable image uploads, configure Supabase:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Create a project at <strong>supabase.com</strong></li>
                <li>Go to <strong>Storage</strong> → Create a new bucket called <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">site-images</code></li>
                <li>Set the bucket to <strong>Public</strong> (so images load on the website)</li>
                <li>Go to <strong>Settings → API</strong> and copy your <strong>Project URL</strong> and <strong>anon/public key</strong></li>
                <li>Add these to your Vercel environment variables:
                  <div className="bg-gray-900 text-green-400 rounded-lg p-4 mt-2 text-sm font-mono">
                    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co<br />
                    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key<br />
                    NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
                  </div>
                </li>
                <li>Redeploy the site on Vercel</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Individual upload card component
function ImageUploadCard({
  slot,
  currentUrl,
  defaultUrl,
  isUploading,
  isSuccess,
  errorMessage,
  onUpload,
  onDelete,
  disabled,
}: {
  slot: (typeof IMAGE_SLOTS)[number]
  currentUrl?: string
  defaultUrl?: string
  isUploading: boolean
  isSuccess: boolean
  errorMessage?: string
  onUpload: (file: File) => void
  onDelete: () => void
  disabled: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const displayUrl = currentUrl || defaultUrl
  const hasCustomImage = !!currentUrl

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="flex">
        {/* Image preview */}
        <div className="relative w-40 h-40 flex-shrink-0 bg-gray-100">
          {displayUrl ? (
            <img src={displayUrl} alt={slot.label} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="h-10 w-10 text-gray-300" />
            </div>
          )}

          {/* Status overlay */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}
          {isSuccess && (
            <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
              <Check className="h-8 w-8 text-white" />
            </div>
          )}

          {/* Custom badge */}
          {hasCustomImage && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Custom
            </div>
          )}
        </div>

        {/* Info & actions */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy">{slot.label}</h3>
            <p className="text-gray-500 text-xs mt-1 leading-relaxed">{slot.description}</p>
          </div>

          <div className="flex gap-2 mt-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={disabled || isUploading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="h-3.5 w-3.5" />
              {hasCustomImage ? 'Replace' : 'Upload'}
            </button>

            {hasCustomImage && (
              <button
                onClick={onDelete}
                disabled={disabled || isUploading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Remove
              </button>
            )}

            {displayUrl && (
              <a
                href={displayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              >
                <Eye className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          {errorMessage && (
            <div className="mt-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg p-2">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
