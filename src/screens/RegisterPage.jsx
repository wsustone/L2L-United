import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from '../providers/AuthProvider.jsx'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { signUpWithPassword } = useAuth()

  const [formState, setFormState] = useState({ email: '', password: '', confirmPassword: '' })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formState.email || !formState.password) {
      setErrorMessage('Please provide an email and password to continue.')
      return
    }

    if (formState.password !== formState.confirmPassword) {
      setErrorMessage('Passwords do not match. Please check and try again.')
      return
    }

    try {
      setStatus('loading')
      setErrorMessage('')
      setSuccessMessage('')

      await signUpWithPassword({
        email: formState.email,
        password: formState.password,
        options: {
          emailRedirectTo: `${window.location.origin}/portal`,
        },
      })

      setSuccessMessage(
        'Registration successful! Please check your email for confirmation and sign in once verified.',
      )
      setTimeout(() => {
        navigate('/sign-in')
      }, 3000)
    } catch (error) {
      console.error('[RegisterPage] registration failed', error)
      setErrorMessage(error.message ?? 'Unable to register. Please try again.')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>Create an account</h1>
        <p>Complete the form below to request access to the parent portal.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formState.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formState.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-confirm">Confirm password</label>
          <input
            id="register-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={formState.confirmPassword}
            onChange={handleChange}
            required
          />

          {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
          {successMessage ? <p className="auth-success">{successMessage}</p> : null}

          <button type="submit" className="primary-button" disabled={status === 'loading'}>
            {status === 'loading' ? 'Registering…' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    </section>
  )
}
