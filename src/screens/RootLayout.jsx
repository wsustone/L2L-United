import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function RootLayout() {
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
            Parent Portal
          </Link>
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
