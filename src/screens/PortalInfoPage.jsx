import { Link } from 'react-router-dom'

import { useAuth } from '../providers/AuthProvider.jsx'

export default function PortalInfoPage() {
  const { isAuthenticated, status: authStatus } = useAuth()
  const showPortalCard = authStatus === 'ready' && isAuthenticated
  return (
    <section className="page info">
      <div className="page-hero">
        <h1>L2L United</h1>
        <p>See the latest updates and jump into the secure workspace when you’re ready.</p>
      </div>

      <div className="page-content">
        <article className="info-card">
          <h2>Overview</h2>
          <p>
            L2L United partners with builders and communities to deliver flexible housing solutions.
            Watch this space for quick announcements and timelines.
          </p>
        </article>

        <article className="info-card">
          <h2>Visit L2L Homes</h2>
          <p>Preview models, specs, and inspiration from the Homes lineup.</p>
          <p>
            <a
              className="primary-link"
              href="https://www.l2lhomes.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              Explore L2L Homes
            </a>
          </p>
        </article>

        {showPortalCard ? (
          <article className="info-card highlight">
            <h2>Your portal</h2>
            <p>Access agreements, roadmaps, and versioned files from your secure workspace.</p>
            <div className="cta-row">
              <Link className="primary-button" to="/portal">
                Go to portal
              </Link>
            </div>
          </article>
        ) : (
          <article className="info-card highlight">
            <h2>Secure access</h2>
            <p>Log in to download agreements, roadmaps, and versioned files.</p>
            <div className="cta-row">
              <Link className="primary-button" to="/sign-in">
                Sign in
              </Link>
              <Link className="secondary-button" to="/register">
                Request access
              </Link>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
