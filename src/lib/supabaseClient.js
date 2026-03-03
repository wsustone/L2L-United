import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY

let supabaseInstance = null

if (!supabaseUrl) {
  console.warn('[supabaseClient] Missing Supabase URL (VITE_SUPABASE_URL or SUPABASE_URL)')
}

if (!supabaseAnonKey) {
  console.warn('[supabaseClient] Missing Supabase anon key (VITE_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY)')
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
