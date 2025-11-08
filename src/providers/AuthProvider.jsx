import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { supabase } from '../lib/supabaseClient.js'

const AuthContext = createContext(null)

const initialState = {
  session: null,
  profile: null,
  status: 'loading',
  error: null,
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let isMounted = true

    const loadSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (!isMounted) return

        setState((prev) => ({
          ...prev,
          session: session ?? null,
          status: 'ready',
          error,
        }))

        if (session) {
          await hydrateProfile(session.user)
        }
      } catch (error) {
        if (!isMounted) return
        console.error('[AuthProvider] Failed to establish session', error)
        setState((prev) => ({ ...prev, status: 'error', error }))
      }
    }

    const hydrateProfile = async (user) => {
      try {
        const { data, error } = await supabase.rpc('get_current_profile')
        if (!isMounted) return

        if (error) {
          console.error('[AuthProvider] Failed to load profile', error)
        }

        setState((prev) => ({
          ...prev,
          profile: data ?? null,
        }))
      } catch (error) {
        if (!isMounted) return
        console.error('[AuthProvider] Unexpected profile load error', error)
      }
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({
        ...prev,
        session: session ?? null,
        status: 'ready',
      }))

      if (session) {
        hydrateProfile(session.user)
      } else {
        setState((prev) => ({ ...prev, profile: null }))
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signInWithPassword = async ({ email, password }) => {
    const response = await supabase.auth.signInWithPassword({ email, password })

    if (response.error) {
      throw response.error
    }

    return response.data.session
  }

  const callAuthEmailFunction = async (payload) => {
    const response = await fetch('/.netlify/functions/auth-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    let result = null
    try {
      result = await response.json()
    } catch (error) {
      result = null
    }

    if (!response.ok) {
      const message = result?.message ?? 'Failed to process auth email request.'
      const error = new Error(message)
      error.status = response.status
      throw error
    }

    return result ?? { ok: true }
  }

  const signUpWithPassword = async ({ email, password, options }) => {
    if (!email || !password) {
      throw new Error('Email and password are required to request registration.')
    }

    await callAuthEmailFunction({
      action: 'signup',
      email,
      password,
      redirectTo: options?.emailRedirectTo,
    })

    return { email }
  }

  const sendInviteEmail = async ({ email, redirectTo } = {}) => {
    if (!email) {
      throw new Error('Email is required to send an invite.')
    }

    await callAuthEmailFunction({
      action: 'invite',
      email,
      redirectTo,
    })
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }
  }

  const sendPasswordReset = async (email, { redirectTo } = {}) => {
    if (!email) {
      throw new Error('Email is required to request a password reset.')
    }

    await callAuthEmailFunction({
      action: 'recovery',
      email,
      redirectTo,
    })
  }

  const refreshProfile = async () => {
    if (!state.session) return null
    const { data, error } = await supabase.rpc('get_current_profile')
    if (error) {
      console.error('[AuthProvider] Failed to refresh profile', error)
      return null
    }
    setState((prev) => ({ ...prev, profile: data ?? null }))
    return data ?? null
  }

  const value = useMemo(
    () => ({
      session: state.session,
      user: state.session?.user ?? null,
      profile: state.profile,
      status: state.status,
      error: state.error,
      isAuthenticated: Boolean(state.session?.user),
      signInWithPassword,
      signUpWithPassword,
      sendInviteEmail,
      signOut,
      sendPasswordReset,
      refreshProfile,
    }),
    [state.session, state.profile, state.status, state.error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
