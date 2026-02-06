import { Link } from 'react-router-dom'

export default function SupportPage() {
  return (
    <section className="page support-page">
      <div className="page-hero">
        <h1>Support</h1>
        <p>Get help with portal access, document sharing, or account issues.</p>
      </div>

      <div className="page-content single-column">
        <article className="info-card">
          <h2>Contact</h2>
          <p>
            Email <a href="mailto:support@l2lunited.com">support@l2lunited.com</a> and include your organization name
            plus a short description of what you need.
          </p>

          <h2>Common requests</h2>
          <ul>
            <li>
              <strong>Can’t sign in:</strong> Confirm your email address and try resetting your password.
            </li>
            <li>
              <strong>Need access:</strong> Register for an account, then wait for admin approval.
            </li>
            <li>
              <strong>Can’t see the shared folder:</strong> Verify your email, then return to the portal.
            </li>
          </ul>

          <h2>Quick links</h2>
          <p>
            <Link className="link-button" to="/sign-in">
              Sign in
            </Link>
          </p>
          <p>
            <Link className="link-button" to="/register">
              Request access
            </Link>
          </p>
          <p>
            <Link className="link-button" to="/reset-password">
              Reset password
            </Link>
          </p>
          <p>
            <Link className="link-button" to="/privacy-policy">
              Privacy policy
            </Link>
          </p>
        </article>
      </div>
    </section>
  )
}
