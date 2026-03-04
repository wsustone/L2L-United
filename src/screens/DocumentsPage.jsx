import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../providers/AuthProvider.jsx'
import { documentsApi } from '../lib/documentsApi.js'

const OFFICE_MIME_TYPES = new Set([
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-powerpoint',
])

const getOfficeUriScheme = (mimeType, url) => {
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/msword'
  ) {
    return `ms-word:ofe|u|${url}`
  }
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    mimeType === 'application/vnd.ms-excel'
  ) {
    return `ms-excel:ofe|u|${url}`
  }
  if (
    mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    mimeType === 'application/vnd.ms-powerpoint'
  ) {
    return `ms-powerpoint:ofe|u|${url}`
  }
  return null
}

const EDITABLE_MIME_TYPES = new Set([
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'text/plain',
  'text/csv',
  'text/markdown',
  'application/json',
])

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
  const [uploadFiles, setUploadFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [fileDescription, setFileDescription] = useState('')
  const [uploadStatus, setUploadStatus] = useState({})
  const [shareEmail, setShareEmail] = useState('')
  const [sharePermissions, setSharePermissions] = useState({ can_read: true, can_write: false, can_delete: false })
  const [actionLoading, setActionLoading] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [editingFile, setEditingFile] = useState(null)
  const [editorContent, setEditorContent] = useState(null)
  const [editorContentType, setEditorContentType] = useState(null)
  const [editorLoading, setEditorLoading] = useState(false)
  const [editorSaving, setEditorSaving] = useState(false)
  const [activeSheetIdx, setActiveSheetIdx] = useState(0)
  const wordEditorRef = useRef(null)

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

  const generateFileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`

  const handleFileSelection = (fileList) => {
    if (!fileList?.length) return

    setUploadFiles((prev) => {
      const existingKeys = new Set(prev.map(generateFileKey))
      const newFiles = []

      Array.from(fileList).forEach((file) => {
        const key = generateFileKey(file)
        if (!existingKeys.has(key)) {
          existingKeys.add(key)
          newFiles.push(file)
        }
      })

      if (!newFiles.length) {
        return prev
      }

      setUploadStatus((status) => {
        const updatedStatus = { ...status }
        newFiles.forEach((file) => {
          const key = generateFileKey(file)
          updatedStatus[key] = {
            state: 'pending',
            progress: 0,
            error: null
          }
        })
        return updatedStatus
      })

      return [...prev, ...newFiles]
    })
  }

  const handleFileInputChange = (e) => {
    handleFileSelection(e.target.files)
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!dragActive) {
      setDragActive(true)
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target === e.currentTarget) {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFileSelection(e.dataTransfer.files)
  }

  const handleRemoveFile = (index) => {
    setUploadFiles((prev) => {
      const fileToRemove = prev[index]
      const next = prev.filter((_, i) => i !== index)
      if (fileToRemove) {
        const key = generateFileKey(fileToRemove)
        setUploadStatus((status) => {
          const { [key]: _, ...rest } = status
          return rest
        })
      }
      return next
    })
  }

  const handleClearFiles = () => {
    setUploadFiles([])
    setUploadStatus({})
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    if (!uploadFiles.length || !currentFolder) return

    try {
      setActionLoading(true)
      setError('')
      const failedUploads = []
      const successfulUploads = []

      for (const file of uploadFiles) {
        const key = generateFileKey(file)
        setUploadStatus((status) => ({
          ...status,
          [key]: {
            state: 'uploading',
            progress: 5,
            error: null
          }
        }))

        try {
          await documentsApi.uploadFile(currentFolder, file, {
            description: fileDescription
          })
          successfulUploads.push(file.name)
          setUploadStatus((status) => ({
            ...status,
            [key]: {
              state: 'success',
              progress: 100,
              error: null
            }
          }))
        } catch (err) {
          console.error(`Failed to upload file ${file.name}:`, err)
          failedUploads.push({ name: file.name, message: err.message })
          setUploadStatus((status) => ({
            ...status,
            [key]: {
              state: 'error',
              progress: 0,
              error: err.message
            }
          }))
        }
      }

      if (successfulUploads.length > 0) {
        await loadFolders()
      }

      if (failedUploads.length > 0) {
        setUploadFiles((prev) => prev.filter((file) => failedUploads.some((failed) => failed.name === file.name)))
        const failureMessages = failedUploads
          .map((failure) => `${failure.name}: ${failure.message}`)
          .join('\n')
        setError(`Some files failed to upload:\n${failureMessages}`)
      } else {
        setShowUploadFile(false)
        setUploadFiles([])
        setFileDescription('')
        setUploadStatus({})
      }
    } catch (err) {
      console.error('Failed to upload files:', err)
      setError(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleOpenInOffice = async (fileId, mimeType) => {
    try {
      setError('')
      const { downloadUrl } = await documentsApi.getFileDownloadUrl(fileId)
      const uri = getOfficeUriScheme(mimeType, downloadUrl)
      if (uri) {
        window.location.href = uri
      }
    } catch (err) {
      console.error('Failed to open in Office:', err)
      setError(err.message)
    }
  }

  const handleViewOnline = async (fileId) => {
    try {
      setError('')
      const { downloadUrl } = await documentsApi.getFileDownloadUrl(fileId)
      const viewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(downloadUrl)}`
      window.open(viewerUrl, '_blank', 'noopener,noreferrer')
    } catch (err) {
      console.error('Failed to open Office Online viewer:', err)
      setError(err.message)
    }
  }

  const handleFileEdit = async (file) => {
    try {
      setEditorLoading(true)
      setEditingFile(file)
      setShowEditor(true)
      setEditorContent(null)
      setEditorContentType(null)
      setActiveSheetIdx(0)
      setError('')
      const result = await documentsApi.getFileContent(file.id)
      setEditorContent(result.content)
      setEditorContentType(result.contentType)
    } catch (err) {
      console.error('Failed to load file for editing:', err)
      setError(err.message)
      setShowEditor(false)
      setEditingFile(null)
    } finally {
      setEditorLoading(false)
    }
  }

  const handleEditorSave = async () => {
    if (!editingFile) return
    let content = editorContent
    if (editorContentType === 'html' && wordEditorRef.current) {
      content = wordEditorRef.current.innerHTML
    }
    try {
      setEditorSaving(true)
      setError('')
      await documentsApi.updateFileContent(editingFile.id, content)
      setShowEditor(false)
      setEditingFile(null)
      setEditorContent(null)
      setEditorContentType(null)
    } catch (err) {
      console.error('Failed to save file:', err)
      setError(err.message)
    } finally {
      setEditorSaving(false)
    }
  }

  const handleFileOpen = async (fileId) => {
    try {
      setError('')
      const { downloadUrl } = await documentsApi.getFileDownloadUrl(fileId)
      window.open(downloadUrl, '_blank', 'noopener,noreferrer')
    } catch (err) {
      console.error('Failed to open file:', err)
      setError(err.message)
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
                    {folders.map((folder) => {
                      const childFolderCount = folder.child_folder_count ?? 0
                      const fileCount = folder.file_count ?? 0

                      return (
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
                              {childFolderCount} {childFolderCount === 1 ? 'folder' : 'folders'} • {fileCount}{' '}
                              {fileCount === 1 ? 'file' : 'files'}
                            </p>
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
                      )
                    })}
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
                          {OFFICE_MIME_TYPES.has(file.mime_type) && (
                            <>
                              <button
                                onClick={() => handleOpenInOffice(file.id, file.mime_type)}
                                className="action-button"
                                title="Open in locally installed Office application"
                              >
                                Open in Office
                              </button>
                              <button
                                onClick={() => handleViewOnline(file.id)}
                                className="action-button"
                                title="View in Microsoft Office Online (read-only)"
                              >
                                View Online
                              </button>
                            </>
                          )}
                          {EDITABLE_MIME_TYPES.has(file.mime_type) && (
                            <button
                              onClick={() => handleFileEdit(file)}
                              className="action-button"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleFileOpen(file.id)}
                            className="action-button"
                          >
                            Open
                          </button>
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
              <label htmlFor="file-upload">Select Files</label>
              <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileInputChange}
              />

              <div
                className={`upload-drop-zone${dragActive ? ' drag-active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <p className="drop-zone-title">Drag & Drop Files</p>
                <p className="drop-zone-subtitle">or click above to browse up to 20 files at a time.</p>
              </div>

              {uploadFiles.length > 0 && (
                <div className="upload-file-list">
                  <div className="upload-file-list-header">
                    <strong>Selected Files ({uploadFiles.length})</strong>
                    <button type="button" className="link-button" onClick={handleClearFiles}>
                      Clear All
                    </button>
                  </div>
                  <ul>
                    {uploadFiles.map((file, index) => {
                      const key = generateFileKey(file)
                      const status = uploadStatus[key] || { state: 'pending', progress: 0 }
                      return (
                        <li key={`${file.name}-${index}`}>
                          <div className="upload-file-list-details">
                            <div>
                              <span className="file-name">{file.name}</span>
                              <span className="file-meta">{formatFileSize(file.size)}</span>
                            </div>
                            <div className={`upload-status upload-status-${status.state}`}>
                              {status.state === 'pending' && 'Pending'}
                              {status.state === 'uploading' && 'Uploading...'}
                              {status.state === 'success' && 'Uploaded'}
                              {status.state === 'error' && (status.error || 'Failed')}
                            </div>
                            <div className="upload-progress-bar">
                              <div
                                className="upload-progress-bar-fill"
                                style={{ width: `${status.progress || 0}%` }}
                              />
                            </div>
                          </div>
                          {status.state !== 'uploading' && (
                            <button type="button" onClick={() => handleRemoveFile(index)}>
                              Remove
                            </button>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

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
                <button type="submit" className="primary-button" disabled={actionLoading || !uploadFiles.length}>
                  {actionLoading ? 'Uploading...' : `Upload ${uploadFiles.length > 1 ? 'Files' : 'File'}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditor && (
        <div className="modal-overlay" onClick={() => !editorSaving && setShowEditor(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: '95vw', width: '1100px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Edit: {editingFile?.name}</h2>
              <button onClick={() => setShowEditor(false)} className="secondary-button" disabled={editorSaving}>✕ Close</button>
            </div>

            {editorContentType === 'html' && (
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', color: '#888' }}>
                Note: Complex formatting (images, headers/footers) may not be preserved on save.
              </p>
            )}

            {editorLoading ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                Loading file content...
              </div>
            ) : (
              <>
                {editorContentType === 'text' && (
                  <textarea
                    value={editorContent || ''}
                    onChange={(e) => setEditorContent(e.target.value)}
                    style={{ flex: 1, resize: 'none', fontFamily: 'monospace', fontSize: '13px', padding: '0.75rem', minHeight: '400px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                )}

                {editorContentType === 'html' && (
                  <div
                    ref={(el) => {
                      wordEditorRef.current = el
                      if (el && editorContent !== null && el.innerHTML === '') {
                        el.innerHTML = editorContent
                      }
                    }}
                    contentEditable
                    suppressContentEditableWarning
                    style={{ flex: 1, overflow: 'auto', padding: '1.5rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '400px', lineHeight: '1.7', outline: 'none' }}
                  />
                )}

                {editorContentType === 'spreadsheet' && editorContent && (
                  <div style={{ flex: 1, overflow: 'auto' }}>
                    {editorContent.length > 1 && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <label style={{ marginRight: '0.5rem' }}>Sheet:</label>
                        <select value={activeSheetIdx} onChange={(e) => setActiveSheetIdx(Number(e.target.value))}>
                          {editorContent.map((sheet, i) => (
                            <option key={i} value={i}>{sheet.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    <table style={{ borderCollapse: 'collapse', fontSize: '13px', width: '100%' }}>
                      <tbody>
                        {(editorContent[activeSheetIdx]?.data || []).map((row, rowIdx) => (
                          <tr key={rowIdx}>
                            {row.map((cell, colIdx) => (
                              <td key={colIdx} style={{ border: '1px solid #ddd', padding: 0 }}>
                                <input
                                  type="text"
                                  value={String(cell)}
                                  onChange={(e) => {
                                    const val = e.target.value
                                    setEditorContent(prev => prev.map((sheet, si) =>
                                      si !== activeSheetIdx ? sheet : {
                                        ...sheet,
                                        data: sheet.data.map((r, ri) =>
                                          ri !== rowIdx ? r : r.map((c, ci) => ci !== colIdx ? c : val)
                                        )
                                      }
                                    ))
                                  }}
                                  style={{ border: 'none', padding: '3px 6px', width: '100%', minWidth: '90px', outline: 'none', fontFamily: 'inherit', fontSize: 'inherit' }}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="modal-actions" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <button
                    type="button"
                    onClick={() => setShowEditor(false)}
                    className="secondary-button"
                    disabled={editorSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleEditorSave}
                    className="primary-button"
                    disabled={editorSaving || editorLoading}
                  >
                    {editorSaving ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </>
            )}
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
