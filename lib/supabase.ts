import { createClient } from '@supabase/supabase-js'

// Clean the URL: remove trailing slash, remove www. prefix (common mistake)
const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/\/+$/, '')
const supabaseUrl = rawUrl.replace('://www.', '://')
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
