import { useEffect, useRef, useState } from 'react'

import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../providers/AuthProvider.jsx'

export default function ProfileMenu({ label }) {
  const { profile, refreshProfile, signOut } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [formState, setFormState] = useState({
    fullName: '',
    company: '',
    phone: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    setFormState({
      fullName: profile?.full_name ?? '',
      company: profile?.company ?? '',
      phone: profile?.phone ?? '',
    })
  }, [isOpen, profile])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!dropdownRef.current) return
      if (dropdownRef.current.contains(event.target)) return
      setIsOpen(false)
    }

    if (isOpen) {
      window.addEventListener('pointerdown', handlePointerDown)
      return () => window.removeEventListener('pointerdown', handlePointerDown)
    }

    return undefined
  }, [isOpen])

  const handleToggle = () => {
    setStatus('idle')
    setErrorMessage('')
    setIsOpen((prev) => !prev)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    if (status !== 'idle') {
      setStatus('idle')
      setErrorMessage('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')
    setErrorMessage('')

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
    } catch (error) {
      console.error('[ProfileMenu] failed to update profile', error)
      setErrorMessage(error.message ?? 'Unable to update profile right now.')
      setStatus('error')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('[ProfileMenu] failed to sign out', error)
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <div className="profile-menu" ref={dropdownRef}>
      <button
        type="button"
        className="profile-menu-button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen ? (
        <div className="profile-menu-dropdown" role="menu">
          <header className="profile-menu-header">
            <div>
              <p className="profile-menu-label">Signed in as</p>
              <p className="profile-menu-value">{label}</p>
            </div>
            <button type="button" className="link-button" onClick={handleSignOut}>
              Sign out
            </button>
          </header>

          <form className="profile-menu-form" onSubmit={handleSubmit}>
            <fieldset disabled={status === 'loading'}>
              <legend>Profile details</legend>

              <label htmlFor="profile-menu-fullName">Full name</label>
              <input
                id="profile-menu-fullName"
                name="fullName"
                type="text"
                value={formState.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
              />

              <label htmlFor="profile-menu-company">Organization / Program</label>
              <input
                id="profile-menu-company"
                name="company"
                type="text"
                value={formState.company}
                onChange={handleChange}
                placeholder="Parent Association"
              />

              <label htmlFor="profile-menu-phone">Phone (optional)</label>
              <input
                id="profile-menu-phone"
                name="phone"
                type="tel"
                value={formState.phone}
                onChange={handleChange}
                placeholder="555-555-5555"
              />
            </fieldset>

            {errorMessage ? <p className="status-message error">{errorMessage}</p> : null}
            {status === 'success' ? <p className="status-message success">Profile updated.</p> : null}

            <button type="submit" className="primary-button">
              {status === 'loading' ? 'Saving…' : 'Save profile'}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  )
}
