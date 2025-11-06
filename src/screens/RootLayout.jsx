import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

import { useAuth } from '../providers/AuthProvider.jsx'

export default function RootLayout() {
  const { isAuthenticated, user, profile } = useAuth()
  const signedInLabel = profile?.full_name?.trim() || user?.email || 'Signed in'

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-branding">
          <Link to="/" className="app-logo">
            L2L United
          </Link>
        </div>
        <nav className="app-nav">
          <Link to="/" className="app-nav-link">
            Home
          </Link>
          <Link to="/portal" className="app-nav-link">
            Portal
          </Link>
          {isAuthenticated ? (
            <span className="app-nav-status" title={signedInLabel}>
              {signedInLabel}
            </span>
          ) : (
            <Link to="/sign-in" className="app-nav-link">
              Sign in
            </Link>
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
