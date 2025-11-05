import { Link } from 'react-router-dom'

export default function ParentInfoPage() {
  return (
    <section className="page parent-info">
      <div className="page-hero">
        <h1>L2L United Parent Portal</h1>
        <p>
          Welcome to the L2L United parent resources hub. Here you can learn about our
development philosophy, discover project updates, and access protected documents once
you are enrolled in the portal.
        </p>
      </div>

      <div className="page-content">
        <article className="info-card">
          <h2>Public Information</h2>
          <p>
            L2L United partners with families to develop modern living solutions that are
responsive, sustainable, and community-focused. We believe in transparent communication
and empowering parents with the knowledge they need to make the best decisions.
          </p>
          <ul>
            <li>Overview of our educational and housing initiatives</li>
            <li>FAQs about partnerships and opportunities</li>
            <li>Contact details for key program coordinators</li>
          </ul>
        </article>

        <article className="info-card">
          <h2>Visit L2L Homes</h2>
          <p>
            L2L Homes showcases our modular and site-built home offerings. Explore the
options available for families and see how we combine innovation with affordability.
          </p>
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

        <article className="info-card highlight">
          <h2>Accessing Secure Resources</h2>
          <p>
            Parents gain access to sensitive documents—including the Non-Circumvent NDA and
business plan—once they have an approved account. The process involves:
          </p>
          <ol>
            <li>Create an account in the parent portal</li>
            <li>Review and sign the NDA (upload required)</li>
            <li>Await administrator approval</li>
            <li>Download the latest resources tailored to your cohort</li>
          </ol>
          <p>
            When you are ready to begin, continue to the secure portal to sign in or register
for access.
          </p>
          <Link className="primary-button" to="/portal">
            Go to Parent Portal
          </Link>
        </article>
      </div>
    </section>
  )
}
