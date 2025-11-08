import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../providers/AuthProvider.jsx'

export default function SignInPage() {
  const navigate = useNavigate()
  const { signInWithPassword, sendPasswordReset } = useAuth()

  const [formState, setFormState] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [resetStatus, setResetStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [infoMessage, setInfoMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formState.email || !formState.password) {
      setErrorMessage('Please enter your email and password.')
      return
    }

    try {
      setStatus('loading')
      setErrorMessage('')
      setInfoMessage('')
      await signInWithPassword(formState)
      navigate('/portal')
    } catch (error) {
      console.error('[SignInPage] sign in failed', error)
      setErrorMessage(error.message ?? 'Unable to sign in. Please try again.')
      setInfoMessage('')
    } finally {
      setStatus('idle')
    }
  }

  const handlePasswordReset = async () => {
    if (!formState.email) {
      setErrorMessage('Enter your email to receive a password reset link.')
      setInfoMessage('')
      return
    }

    try {
      setResetStatus('loading')
      setErrorMessage('')
      await sendPasswordReset(formState.email)
      setInfoMessage('Password reset instructions are on the way. Check your inbox.')
    } catch (error) {
      console.error('[SignInPage] password reset request failed', error)
      setErrorMessage(error.message ?? 'Unable to send reset email. Please try again.')
      setInfoMessage('')
    } finally {
      setResetStatus('idle')
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Sign in</h1>
        <p>Access secure resources with your portal credentials.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="auth-email">Email address</label>
          <input
            id="auth-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formState.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="auth-password">Password</label>
          <input
            id="auth-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formState.password}
            onChange={handleChange}
            required
          />

          {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
          {infoMessage ? <p className="auth-success">{infoMessage}</p> : null}

          <div className="auth-form-actions">
            <button
              type="button"
              className="link-button"
              onClick={handlePasswordReset}
              disabled={resetStatus === 'loading'}
            >
              {resetStatus === 'loading' ? 'Sending reset email…' : 'Forgot password?'}
            </button>
          </div>

          <button type="submit" className="primary-button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="auth-footer">
          Need an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </section>
  )
}
