import { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider.jsx'
import { supabase } from '../lib/supabaseClient.js'

export default function ApiKeysPage() {
  const { isAuthenticated, status, session } = useAuth()
  const [apiKeys, setApiKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateKey, setShowCreateKey] = useState(false)
  const [keyName, setKeyName] = useState('')
  const [keyDescription, setKeyDescription] = useState('')
  const [expiresInDays, setExpiresInDays] = useState(90)
  const [newApiKey, setNewApiKey] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (status === 'ready' && isAuthenticated) {
      loadApiKeys()
    }
  }, [status, isAuthenticated])

  const getAuthHeaders = async () => {
    if (!session?.access_token) {
      throw new Error('Not authenticated')
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    }
  }

  const loadApiKeys = async () => {
    try {
      setLoading(true)
      setError('')
      const headers = await getAuthHeaders()
      const response = await fetch('/.netlify/functions/api-keys', { headers })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch API keys')
      }
      
      const keys = await response.json()
      setApiKeys(keys)
    } catch (err) {
      console.error('Failed to load API keys:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateKey = async (e) => {
    e.preventDefault()
    if (!keyName.trim()) return

    try {
      setActionLoading(true)
      setError('')
      const headers = await getAuthHeaders()
      const response = await fetch('/.netlify/functions/api-keys', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: keyName,
          description: keyDescription,
          expires_in_days: expiresInDays > 0 ? expiresInDays : null
        })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create API key')
      }
      
      const result = await response.json()
      setNewApiKey(result.api_key)
      setKeyName('')
      setKeyDescription('')
      setExpiresInDays(90)
      await loadApiKeys()
    } catch (err) {
      console.error('Failed to create API key:', err)
      setError(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteKey = async (keyId) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return

    try {
      setError('')
      const headers = await getAuthHeaders()
      const response = await fetch(`/.netlify/functions/api-keys/${keyId}`, {
        method: 'DELETE',
        headers
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete API key')
      }
      
      await loadApiKeys()
    } catch (err) {
      console.error('Failed to delete API key:', err)
      setError(err.message)
    }
  }

  const handleToggleKey = async (keyId, isActive) => {
    try {
      setError('')
      const headers = await getAuthHeaders()
      const response = await fetch(`/.netlify/functions/api-keys/${keyId}/toggle`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ is_active: !isActive })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to toggle API key')
      }
      
      await loadApiKeys()
    } catch (err) {
      console.error('Failed to toggle API key:', err)
      setError(err.message)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('API key copied to clipboard!')
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const isExpired = (expiresAt) => {
    if (!expiresAt) return false
    return new Date(expiresAt) < new Date()
  }

  if (status === 'loading') {
    return (
      <div className="api-keys-page">
        <div className="loading-state">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="api-keys-page">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please sign in to manage API keys.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="api-keys-page">
      <div className="page-header">
        <h1>API Keys</h1>
        <p>Manage API keys for external application access</p>
      </div>

      <div className="page-toolbar">
        <button onClick={() => setShowCreateKey(true)} className="primary-button">
          + Create New API Key
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state">Loading API keys...</div>
      ) : (
        <div className="api-keys-content">
          {apiKeys.length === 0 ? (
            <div className="empty-state">
              <p>No API keys yet. Create one to allow external applications to access your documents.</p>
            </div>
          ) : (
            <div className="api-keys-list">
              {apiKeys.map((key) => (
                <div key={key.id} className={`api-key-card ${!key.is_active ? 'inactive' : ''} ${isExpired(key.expires_at) ? 'expired' : ''}`}>
                  <div className="api-key-header">
                    <h3>{key.name}</h3>
                    <div className="api-key-status">
                      {isExpired(key.expires_at) ? (
                        <span className="status-badge expired">Expired</span>
                      ) : key.is_active ? (
                        <span className="status-badge active">Active</span>
                      ) : (
                        <span className="status-badge inactive">Inactive</span>
                      )}
                    </div>
                  </div>
                  
                  {key.description && (
                    <p className="api-key-description">{key.description}</p>
                  )}
                  
                  <div className="api-key-meta">
                    <div className="meta-item">
                      <strong>Created:</strong> {formatDate(key.created_at)}
                    </div>
                    <div className="meta-item">
                      <strong>Last Used:</strong> {formatDate(key.last_used_at)}
                    </div>
                    <div className="meta-item">
                      <strong>Expires:</strong> {key.expires_at ? formatDate(key.expires_at) : 'Never'}
                    </div>
                  </div>
                  
                  <div className="api-key-actions">
                    <button
                      onClick={() => handleToggleKey(key.id, key.is_active)}
                      className="action-button"
                      disabled={isExpired(key.expires_at)}
                    >
                      {key.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="action-button delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showCreateKey && (
        <div className="modal-overlay" onClick={() => !newApiKey && setShowCreateKey(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {newApiKey ? (
              <>
                <h2>API Key Created Successfully</h2>
                <div className="success-message">
                  <p><strong>Important:</strong> Copy this API key now. You won't be able to see it again!</p>
                </div>
                
                <div className="api-key-display">
                  <code>{newApiKey}</code>
                  <button onClick={() => copyToClipboard(newApiKey)} className="copy-button">
                    Copy
                  </button>
                </div>
                
                <div className="modal-actions">
                  <button
                    onClick={() => {
                      setNewApiKey(null)
                      setShowCreateKey(false)
                    }}
                    className="primary-button"
                  >
                    Done
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>Create New API Key</h2>
                <form onSubmit={handleCreateKey}>
                  <label htmlFor="key-name">Key Name</label>
                  <input
                    id="key-name"
                    type="text"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder="e.g., Production App"
                    required
                  />

                  <label htmlFor="key-description">Description (optional)</label>
                  <textarea
                    id="key-description"
                    value={keyDescription}
                    onChange={(e) => setKeyDescription(e.target.value)}
                    placeholder="What will this key be used for?"
                    rows="3"
                  />

                  <label htmlFor="expires-in">Expires In (days)</label>
                  <input
                    id="expires-in"
                    type="number"
                    value={expiresInDays}
                    onChange={(e) => setExpiresInDays(parseInt(e.target.value))}
                    min="0"
                    placeholder="0 for no expiration"
                  />
                  <small>Set to 0 for no expiration</small>

                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowCreateKey(false)} className="secondary-button">
                      Cancel
                    </button>
                    <button type="submit" className="primary-button" disabled={actionLoading}>
                      {actionLoading ? 'Creating...' : 'Create API Key'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
