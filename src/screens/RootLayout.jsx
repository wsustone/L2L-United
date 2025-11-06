import { Suspense } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import AccountMenu from '../components/AccountMenu.jsx'
import { useAuth } from '../providers/AuthProvider.jsx'

export default function RootLayout() {
  const { isAuthenticated, user, profile } = useAuth()
  const signedInLabel = `${profile?.full_name?.trim() || user?.email || 'Account'}`

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-branding">
          <Link to="/" className="app-logo" aria-label="L2L United home">
            <img src="/images/blueL2L.png" alt="L2L United logo" />
            <span className="app-logo-text">United</span>
          </Link>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end className={({ isActive }) => `app-nav-link${isActive ? ' app-nav-link-active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/portal" className={({ isActive }) => `app-nav-link${isActive ? ' app-nav-link-active' : ''}`}>
            Portal
          </NavLink>
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
      </footer>
    </div>
  )
}
