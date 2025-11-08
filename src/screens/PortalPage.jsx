import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { supabase } from '../lib/supabaseClient.js'
import { useAuth } from '../providers/AuthProvider.jsx'

const STAGE_ORDER = {
  awaiting_admin: 0,
  nda_available: 1,
  under_review: 2,
  approved: 3,
  rejected: -1,
}

const STAGE_DETAILS = {
  awaiting_admin: {
    label: 'Awaiting Review',
    message: 'We will unlock NDA access after a quick admin check.',
  },
  nda_available: {
    label: 'NDA Available',
    message: 'Download, sign, and upload the NDA to keep things moving.',
  },
  under_review: {
    label: 'NDA Under Review',
    message: 'Thanks! We are reviewing your upload and will update you soon.',
  },
  approved: {
    label: 'Approved',
    message: 'Files and version history are now unlocked for your account.',
  },
  rejected: {
    label: 'Action Needed',
    message: 'Reach out to support so we can help resolve the submission.',
  },
}

const NDA_BUCKET = 'nda-workflow'
const SECURE_DOC_BUCKET = 'secure-docs'
const CURRENT_TERMS_VERSION = '2025-11-05'

const STATIC_FILES = {
  ndaTemplate: 'static_files/Non-Circumvent NDA.pdf',
  termsOverview: 'static_files/L2LUnited_Condition.pdf',
}

const compareStage = (stage, target) => (STAGE_ORDER[stage] ?? -1) >= (STAGE_ORDER[target] ?? 999)

export default function PortalPage() {
  const { isAuthenticated, status: authStatus, profile, refreshProfile, sendInviteEmail } = useAuth()

  const [ndaDownloadStatus, setNdaDownloadStatus] = useState('idle')
  const [ndaUploadStatus, setNdaUploadStatus] = useState('idle')
  const [ndaMessage, setNdaMessage] = useState('')

  const [termsStatus, setTermsStatus] = useState('idle')
  const [termsMessage, setTermsMessage] = useState('')
  const [hasViewedTerms, setHasViewedTerms] = useState(false)

  const [documents, setDocuments] = useState([])
  const [documentsStatus, setDocumentsStatus] = useState('idle')
  const [documentsError, setDocumentsError] = useState('')

  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteStatus, setInviteStatus] = useState('idle')
  const [inviteMessage, setInviteMessage] = useState('')

  const accessStage = profile?.access_stage ?? 'awaiting_admin'
  const stageInfo = STAGE_DETAILS[accessStage] ?? STAGE_DETAILS.awaiting_admin
  const needsTermsRefresh = (profile?.terms_version ?? null) !== CURRENT_TERMS_VERSION
  const hasAcceptedCurrentTerms = Boolean(profile?.terms_agreed_at) && !needsTermsRefresh

  useEffect(() => {
    if (!profile || !compareStage(accessStage, 'approved')) {
      setDocuments([])
      return
    }

    const loadDocuments = async () => {
      setDocumentsStatus('loading')
      setDocumentsError('')

      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('active', true)
        .order('sort_order', { ascending: true })

      if (error) {
        console.error('[PortalPage] failed to load documents', error)
        setDocumentsError(error.message ?? 'Unable to load documents right now.')
        setDocumentsStatus('error')
        return
      }

      setDocuments(data ?? [])
      setDocumentsStatus('ready')
    }

    loadDocuments()
  }, [profile, accessStage])

  useEffect(() => {
    if (needsTermsRefresh) {
      setHasViewedTerms(false)
    } else if (hasAcceptedCurrentTerms) {
      setHasViewedTerms(true)
    }
  }, [needsTermsRefresh, hasAcceptedCurrentTerms])

  const getSignedUrl = async (bucket, path, expiresIn = 60 * 5) => {
    const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, expiresIn)

    if (error) {
      throw error
    }

    if (!data?.signedUrl) {
      throw new Error('File not available yet. Please check back soon.')
    }

    return data.signedUrl
  }

  const handleDownloadNda = async () => {
    setNdaDownloadStatus('loading')
    setNdaMessage('')

    try {
      let ndaUrl = null

      const { data, error } = await supabase.rpc('get_nda_template_url')

      if (error) {
        console.warn('[PortalPage] falling back to storage for NDA template', error)
      } else {
        ndaUrl = data ?? null
      }

      if (!ndaUrl) {
        ndaUrl = await getSignedUrl(SECURE_DOC_BUCKET, STATIC_FILES.ndaTemplate)
      }

      window.open(ndaUrl, '_blank', 'noopener,noreferrer')

      setNdaDownloadStatus('success')
    } catch (error) {
      console.error('[PortalPage] failed to get NDA template', error)
      setNdaDownloadStatus('error')
      setNdaMessage(error.message ?? 'Unable to retrieve NDA template at this time.')
    }
  }

  const handleUploadNda = async (event) => {
    event.preventDefault()

    if (!user) return

    const fileInput = event.currentTarget.querySelector('input[type="file"]')
    const file = fileInput?.files?.[0]

    if (!file) {
      setNdaMessage('Please choose a signed NDA file to upload.')
      return
    }

    setNdaUploadStatus('loading')
    setNdaMessage('Uploading signed NDA…')

    try {
      const fileExtension = file.name.split('.').pop()
      const filePath = `signed/${user.id}/${Date.now()}.${fileExtension || 'pdf'}`

      const { error: uploadError } = await supabase.storage.from(NDA_BUCKET).upload(filePath, file, {
        contentType: file.type || 'application/pdf',
        upsert: true,
      })

      if (uploadError) {
        throw uploadError
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          nda_file_path: filePath,
          nda_uploaded_at: new Date().toISOString(),
          access_stage: accessStage === 'approved' ? 'approved' : 'under_review',
        })
        .eq('id', user.id)

      if (updateError) {
        throw updateError
      }

      await refreshProfile()

      setNdaUploadStatus('success')
      setNdaMessage('Signed NDA uploaded successfully. Our team will review it shortly.')
      fileInput.value = ''
    } catch (error) {
      console.error('[PortalPage] failed to upload NDA', error)
      setNdaUploadStatus('error')
      setNdaMessage(error.message ?? 'Unable to upload at this time. Please try again.')
    }
  }

  const handleAcceptTerms = async () => {
    setTermsStatus('loading')
    setTermsMessage('')

    try {
      const { error } = await supabase.rpc('accept_terms', { p_terms_version: CURRENT_TERMS_VERSION })
      if (error) {
        throw error
      }
      await refreshProfile()
      setTermsStatus('success')
      setTermsMessage('Terms accepted successfully.')
      setHasViewedTerms(true)
    } catch (error) {
      console.error('[PortalPage] failed to accept terms', error)
      setTermsStatus('error')
      setTermsMessage(error.message ?? 'Unable to record acceptance right now.')
    }
  }

  const handleViewTermsDocument = async () => {
    try {
      const signedUrl = await getSignedUrl(SECURE_DOC_BUCKET, STATIC_FILES.termsOverview)
      window.open(signedUrl, '_blank', 'noopener,noreferrer')
      setHasViewedTerms(true)
    } catch (error) {
      console.error('[PortalPage] failed to open terms document', error)
      setTermsStatus('error')
      setTermsMessage(error.message ?? 'Unable to open the terms document right now.')
    }
  }

  const handleDownloadDocument = async (document) => {
    try {
      const { data, error } = await supabase.rpc('log_and_get_document_url', {
        p_document_id: document.id,
      })

      if (error) {
        throw error
      }

      if (data) {
        window.open(data, '_blank', 'noopener,noreferrer')
      }
    } catch (error) {
      console.error('[PortalPage] failed to download document', error)
      setDocumentsError(error.message ?? 'Unable to download document at this time.')
    }
  }

  const handleInviteSubmit = async (event) => {
    event.preventDefault()

    if (!inviteEmail) {
      setInviteMessage('Enter an email to send the invitation to.')
      setInviteStatus('error')
      return
    }

    try {
      setInviteStatus('loading')
      setInviteMessage('')
      await sendInviteEmail({ email: inviteEmail })
      setInviteStatus('success')
      setInviteMessage('Invitation sent! The recipient will get setup instructions shortly.')
      setInviteEmail('')
    } catch (error) {
      console.error('[PortalPage] failed to send invite', error)
      setInviteStatus('error')
      setInviteMessage(error.message ?? 'Unable to send invite right now. Please try again.')
    }
  }

  const renderAuthPrompt = () => (
    <section className="portal-card">
      <h2>Access requires an account</h2>
      <p>
        Please <Link to="/sign-in">sign in</Link> or <Link to="/register">register</Link> to continue to the secure
        portal.
      </p>
    </section>
  )

  const renderNdaSection = () => (
    <section className="portal-card">
      <h2>Non-Circumvent NDA</h2>
      <p>{stageInfo.message}</p>

      {!compareStage(accessStage, 'nda_available') ? (
        <p className="status-message warning">
          NDA download unlocks once an administrator approves your request.
        </p>
      ) : null}

      {compareStage(accessStage, 'nda_available') && !hasAcceptedCurrentTerms ? (
        <p className="status-message warning">
          Accept the latest terms before downloading the NDA template.
        </p>
      ) : null}

      <div className="action-row">
        <button
          type="button"
          className="secondary-button"
          onClick={handleDownloadNda}
          disabled={
            !compareStage(accessStage, 'nda_available') ||
            !hasAcceptedCurrentTerms ||
            ndaDownloadStatus === 'loading'
          }
        >
          {ndaDownloadStatus === 'loading' ? 'Preparing…' : 'Download NDA template'}
        </button>
      </div>

      {compareStage(accessStage, 'nda_available') ? (
        <form className="upload-form" onSubmit={handleUploadNda}>
          <label htmlFor="nda-file">Upload signed NDA</label>
          <input id="nda-file" name="nda-file" type="file" accept=".pdf,.doc,.docx" />
          <button type="submit" className="primary-button" disabled={ndaUploadStatus === 'loading'}>
            {ndaUploadStatus === 'loading' ? 'Uploading…' : 'Submit signed NDA'}
          </button>
        </form>
      ) : null}

      {ndaMessage ? <p className="status-message">{ndaMessage}</p> : null}

      {profile?.nda_uploaded_at ? (
        <p className="meta">
          Last uploaded: {new Date(profile.nda_uploaded_at).toLocaleString()} ({profile.nda_file_path})
        </p>
      ) : null}
    </section>
  )

  const renderTermsSection = () => {
    const acceptButtonLabel = termsStatus === 'loading' ? 'Recording…' : 'I agree to the terms'

    return (
      <section className="portal-card">
        <h2>Terms &amp; Conditions</h2>
        <p>
          Review the program terms and confirm acceptance. You must agree to the terms before accessing
          confidential documents.
        </p>

        {needsTermsRefresh && profile?.terms_agreed_at ? (
          <p className="status-message warning">
            New terms are available. Please review the document and accept to continue.
          </p>
        ) : null}

        <div className="action-row">
          <button type="button" className="secondary-button" onClick={handleViewTermsDocument}>
            View terms document
          </button>

          {hasAcceptedCurrentTerms ? (
            <p className="meta">Accepted on {new Date(profile.terms_agreed_at).toLocaleString()}</p>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={handleAcceptTerms}
              disabled={!hasViewedTerms || termsStatus === 'loading'}
            >
              {acceptButtonLabel}
            </button>
          )}
        </div>

        {!hasAcceptedCurrentTerms && !hasViewedTerms ? (
          <p className="status-message warning">Open the document before accepting the latest terms.</p>
        ) : null}

        {termsMessage ? (
          <p className={`status-message ${termsStatus === 'error' ? 'error' : 'success'}`}>{termsMessage}</p>
        ) : null}
      </section>
    )
  }

  const renderAdminTools = () => {
    if (!profile?.is_admin) {
      return null
    }

    return (
      <section className="portal-card">
        <h2>Admin tools</h2>
        <p>Invite collaborators to the portal. Each invite email contains a secure registration link.</p>

        <form className="auth-form" onSubmit={handleInviteSubmit}>
          <label htmlFor="invite-email">Invite email</label>
          <input
            id="invite-email"
            name="invite-email"
            type="email"
            autoComplete="email"
            value={inviteEmail}
            onChange={(event) => {
              setInviteEmail(event.target.value)
              if (inviteStatus !== 'idle') {
                setInviteStatus('idle')
                setInviteMessage('')
              }
            }}
            placeholder="guest@example.com"
            required
          />

          {inviteMessage ? (
            <p className={`status-message ${inviteStatus === 'error' ? 'error' : 'success'}`}>{inviteMessage}</p>
          ) : null}

          <button type="submit" className="primary-button" disabled={inviteStatus === 'loading'}>
            {inviteStatus === 'loading' ? 'Sending invite…' : 'Send invite'}
          </button>
        </form>
      </section>
    )
  }

  const renderDocumentsSection = () => {
    if (!compareStage(accessStage, 'approved')) {
      return null
    }

    return (
      <section className="portal-card">
        <h2>Available documents</h2>
        <p>Download the latest resources. Each download is recorded for tracking purposes.</p>

        {!hasAcceptedCurrentTerms ? (
          <p className="status-message warning">
            Please review and accept the current terms before downloading confidential documents.
          </p>
        ) : null}

        {documentsStatus === 'loading' ? <p className="meta">Loading documents…</p> : null}
        {documentsError ? <p className="status-message error">{documentsError}</p> : null}

        <ul className="document-list">
          {documents.map((document) => (
            <li key={document.id} className="document-item">
              <div>
                <h3>{document.title}</h3>
                {document.description ? <p>{document.description}</p> : null}
                <p className="meta">Version: {document.file_version}</p>
              </div>
              <button
                type="button"
                className="primary-button"
                onClick={() => handleDownloadDocument(document)}
                disabled={!hasAcceptedCurrentTerms}
              >
                Download
              </button>
            </li>
          ))}
        </ul>

        {documentsStatus === 'ready' && documents.length === 0 ? (
          <p className="meta">No documents available yet. Please check back soon.</p>
        ) : null}
      </section>
    )
  }

  const stageBadgeClass = useMemo(() => {
    if (accessStage === 'approved') return 'badge success'
    if (accessStage === 'under_review') return 'badge info'
    if (accessStage === 'nda_available') return 'badge warning'
    if (accessStage === 'rejected') return 'badge error'
    return 'badge neutral'
  }, [accessStage])

  if (authStatus === 'loading') {
    return <div className="page portal-page">Loading your portal…</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: '/portal' }} />
  }

  return (
    <section className="page portal-page">
      <header className="portal-header">
        <div>
          <h1>Portal</h1>
          <p>Manage access, agreements, and downloads in one place.</p>
        </div>
        <div className="portal-header-actions">
          <span className={stageBadgeClass}>{stageInfo.label}</span>
        </div>
      </header>

      <div className="portal-grid">
        {renderAdminTools()}
        {renderTermsSection()}
        {renderNdaSection()}
        {renderDocumentsSection()}
      </div>
    </section>
  )
}
