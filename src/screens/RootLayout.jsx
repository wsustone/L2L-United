import { Suspense, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import AccountMenu from '../components/AccountMenu.jsx'
import { useAuth } from '../providers/AuthProvider.jsx'

export default function RootLayout() {
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false)
  const { isAuthenticated, user, profile } = useAuth()
  const signedInLabel = `${profile?.full_name?.trim() || user?.email || 'Account'}`

  const toggleHelpMenu = () => {
    setIsHelpMenuOpen((previous) => !previous)
  }

  const handleHelpMenuBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsHelpMenuOpen(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-branding">
          <Link to="/" className="app-logo" aria-label="L2L United home">
            <img src="/images/Lifetime%20to%20Lifetime%20United.jpg" alt="L2L United logo" />            </Link>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end className={({ isActive }) => `app-nav-link${isActive ? ' app-nav-link-active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/portal" className={({ isActive }) => `app-nav-link${isActive ? ' app-nav-link-active' : ''}`}>
            Portal
          </NavLink>
          <NavLink
            to="/privacy-policy"
            className={({ isActive }) => `app-nav-link${isActive ? ' app-nav-link-active' : ''}`}
          >
            Privacy
          </NavLink>
          <div className="help-menu" onBlur={handleHelpMenuBlur} tabIndex={-1}>
            <button type="button" className="help-menu-button" onClick={toggleHelpMenu}>
              Help
            </button>
            {isHelpMenuOpen ? (
              <div className="help-menu-panel" role="dialog" aria-label="Help options">
                <p>Need assistance? Email our team and we’ll get back promptly.</p>
                <a href="mailto:support@l2lunited.com" className="help-menu-link">
                  support@l2lunited.com
                </a>
              </div>
            ) : null}
          </div>
          {isAuthenticated ? (
            <AccountMenu label={signedInLabel} />
          ) : (
            <NavLink to="/sign-in" className={({ isActive }) => `app-nav-link${isActive ? ' app-nav-link-active' : ''}`}>
              Sign in
            </NavLink>
          )}
        </nav>
      </header>

      <main className="app-main">
        <Suspense fallback={<div className="loading-state">Loading…</div>}>
          <Outlet />
        </Suspense>
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} L2L United. All rights reserved.</p>
        <Link to="/privacy-policy" className="footer-link">
          Privacy Policy
        </Link>
      </footer>
    </div>
  )
}
