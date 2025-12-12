import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseInstance = null

if (!supabaseUrl) {
  console.warn('[supabaseClient] Missing VITE_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.warn('[supabaseClient] Missing VITE_SUPABASE_ANON_KEY environment variable')
}

if (supabaseUrl && supabaseAnonKey) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'x-client-info': 'l2l-united-portal',
      },
    },
  })
} else {
  console.warn('[supabaseClient] Supabase is not configured; auth features are disabled.')
}

export const supabase = supabaseInstance
