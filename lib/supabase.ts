import { createClient } from '@supabase/supabase-js'

export function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const key = process.env.SUPABASE_SECRET_KEY || 'placeholder'
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

export function getAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'placeholder'
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}
