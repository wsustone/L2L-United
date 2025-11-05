import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

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
    label: 'Awaiting Admin Approval',
    message: 'An administrator will unlock NDA access once your account is verified.',
  },
  nda_available: {
    label: 'NDA Available',
    message: 'Download, sign, and upload the Non-Circumvent NDA to continue.',
  },
  under_review: {
    label: 'NDA Under Review',
    message: 'Your signed NDA has been submitted. We will notify you once it is approved.',
  },
  approved: {
    label: 'Approved',
    message: 'You now have access to parent resources and download history.',
  },
  rejected: {
    label: 'Action Required',
    message: 'Please contact support for additional information regarding your submission.',
  },
}

const NDA_BUCKET = 'nda-workflow'

const compareStage = (stage, target) => (STAGE_ORDER[stage] ?? -1) >= (STAGE_ORDER[target] ?? 999)

export default function PortalPage() {
  const { isAuthenticated, status: authStatus, profile, user, signOut, refreshProfile } = useAuth()

  const [profileStatus, setProfileStatus] = useState('idle')
  const [profileError, setProfileError] = useState('')

  const [ndaDownloadStatus, setNdaDownloadStatus] = useState('idle')
  const [ndaUploadStatus, setNdaUploadStatus] = useState('idle')
  const [ndaMessage, setNdaMessage] = useState('')

  const [termsStatus, setTermsStatus] = useState('idle')
  const [termsMessage, setTermsMessage] = useState('')

  const [documents, setDocuments] = useState([])
  const [documentsStatus, setDocumentsStatus] = useState('idle')
  const [documentsError, setDocumentsError] = useState('')

  const accessStage = profile?.access_stage ?? 'awaiting_admin'
  const stageInfo = STAGE_DETAILS[accessStage] ?? STAGE_DETAILS.awaiting_admin

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

  const handleProfileSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fullName = formData.get('fullName')?.toString().trim() ?? ''
    const phone = formData.get('phone')?.toString().trim() ?? ''
    const company = formData.get('company')?.toString().trim() ?? ''

    setProfileStatus('loading')
    setProfileError('')

    try {
      const { error } = await supabase.rpc('update_profile_details', {
        p_full_name: fullName || null,
        p_phone: phone || null,
        p_company: company || null,
      })

      if (error) {
        throw error
      }

      await refreshProfile()
      setProfileStatus('success')
    } catch (error) {
      console.error('[PortalPage] failed to update profile', error)
      setProfileStatus('error')
      setProfileError(error.message ?? 'Unable to save profile details. Please try again.')
    }
  }

  const handleDownloadNda = async () => {
    setNdaDownloadStatus('loading')
    setNdaMessage('')

    try {
      const { data, error } = await supabase.rpc('get_nda_template_url')

      if (error) {
        throw error
      }

      if (data) {
        window.open(data, '_blank', 'noopener,noreferrer')
      } else {
        setNdaMessage('Template not available yet. Please check back soon.')
      }

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
      const { error } = await supabase.rpc('accept_terms')
      if (error) {
        throw error
      }
      await refreshProfile()
      setTermsStatus('success')
      setTermsMessage('Terms accepted successfully.')
    } catch (error) {
      console.error('[PortalPage] failed to accept terms', error)
      setTermsStatus('error')
      setTermsMessage(error.message ?? 'Unable to record acceptance right now.')
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

  const renderAuthPrompt = () => (
    <section className="portal-card">
      <h2>Access requires an account</h2>
      <p>
        Please <Link to="/sign-in">sign in</Link> or <Link to="/register">register</Link> to continue to the
        secure parent portal.
      </p>
    </section>
  )

  const renderProfileSection = () => (
    <section className="portal-card">
      <div className="portal-card-header">
        <h2>Your profile</h2>
        <button type="button" className="link-button" onClick={refreshProfile}>
          Refresh
        </button>
      </div>
      <form className="profile-form" onSubmit={handleProfileSubmit}>
        <label htmlFor="profile-fullName">Full name</label>
        <input
          id="profile-fullName"
          name="fullName"
          type="text"
          defaultValue={profile?.full_name ?? ''}
          placeholder="Jane Doe"
        />

        <label htmlFor="profile-company">Organization / Program</label>
        <input
          id="profile-company"
          name="company"
          type="text"
          defaultValue={profile?.company ?? ''}
          placeholder="Parent Association"
        />

        <label htmlFor="profile-phone">Phone (optional)</label>
        <input
          id="profile-phone"
          name="phone"
          type="tel"
          defaultValue={profile?.phone ?? ''}
          placeholder="555-555-5555"
        />

        {profileError ? <p className="status-message error">{profileError}</p> : null}
        {profileStatus === 'success' ? (
          <p className="status-message success">Profile updated.</p>
        ) : null}

        <button type="submit" className="primary-button" disabled={profileStatus === 'loading'}>
          {profileStatus === 'loading' ? 'Saving…' : 'Save profile'}
        </button>
      </form>
    </section>
  )

  const renderNdaSection = () => (
    <section className="portal-card">
      <h2>Non-Circumvent NDA</h2>
      <p>{stageInfo.message}</p>

      <div className="action-row">
        <button
          type="button"
          className="secondary-button"
          onClick={handleDownloadNda}
          disabled={!compareStage(accessStage, 'nda_available') || ndaDownloadStatus === 'loading'}
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

  const renderTermsSection = () => (
    <section className="portal-card">
      <h2>Terms &amp; Conditions</h2>
      <p>
        Review the program terms and confirm acceptance. You must agree to the terms before accessing
        confidential documents.
      </p>

      {profile?.terms_agreed_at ? (
        <p className="meta">Accepted on {new Date(profile.terms_agreed_at).toLocaleString()}</p>
      ) : (
        <button
          type="button"
          className="primary-button"
          onClick={handleAcceptTerms}
          disabled={termsStatus === 'loading'}
        >
          {termsStatus === 'loading' ? 'Recording…' : 'I agree to the terms'}
        </button>
      )}

      {termsMessage ? (
        <p className={`status-message ${termsStatus === 'error' ? 'error' : 'success'}`}>{termsMessage}</p>
      ) : null}
    </section>
  )

  const renderDocumentsSection = () => {
    if (!compareStage(accessStage, 'approved')) {
      return null
    }

    return (
      <section className="portal-card">
        <h2>Available documents</h2>
        <p>Download the latest resources. Each download is recorded for tracking purposes.</p>

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
    return (
      <section className="page portal-page">
        <header className="portal-header">
          <h1>Parent Portal</h1>
          <p>Secure resources are available after signing in.</p>
        </header>
        {renderAuthPrompt()}
      </section>
    )
  }

  return (
    <section className="page portal-page">
      <header className="portal-header">
        <div>
          <h1>Parent Portal</h1>
          <p>Manage your access, documents, and agreements.</p>
        </div>
        <div className="portal-header-actions">
          <span className={stageBadgeClass}>{stageInfo.label}</span>
          <button type="button" className="link-button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </header>

      <div className="portal-grid">
        {renderProfileSection()}
        {renderTermsSection()}
        {renderNdaSection()}
        {renderDocumentsSection()}
      </div>
    </section>
  )
}
