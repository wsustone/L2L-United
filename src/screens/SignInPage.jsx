import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../providers/AuthProvider.jsx'

export default function SignInPage() {
  const navigate = useNavigate()
  const { signInWithPassword } = useAuth()

  const [formState, setFormState] = useState({ email: '', password: '' })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
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
      await signInWithPassword(formState)
      navigate('/portal')
    } catch (error) {
      console.error('[SignInPage] sign in failed', error)
      setErrorMessage(error.message ?? 'Unable to sign in. Please try again.')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Sign in</h1>
        <p>Access secure parent resources with your portal credentials.</p>

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
