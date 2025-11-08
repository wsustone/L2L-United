import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { supabase } from '../lib/supabaseClient.js'

const parseHashParams = () => {
  if (typeof window === 'undefined') {
    return {}
  }

  const hash = window.location.hash?.replace(/^#/, '')
  if (!hash) {
    return {}
  }

  return Object.fromEntries(new URLSearchParams(hash))
}

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [formState, setFormState] = useState({ password: '', confirmPassword: '' })
  const [status, setStatus] = useState('initializing')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const params = useMemo(() => parseHashParams(), [])

  useEffect(() => {
    const establishSession = async () => {
      const { access_token: accessToken, refresh_token: refreshToken, type } = params

      if (!accessToken || !refreshToken || type !== 'recovery') {
        setErrorMessage('This password reset link is invalid or has expired. Request a new reset email.')
        setStatus('error')
        return
      }

      try {
        setStatus('initializing')
        const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
        if (error) {
          throw error
        }

        // Remove sensitive tokens from the URL once we have a valid session.
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', window.location.pathname)
        }

        setStatus('ready')
      } catch (error) {
        console.error('[ResetPasswordPage] Failed to establish session from recovery link', error)
        setErrorMessage(error.message ?? 'Unable to validate this password reset link. Please request a new email.')
        setStatus('error')
      }
    }

    establishSession()
  }, [params])

  const handleChange = useCallback((event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (errorMessage) {
      setErrorMessage('')
    }
  }, [errorMessage])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (status !== 'ready' && status !== 'error') {
      return
    }

    if (!formState.password || !formState.confirmPassword) {
      setErrorMessage('Enter and confirm your new password.')
      return
    }

    if (formState.password !== formState.confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.')
      return
    }

    if (formState.password.length < 8) {
      setErrorMessage('For security, choose a password with at least 8 characters.')
      return
    }

    try {
      setStatus('updating')
      setErrorMessage('')

      const { error } = await supabase.auth.updateUser({ password: formState.password })
      if (error) {
        throw error
      }

      setSuccessMessage('Password updated! You can continue to the portal or sign in again if prompted.')
      setStatus('success')

      setTimeout(() => {
        navigate('/portal')
      }, 3000)
    } catch (error) {
      console.error('[ResetPasswordPage] Failed to update password', error)
      setErrorMessage(error.message ?? 'Unable to update password right now. Please try again.')
      setStatus('ready')
    }
  }

  const isLoading = status === 'initializing'
  const isSubmitting = status === 'updating'

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Reset your password</h1>
        <p>Choose a new password to continue into the L2L United portal.</p>

        {isLoading ? (
          <p className="auth-success">Validating your reset link…</p>
        ) : null}

        {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
        {successMessage ? <p className="auth-success">{successMessage}</p> : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="reset-password">New password</label>
          <input
            id="reset-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formState.password}
            onChange={handleChange}
            disabled={isLoading || status === 'success'}
            required
          />

          <label htmlFor="reset-confirm">Confirm new password</label>
          <input
            id="reset-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={formState.confirmPassword}
            onChange={handleChange}
            disabled={isLoading || status === 'success'}
            required
          />

          <button type="submit" className="primary-button" disabled={isLoading || isSubmitting || status === 'success'}>
            {isSubmitting ? 'Updating password…' : 'Set new password'}
          </button>
        </form>

        <p className="auth-footer">
          Need help? Email <a href="mailto:support@l2lunited.com">support@l2lunited.com</a> or return to the{' '}
          <Link to="/sign-in">sign in page</Link>.
        </p>
      </div>
    </section>
  )
}
