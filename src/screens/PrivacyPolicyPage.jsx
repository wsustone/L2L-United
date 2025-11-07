import { Link } from 'react-router-dom'

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear()

  return (
    <section className="page privacy">
      <div className="page-hero">
        <h1>Privacy Policy</h1>
        <p>How L2L United collects, uses, and protects your information.</p>
      </div>

      <div className="page-content single-column">
        <article className="info-card">
          <h2>1. Overview</h2>
          <p>
            L2L United respects your privacy and is committed to safeguarding the personal information
            entrusted to us. This policy summarizes the types of data we collect, how it is used, and the
            safeguards in place to protect it.
          </p>

          <h2>2. Information we collect</h2>
          <ul>
            <li>
              <strong>Account details:</strong> Name, email, company, and role provided during registration.
            </li>
            <li>
              <strong>Usage information:</strong> Portal activity needed to maintain platform security and
              performance.
            </li>
            <li>
              <strong>Support correspondence:</strong> Messages sent to our support channels, including
              <a href="mailto:support@l2lunited.com"> support@l2lunited.com</a>.
            </li>
          </ul>

          <h2>3. How we use information</h2>
          <ul>
            <li>Verify identity and authorize portal access.</li>
            <li>Deliver updates, contract documents, and project communications.</li>
            <li>Improve product reliability, usability, and support response.</li>
          </ul>

          <h2>4. Data retention</h2>
          <p>
            We retain user records while your organization collaborates with L2L United and for as long as
            required for legal or contractual obligations. Request removal at any time by contacting{' '}
            <a href="mailto:privacy@l2lunited.com">privacy@l2lunited.com</a>.
          </p>

          <h2>5. Your choices</h2>
          <ul>
            <li>Review or update your profile from the portal profile page.</li>
            <li>Request data export, correction, or deletion via <a href="mailto:privacy@l2lunited.com">privacy@l2lunited.com</a>.</li>
            <li>Unsubscribe from non-essential emails using the link in any message.</li>
          </ul>

          <h2>6. Security</h2>
          <p>
            Access to sensitive documents is restricted to authorized personnel. All traffic to the portal is
            encrypted via TLS, and account authentication is managed through Supabase with session security
            best practices.
          </p>

          <h2>7. Updates</h2>
          <p>
            Policy updates may occur to reflect operational or regulatory changes. We will notify registered
            users of material updates via email or portal alerts.
          </p>

          <p className="meta">
            Effective date: {currentYear}. For questions, contact <a href="mailto:privacy@l2lunited.com">privacy@l2lunited.com</a>.
          </p>

          <p>
            <Link className="link-button" to="/">
              Back to portal overview
            </Link>
          </p>
        </article>
      </div>
    </section>
  )
}
