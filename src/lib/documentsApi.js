import { supabase } from './supabaseClient.js'

export class DocumentsAPI {
  constructor() {
    this.baseUrl = '/.netlify/functions/documents-api'
  }

  async getAuthHeaders() {
    if (!supabase) {
      throw new Error('Supabase is not configured')
    }

    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.access_token) {
      throw new Error('Not authenticated')
    }

    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    }
  }

  async getFolders(parentId = null) {
    const headers = await this.getAuthHeaders()
    const url = parentId 
      ? `${this.baseUrl}/folders?parent_id=${parentId}`
      : `${this.baseUrl}/folders`
    
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch folders')
    }
    
    return response.json()
  }

  async getFolder(folderId) {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${this.baseUrl}/folders/${folderId}`, { headers })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch folder')
    }
    
    return response.json()
  }

  async createFolder(name, description = '', parentId = null) {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${this.baseUrl}/folders`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name, description, parent_id: parentId })
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create folder')
    }
    
    return response.json()
  }

  async getFiles(folderId) {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${this.baseUrl}/folders/${folderId}/files`, { headers })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to fetch files')
    }
    
    return response.json()
  }

  async getFileDownloadUrl(fileId) {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${this.baseUrl}/files/${fileId}/download`, { headers })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to get download URL')
    }
    
    return response.json()
  }

  async uploadFile(folderId, file, metadata = {}) {
    if (!supabase) {
      throw new Error('Supabase is not configured')
    }

    const headers = await this.getAuthHeaders()
    const fileBuffer = await file.arrayBuffer()
    const base64Data = this.arrayBufferToBase64(fileBuffer)

    const response = await fetch(`${this.baseUrl}/folders/${folderId}/upload`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        file_name: metadata.name || file.name,
        description: metadata.description || '',
        file_size: file.size,
        mime_type: file.type || 'application/octet-stream',
        file_data: base64Data
      })
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }))
      throw new Error(error.error || 'Upload failed')
    }

    return response.json()
  }

  arrayBufferToBase64(buffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const chunkSize = 0x8000

    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize)
      binary += String.fromCharCode(...chunk)
    }

    return btoa(binary)
  }

  async deleteFile(fileId) {
    if (!supabase) {
      throw new Error('Supabase is not configured')
    }

    const headers = await this.getAuthHeaders()
    const response = await fetch(`${this.baseUrl}/files/${fileId}`, {
      method: 'DELETE',
      headers
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete file' }))
      throw new Error(error.error || 'Failed to delete file')
    }

    return response.json()
  }

  async deleteFolder(folderId) {
    const headers = await this.getAuthHeaders()
    const response = await fetch(`${this.baseUrl}/folders/${folderId}`, {
      method: 'DELETE',
      headers
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete folder')
    }
    
    return response.json()
  }

  async shareFolderWithUser(folderId, userEmail, permissions = { can_read: true, can_write: false, can_delete: false }) {
    if (!supabase) {
      throw new Error('Supabase is not configured')
    }

    const { data: user, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', userEmail)
      .single()

    if (userError || !user) {
      throw new Error('User not found')
    }

    const currentUser = (await supabase.auth.getUser()).data.user

    const { data: permission, error } = await supabase
      .from('folder_permissions')
      .insert({
        folder_id: folderId,
        user_id: user.id,
        can_read: permissions.can_read,
        can_write: permissions.can_write,
        can_delete: permissions.can_delete,
        granted_by: currentUser.id
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to share folder: ${error.message}`)
    }

    return permission
  }

  async getFolderPermissions(folderId) {
    if (!supabase) {
      throw new Error('Supabase is not configured')
    }

    const { data: permissions, error } = await supabase
      .from('folder_permissions')
      .select(`
        id,
        user_id,
        can_read,
        can_write,
        can_delete,
        granted_at,
        profiles:user_id (email, full_name)
      `)
      .eq('folder_id', folderId)

    if (error) {
      throw new Error(`Failed to fetch permissions: ${error.message}`)
    }

    return permissions
  }

  async removeFolderPermission(permissionId) {
    if (!supabase) {
      throw new Error('Supabase is not configured')
    }

    const { error } = await supabase
      .from('folder_permissions')
      .delete()
      .eq('id', permissionId)

    if (error) {
      throw new Error(`Failed to remove permission: ${error.message}`)
    }

    return { success: true }
  }
}

export const documentsApi = new DocumentsAPI()
