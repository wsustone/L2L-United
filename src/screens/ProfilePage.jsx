import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../providers/AuthProvider.jsx'

export default function ProfilePage() {
  const { isAuthenticated, status: authStatus, profile, refreshProfile, user } = useAuth()

  const [formState, setFormState] = useState({
    fullName: '',
    company: '',
    phone: '',
  })
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setFormState({
      fullName: profile?.full_name ?? '',
      company: profile?.company ?? '',
      phone: profile?.phone ?? '',
    })
  }, [profile])

  if (authStatus === 'loading') {
    return <div className="page profile-page">Loading profile…</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: '/profile' }} />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (status !== 'idle') {
      setStatus('idle')
      setMessage('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const { error } = await supabase.rpc('update_profile_details', {
        p_full_name: formState.fullName.trim() || null,
        p_company: formState.company.trim() || null,
        p_phone: formState.phone.trim() || null,
      })

      if (error) {
        throw error
      }

      await refreshProfile()
      setStatus('success')
      setMessage('Profile updated.')
    } catch (error) {
      console.error('[ProfilePage] failed to update profile', error)
      setStatus('error')
      setMessage(error.message ?? 'Unable to update profile right now.')
    }
  }

  return (
    <section className="page profile-page">
      <header className="portal-header">
        <div>
          <h1>Your profile</h1>
          <p>Keep your contact information current so we can verify access quickly.</p>
        </div>
        <div className="profile-header-meta">
          <span className="badge neutral">{user?.email ?? 'Signed in'}</span>
          <button type="button" className="link-button" onClick={refreshProfile} disabled={status === 'loading'}>
            Refresh
          </button>
        </div>
      </header>

      <section className="portal-card profile-card">
        <form className="profile-form" onSubmit={handleSubmit}>
          <label htmlFor="profile-fullName">Full name</label>
          <input
            id="profile-fullName"
            name="fullName"
            type="text"
            value={formState.fullName}
            onChange={handleChange}
            placeholder="Jane Doe"
          />

          <label htmlFor="profile-company">Organization / Program</label>
          <input
            id="profile-company"
            name="company"
            type="text"
            value={formState.company}
            onChange={handleChange}
            placeholder="Community Partner"
          />

          <label htmlFor="profile-phone">Phone (optional)</label>
          <input
            id="profile-phone"
            name="phone"
            type="tel"
            value={formState.phone}
            onChange={handleChange}
            placeholder="555-555-5555"
          />

          {message ? (
            <p className={`status-message ${status === 'error' ? 'error' : 'success'}`}>{message}</p>
          ) : null}

          <div className="profile-actions">
            <button type="submit" className="primary-button" disabled={status === 'loading'}>
              {status === 'loading' ? 'Saving…' : 'Save profile'}
            </button>
            <Link to="/portal" className="secondary-button">
              Back to portal
            </Link>
          </div>
        </form>
      </section>
    </section>
  )
}
