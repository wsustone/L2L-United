import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../providers/AuthProvider.jsx'

export default function AccountMenu({ label }) {
  const { signOut } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event) => {
      if (!menuRef.current) return
      if (menuRef.current.contains(event.target)) return
      setIsOpen(false)
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('[AccountMenu] failed to sign out', error)
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <div className="account-menu" ref={menuRef}>
      <button
        type="button"
        className="app-nav-link account-menu-button"
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="account-menu-label">{label}</span>
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
        <div className="account-menu-dropdown" role="menu">
          <Link to="/profile" className="account-menu-item" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <button type="button" className="account-menu-item" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  )
}
