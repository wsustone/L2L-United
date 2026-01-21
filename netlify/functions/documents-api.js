import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[documents-api] Missing Supabase credentials')
}

const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null

const buildHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
})

const hashApiKey = (key) => {
  return crypto.createHash('sha256').update(key).digest('hex')
}

const authenticateRequest = async (event) => {
  const authHeader = event.headers?.authorization
  const apiKeyHeader = event.headers?.['x-api-key']

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    
    if (error || !user) {
      return { authenticated: false, error: 'Invalid token' }
    }
    
    return { authenticated: true, userId: user.id, authType: 'bearer' }
  }

  if (apiKeyHeader) {
    const keyHash = hashApiKey(apiKeyHeader)
    
    const { data: apiKey, error } = await supabaseAdmin
      .from('api_keys')
      .select('user_id, is_active, expires_at')
      .eq('key_hash', keyHash)
      .single()
    
    if (error || !apiKey) {
      return { authenticated: false, error: 'Invalid API key' }
    }
    
    if (!apiKey.is_active) {
      return { authenticated: false, error: 'API key is inactive' }
    }
    
    if (apiKey.expires_at && new Date(apiKey.expires_at) < new Date()) {
      return { authenticated: false, error: 'API key has expired' }
    }

    await supabaseAdmin
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('key_hash', keyHash)
    
    return { authenticated: true, userId: apiKey.user_id, authType: 'apikey' }
  }

  return { authenticated: false, error: 'No authentication provided' }
}

const handleGetFolders = async (userId, queryParams) => {
  const parentId = queryParams.parent_id || null
  
  let query = supabaseAdmin
    .from('folders')
    .select('id, name, description, parent_id, created_at, updated_at')
    .eq('is_active', true)

  if (parentId) {
    query = query.eq('parent_id', parentId)
  } else {
    query = query.is('parent_id', null)
  }

  const { data: folders, error } = await query

  if (error) {
    throw new Error(`Failed to fetch folders: ${error.message}`)
  }

  const accessibleFolders = []
  for (const folder of folders) {
    const { data: hasAccess } = await supabaseAdmin.rpc('user_has_folder_access', {
      folder_id: folder.id,
      user_id: userId,
      permission_type: 'read'
    })
    
    if (hasAccess) {
      accessibleFolders.push(folder)
    }
  }

  return accessibleFolders
}

const handleGetFolder = async (userId, folderId) => {
  const { data: hasAccess } = await supabaseAdmin.rpc('user_has_folder_access', {
    folder_id: folderId,
    user_id: userId,
    permission_type: 'read'
  })

  if (!hasAccess) {
    throw new Error('Access denied to this folder')
  }

  const { data: folder, error } = await supabaseAdmin
    .from('folders')
    .select('id, name, description, parent_id, created_at, updated_at')
    .eq('id', folderId)
    .eq('is_active', true)
    .single()

  if (error) {
    throw new Error(`Folder not found: ${error.message}`)
  }

  const { data: path } = await supabaseAdmin.rpc('get_folder_path', {
    folder_id: folderId
  })

  return { ...folder, path }
}

const handleGetFiles = async (userId, folderId) => {
  const { data: hasAccess } = await supabaseAdmin.rpc('user_has_folder_access', {
    folder_id: folderId,
    user_id: userId,
    permission_type: 'read'
  })

  if (!hasAccess) {
    throw new Error('Access denied to this folder')
  }

  const { data: files, error } = await supabaseAdmin
    .from('files')
    .select('id, name, description, file_path, file_size, mime_type, created_at, updated_at')
    .eq('folder_id', folderId)
    .eq('is_active', true)
    .order('name')

  if (error) {
    throw new Error(`Failed to fetch files: ${error.message}`)
  }

  return files
}

const handleGetFileDownloadUrl = async (userId, fileId) => {
  const { data: file, error: fileError } = await supabaseAdmin
    .from('files')
    .select('folder_id, file_path')
    .eq('id', fileId)
    .eq('is_active', true)
    .single()

  if (fileError || !file) {
    throw new Error('File not found')
  }

  const { data: hasAccess } = await supabaseAdmin.rpc('user_has_folder_access', {
    folder_id: file.folder_id,
    user_id: userId,
    permission_type: 'read'
  })

  if (!hasAccess) {
    throw new Error('Access denied to this file')
  }

  const { data: signedUrl, error: urlError } = await supabaseAdmin
    .storage
    .from('documents')
    .createSignedUrl(file.file_path, 3600)

  if (urlError) {
    throw new Error(`Failed to generate download URL: ${urlError.message}`)
  }

  return { downloadUrl: signedUrl.signedUrl, expiresIn: 3600 }
}

const handleCreateFolder = async (userId, body) => {
  const { name, description, parent_id } = body

  if (!name) {
    throw new Error('Folder name is required')
  }

  if (parent_id) {
    const { data: hasAccess } = await supabaseAdmin.rpc('user_has_folder_access', {
      folder_id: parent_id,
      user_id: userId,
      permission_type: 'write'
    })

    if (!hasAccess) {
      throw new Error('Access denied to parent folder')
    }
  }

  const { data: existingFolder } = await supabaseAdmin
    .from('folders')
    .select('id, name')
    .eq('name', name)
    .eq('parent_id', parent_id || null)
    .eq('is_active', true)
    .maybeSingle()

  if (existingFolder) {
    return existingFolder
  }

  const { data: folder, error } = await supabaseAdmin
    .from('folders')
    .insert({
      name,
      description,
      parent_id: parent_id || null,
      created_by: userId
    })
    .select()
    .single()

  if (error) {
    throw new Error(`Failed to create folder: ${error.message}`)
  }

  return folder
}

const handleDeleteFolder = async (userId, folderId) => {
  if (!folderId) {
    throw new Error('Folder ID is required')
  }

  const { data: hasAccess } = await supabaseAdmin.rpc('user_has_folder_access', {
    folder_id: folderId,
    user_id: userId,
    permission_type: 'delete'
  })

  if (!hasAccess) {
    throw new Error('Access denied: You do not have delete permission for this folder')
  }

  const { error } = await supabaseAdmin
    .from('folders')
    .update({ is_active: false })
    .eq('id', folderId)

  if (error) {
    throw new Error(`Failed to delete folder: ${error.message}`)
  }

  return { success: true, message: 'Folder deleted successfully' }
}

const MAX_FILE_SIZE = 100 * 1024 * 1024

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'application/zip',
  'application/x-zip-compressed',
  'application/json',
  'text/markdown'
]

const BLOCKED_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.com', '.scr', '.vbs', '.js', '.jar',
  '.msi', '.app', '.deb', '.rpm', '.dmg', '.pkg', '.sh', '.ps1'
]

const validateFile = (fileName, fileSize, mimeType) => {
  if (!fileName || fileName.trim() === '') {
    throw new Error('File name is required')
  }

  const fileExt = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
  if (BLOCKED_EXTENSIONS.includes(fileExt)) {
    throw new Error(`File type ${fileExt} is not allowed for security reasons`)
  }

  if (fileSize > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`)
  }

  if (mimeType && !ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new Error(`File type ${mimeType} is not allowed. Please upload documents, images, or archives only.`)
  }

  const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_')
  if (sanitizedName !== fileName) {
    console.warn(`[documents-api] File name sanitized from "${fileName}" to "${sanitizedName}"`)
  }

  return sanitizedName
}

const handleUploadFile = async (userId, folderId, body) => {
  if (!folderId) {
    throw new Error('Folder ID is required')
  }

  const { data: hasAccess } = await supabaseAdmin.rpc('user_has_folder_access', {
    folder_id: folderId,
    user_id: userId,
    permission_type: 'write'
  })

  if (!hasAccess) {
    throw new Error('Access denied: You do not have write permission for this folder')
  }

  const { file_name, file_data, file_size, mime_type, description } = body

  if (!file_name || !file_data) {
    throw new Error('File name and file data are required')
  }

  const sanitizedFileName = validateFile(file_name, file_size || 0, mime_type)

  const { data: existingFile } = await supabaseAdmin
    .from('files')
    .select('id, name, file_path')
    .eq('folder_id', folderId)
    .eq('name', sanitizedFileName)
    .eq('is_active', true)
    .maybeSingle()

  if (existingFile) {
    return {
      ...existingFile,
      message: 'File with this name already exists in folder',
      skipped: true
    }
  }

  let fileBuffer
  try {
    fileBuffer = Buffer.from(file_data, 'base64')
  } catch (error) {
    throw new Error('Invalid file data: must be base64 encoded')
  }

  const actualFileSize = fileBuffer.length
  if (actualFileSize > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`)
  }

  const fileExt = sanitizedFileName.substring(sanitizedFileName.lastIndexOf('.'))
  const fileId = crypto.randomUUID()
  const filePath = `${folderId}/${fileId}${fileExt}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('documents')
    .upload(filePath, fileBuffer, {
      contentType: mime_type || 'application/octet-stream',
      upsert: false
    })

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`)
  }

  const { data: fileRecord, error: dbError } = await supabaseAdmin
    .from('files')
    .insert({
      folder_id: folderId,
      name: sanitizedFileName,
      description: description || '',
      file_path: filePath,
      file_size: actualFileSize,
      mime_type: mime_type || 'application/octet-stream',
      uploaded_by: userId
    })
    .select()
    .single()

  if (dbError) {
    await supabaseAdmin.storage.from('documents').remove([filePath])
    throw new Error(`Failed to save file metadata: ${dbError.message}`)
  }

  return {
    ...fileRecord,
    message: 'File uploaded successfully'
  }
}

export const handler = async (event) => {
  const origin = event.headers?.origin
  const headers = buildHeaders(origin)

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers }
  }

  try {
    if (!supabaseAdmin) {
      throw new Error('Supabase is not configured')
    }

    const auth = await authenticateRequest(event)
    
    if (!auth.authenticated) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: auth.error || 'Unauthorized' })
      }
    }

    const path = event.path.replace('/.netlify/functions/documents-api', '')
    const pathParts = path.split('/').filter(p => p)
    const method = event.httpMethod
    const queryParams = event.queryStringParameters || {}
    const body = event.body ? JSON.parse(event.body) : {}

    let result

    if (method === 'GET' && pathParts.length === 0) {
      result = await handleGetFolders(auth.userId, queryParams)
    } else if (method === 'GET' && pathParts[0] === 'folders' && pathParts.length === 1) {
      result = await handleGetFolders(auth.userId, queryParams)
    } else if (method === 'GET' && pathParts[0] === 'folders' && pathParts.length === 2) {
      result = await handleGetFolder(auth.userId, pathParts[1])
    } else if (method === 'GET' && pathParts[0] === 'folders' && pathParts[2] === 'files') {
      result = await handleGetFiles(auth.userId, pathParts[1])
    } else if (method === 'GET' && pathParts[0] === 'files' && pathParts[2] === 'download') {
      result = await handleGetFileDownloadUrl(auth.userId, pathParts[1])
    } else if (method === 'POST' && pathParts[0] === 'folders' && pathParts.length === 1) {
      result = await handleCreateFolder(auth.userId, body)
    } else if (method === 'POST' && pathParts[0] === 'folders' && pathParts[2] === 'upload') {
      result = await handleUploadFile(auth.userId, pathParts[1], body)
    } else if (method === 'DELETE' && pathParts[0] === 'folders' && pathParts.length === 2) {
      result = await handleDeleteFolder(auth.userId, pathParts[1])
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Endpoint not found' })
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    }

  } catch (error) {
    console.error('[documents-api] error:', error)
    
    const statusCode = error.message.includes('Access denied') ? 403 :
                      error.message.includes('not found') ? 404 : 500

    return {
      statusCode,
      headers,
      body: JSON.stringify({ error: error.message })
    }
  }
}
