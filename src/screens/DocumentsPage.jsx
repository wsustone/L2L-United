import { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider.jsx'
import { documentsApi } from '../lib/documentsApi.js'

export default function DocumentsPage() {
  const { isAuthenticated, status } = useAuth()
  const [folders, setFolders] = useState([])
  const [files, setFiles] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateFolder, setShowCreateFolder] = useState(false)
  const [showUploadFile, setShowUploadFile] = useState(false)
  const [showShareFolder, setShowShareFolder] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [folderDescription, setFolderDescription] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [fileDescription, setFileDescription] = useState('')
  const [shareEmail, setShareEmail] = useState('')
  const [sharePermissions, setSharePermissions] = useState({ can_read: true, can_write: false, can_delete: false })
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (status === 'ready' && isAuthenticated) {
      loadFolders()
    }
  }, [status, isAuthenticated, currentFolder])

  const loadFolders = async () => {
    try {
      setLoading(true)
      setError('')
      const foldersData = await documentsApi.getFolders(currentFolder)
      setFolders(foldersData)
      
      if (currentFolder) {
        const folderData = await documentsApi.getFolder(currentFolder)
        const filesData = await documentsApi.getFiles(currentFolder)
        setFiles(filesData)
        updateBreadcrumbs(folderData.path)
      } else {
        setFiles([])
        setBreadcrumbs([])
      }
    } catch (err) {
      console.error('Failed to load folders:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateBreadcrumbs = (path) => {
    if (!path) {
      setBreadcrumbs([])
      return
    }
    const parts = path.split('/')
    const crumbs = parts.map((part, index) => ({
      name: part,
      path: parts.slice(0, index + 1).join('/')
    }))
    setBreadcrumbs(crumbs)
  }

  const handleFolderClick = (folderId) => {
    setCurrentFolder(folderId)
  }

  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      setCurrentFolder(null)
    } else {
      const targetFolder = folders.find(f => breadcrumbs[index] && f.name === breadcrumbs[index].name)
      if (targetFolder) {
        setCurrentFolder(targetFolder.id)
      }
    }
  }

  const handleCreateFolder = async (e) => {
    e.preventDefault()
    if (!folderName.trim()) return

    try {
      setActionLoading(true)
      setError('')
      await documentsApi.createFolder(folderName, folderDescription, currentFolder)
      setFolderName('')
      setFolderDescription('')
      setShowCreateFolder(false)
      await loadFolders()
    } catch (err) {
      console.error('Failed to create folder:', err)
      setError(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    if (!uploadFile || !currentFolder) return

    try {
      setActionLoading(true)
      setError('')
      await documentsApi.uploadFile(currentFolder, uploadFile, {
        description: fileDescription
      })
      setUploadFile(null)
      setFileDescription('')
      setShowUploadFile(false)
      await loadFolders()
    } catch (err) {
      console.error('Failed to upload file:', err)
      setError(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleFileDownload = async (fileId, fileName) => {
    try {
      setError('')
      const { downloadUrl } = await documentsApi.getFileDownloadUrl(fileId)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Failed to download file:', err)
      setError(err.message)
    }
  }

  const handleDeleteFile = async (fileId) => {
    if (!confirm('Are you sure you want to delete this file?')) return

    try {
      setError('')
      await documentsApi.deleteFile(fileId)
      await loadFolders()
    } catch (err) {
      console.error('Failed to delete file:', err)
      setError(err.message)
    }
  }

  const handleDeleteFolder = async (folderId) => {
    if (!confirm('Are you sure you want to delete this folder? This will also delete all files inside.')) return

    try {
      setError('')
      await documentsApi.deleteFolder(folderId)
      await loadFolders()
    } catch (err) {
      console.error('Failed to delete folder:', err)
      setError(err.message)
    }
  }

  const handleShareFolder = async (e) => {
    e.preventDefault()
    if (!shareEmail.trim() || !currentFolder) return

    try {
      setActionLoading(true)
      setError('')
      await documentsApi.shareFolderWithUser(currentFolder, shareEmail, sharePermissions)
      setShareEmail('')
      setSharePermissions({ can_read: true, can_write: false, can_delete: false })
      setShowShareFolder(false)
      alert('Folder shared successfully!')
    } catch (err) {
      console.error('Failed to share folder:', err)
      setError(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (status === 'loading') {
    return (
      <div className="documents-page">
        <div className="loading-state">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="documents-page">
        <div className="auth-required">
          <h2>Authentication Required</h2>
          <p>Please sign in to access the document library.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="documents-page">
      <div className="documents-header">
        <h1>Team Documents</h1>
        <p>Secure document sharing and collaboration</p>
      </div>

      <div className="documents-toolbar">
        <div className="breadcrumbs">
          <button onClick={() => handleBreadcrumbClick(-1)} className="breadcrumb-link">
            Home
          </button>
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <span className="breadcrumb-separator">/</span>
              <button onClick={() => handleBreadcrumbClick(index)} className="breadcrumb-link">
                {crumb.name}
              </button>
            </span>
          ))}
        </div>

        <div className="toolbar-actions">
          <button onClick={() => setShowCreateFolder(true)} className="toolbar-button">
            + New Folder
          </button>
          {currentFolder && (
            <>
              <button onClick={() => setShowUploadFile(true)} className="toolbar-button">
                ↑ Upload File
              </button>
              <button onClick={() => setShowShareFolder(true)} className="toolbar-button">
                Share Folder
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state">Loading folders...</div>
      ) : (
        <div className="documents-content">
          {folders.length === 0 && files.length === 0 ? (
            <div className="empty-state">
              <p>No folders or files yet. Create a folder to get started.</p>
            </div>
          ) : (
            <>
              {folders.length > 0 && (
                <div className="folders-section">
                  <h3>Folders</h3>
                  <div className="folders-grid">
                    {folders.map((folder) => (
                      <div key={folder.id} className="folder-card">
                        <div className="folder-icon">📁</div>
                        <div className="folder-info">
                          <button
                            onClick={() => handleFolderClick(folder.id)}
                            className="folder-name"
                          >
                            {folder.name}
                          </button>
                          {folder.description && (
                            <p className="folder-description">{folder.description}</p>
                          )}
                          <p className="folder-meta">
                            Created {formatDate(folder.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteFolder(folder.id)}
                          className="delete-button"
                          title="Delete folder"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {files.length > 0 && (
                <div className="files-section">
                  <h3>Files</h3>
                  <div className="files-list">
                    {files.map((file) => (
                      <div key={file.id} className="file-row">
                        <div className="file-icon">📄</div>
                        <div className="file-info">
                          <div className="file-name">{file.name}</div>
                          {file.description && (
                            <div className="file-description">{file.description}</div>
                          )}
                          <div className="file-meta">
                            {formatFileSize(file.file_size)} • {formatDate(file.created_at)}
                          </div>
                        </div>
                        <div className="file-actions">
                          <button
                            onClick={() => handleFileDownload(file.id, file.name)}
                            className="action-button"
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDeleteFile(file.id)}
                            className="action-button delete"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {showCreateFolder && (
        <div className="modal-overlay" onClick={() => setShowCreateFolder(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Folder</h2>
            <form onSubmit={handleCreateFolder}>
              <label htmlFor="folder-name">Folder Name</label>
              <input
                id="folder-name"
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
                required
              />

              <label htmlFor="folder-description">Description (optional)</label>
              <textarea
                id="folder-description"
                value={folderDescription}
                onChange={(e) => setFolderDescription(e.target.value)}
                placeholder="Enter folder description"
                rows="3"
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateFolder(false)} className="secondary-button">
                  Cancel
                </button>
                <button type="submit" className="primary-button" disabled={actionLoading}>
                  {actionLoading ? 'Creating...' : 'Create Folder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUploadFile && (
        <div className="modal-overlay" onClick={() => setShowUploadFile(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Upload File</h2>
            <form onSubmit={handleFileUpload}>
              <label htmlFor="file-upload">Select File</label>
              <input
                id="file-upload"
                type="file"
                onChange={(e) => setUploadFile(e.target.files[0])}
                required
              />

              <label htmlFor="file-description">Description (optional)</label>
              <textarea
                id="file-description"
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
                placeholder="Enter file description"
                rows="3"
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setShowUploadFile(false)} className="secondary-button">
                  Cancel
                </button>
                <button type="submit" className="primary-button" disabled={actionLoading || !uploadFile}>
                  {actionLoading ? 'Uploading...' : 'Upload File'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showShareFolder && (
        <div className="modal-overlay" onClick={() => setShowShareFolder(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Share Folder</h2>
            <form onSubmit={handleShareFolder}>
              <label htmlFor="share-email">User Email</label>
              <input
                id="share-email"
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="Enter user email"
                required
              />

              <div className="permissions-group">
                <label>Permissions</label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={sharePermissions.can_read}
                      onChange={(e) => setSharePermissions({ ...sharePermissions, can_read: e.target.checked })}
                    />
                    Can Read
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={sharePermissions.can_write}
                      onChange={(e) => setSharePermissions({ ...sharePermissions, can_write: e.target.checked })}
                    />
                    Can Write
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={sharePermissions.can_delete}
                      onChange={(e) => setSharePermissions({ ...sharePermissions, can_delete: e.target.checked })}
                    />
                    Can Delete
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setShowShareFolder(false)} className="secondary-button">
                  Cancel
                </button>
                <button type="submit" className="primary-button" disabled={actionLoading}>
                  {actionLoading ? 'Sharing...' : 'Share Folder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
