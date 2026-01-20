import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[api-keys] Missing Supabase credentials')
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
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
})

const generateApiKey = () => {
  return 'l2l_' + crypto.randomBytes(32).toString('hex')
}

const hashApiKey = (key) => {
  return crypto.createHash('sha256').update(key).digest('hex')
}

const authenticateUser = async (event) => {
  const authHeader = event.headers?.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { authenticated: false, error: 'No authentication token provided' }
  }
  
  const token = authHeader.substring(7)
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  
  if (error || !user) {
    return { authenticated: false, error: 'Invalid token' }
  }
  
  return { authenticated: true, userId: user.id }
}

const handleListApiKeys = async (userId) => {
  const { data: keys, error } = await supabaseAdmin
    .from('api_keys')
    .select('id, name, description, last_used_at, created_at, expires_at, is_active')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch API keys: ${error.message}`)
  }

  return keys
}

const handleCreateApiKey = async (userId, body) => {
  const { name, description, expires_in_days } = body

  if (!name) {
    throw new Error('API key name is required')
  }

  const apiKey = generateApiKey()
  const keyHash = hashApiKey(apiKey)

  let expiresAt = null
  if (expires_in_days && expires_in_days > 0) {
    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + expires_in_days)
    expiresAt = expireDate.toISOString()
  }

  const { data: newKey, error } = await supabaseAdmin
    .from('api_keys')
    .insert({
      user_id: userId,
      key_hash: keyHash,
      name,
      description,
      expires_at: expiresAt
    })
    .select('id, name, description, created_at, expires_at, is_active')
    .single()

  if (error) {
    throw new Error(`Failed to create API key: ${error.message}`)
  }

  return {
    ...newKey,
    api_key: apiKey,
    warning: 'Save this API key now. You will not be able to see it again.'
  }
}

const handleDeleteApiKey = async (userId, keyId) => {
  const { data: key, error: fetchError } = await supabaseAdmin
    .from('api_keys')
    .select('user_id')
    .eq('id', keyId)
    .single()

  if (fetchError || !key) {
    throw new Error('API key not found')
  }

  if (key.user_id !== userId) {
    throw new Error('Access denied')
  }

  const { error } = await supabaseAdmin
    .from('api_keys')
    .delete()
    .eq('id', keyId)

  if (error) {
    throw new Error(`Failed to delete API key: ${error.message}`)
  }

  return { success: true, message: 'API key deleted' }
}

const handleToggleApiKey = async (userId, keyId, body) => {
  const { is_active } = body

  if (typeof is_active !== 'boolean') {
    throw new Error('is_active must be a boolean')
  }

  const { data: key, error: fetchError } = await supabaseAdmin
    .from('api_keys')
    .select('user_id')
    .eq('id', keyId)
    .single()

  if (fetchError || !key) {
    throw new Error('API key not found')
  }

  if (key.user_id !== userId) {
    throw new Error('Access denied')
  }

  const { data: updatedKey, error } = await supabaseAdmin
    .from('api_keys')
    .update({ is_active })
    .eq('id', keyId)
    .select('id, name, description, last_used_at, created_at, expires_at, is_active')
    .single()

  if (error) {
    throw new Error(`Failed to update API key: ${error.message}`)
  }

  return updatedKey
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

    const auth = await authenticateUser(event)
    
    if (!auth.authenticated) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: auth.error || 'Unauthorized' })
      }
    }

    const path = event.path.replace('/.netlify/functions/api-keys', '')
    const pathParts = path.split('/').filter(p => p)
    const method = event.httpMethod
    const body = event.body ? JSON.parse(event.body) : {}

    let result

    if (method === 'GET' && pathParts.length === 0) {
      result = await handleListApiKeys(auth.userId)
    } else if (method === 'POST' && pathParts.length === 0) {
      result = await handleCreateApiKey(auth.userId, body)
    } else if (method === 'DELETE' && pathParts.length === 1) {
      result = await handleDeleteApiKey(auth.userId, pathParts[0])
    } else if (method === 'POST' && pathParts.length === 2 && pathParts[1] === 'toggle') {
      result = await handleToggleApiKey(auth.userId, pathParts[0], body)
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
    console.error('[api-keys] error:', error)
    
    const statusCode = error.message.includes('Access denied') ? 403 :
                      error.message.includes('not found') ? 404 : 500

    return {
      statusCode,
      headers,
      body: JSON.stringify({ error: error.message })
    }
  }
}
