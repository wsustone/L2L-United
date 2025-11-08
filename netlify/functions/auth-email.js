/* global process */
import { createClient } from '@supabase/supabase-js'

const graphTenantId = process.env.GRAPH_TENANT_ID
const graphClientId = process.env.GRAPH_CLIENT_ID
const graphClientSecret = process.env.GRAPH_CLIENT_SECRET

if (!graphTenantId || !graphClientId || !graphClientSecret) {
  console.warn('[auth-email] Missing Microsoft Graph credentials. Auth emails will fail until configured.')
}

const senderAddress = process.env.GRAPH_SENDER_EMAIL ?? process.env.CONTACT_EMAIL_USER

const getAccessToken = async () => {
  if (!graphTenantId || !graphClientId || !graphClientSecret) {
    throw new Error('Microsoft Graph credentials are not fully configured.')
  }

  const tokenEndpoint = `https://login.microsoftonline.com/${graphTenantId}/oauth2/v2.0/token`
  const body = new URLSearchParams({
    client_id: graphClientId,
    client_secret: graphClientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  })

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Failed to retrieve Graph token: ${response.status} ${detail}`)
  }

  const data = await response.json()
  return data.access_token
}

const sendGraphMail = async ({ subject, htmlBody, textBody, replyTo, toAddress }) => {
  if (!senderAddress) {
    throw new Error('Graph sender address is not configured (GRAPH_SENDER_EMAIL or CONTACT_EMAIL_USER).')
  }

  const recipient = toAddress ?? senderAddress
  const fromAlias = process.env.GRAPH_FROM_ALIAS ?? senderAddress
  const accessToken = await getAccessToken()

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(senderAddress)}/sendMail`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        message: {
          subject,
          body: {
            contentType: 'HTML',
            content: htmlBody,
          },
          toRecipients: [
            {
              emailAddress: { address: recipient },
            },
          ],
          replyTo: replyTo
            ? [
                {
                  emailAddress: { address: replyTo },
                },
              ]
            : [],
          from: {
            emailAddress: { address: fromAlias },
          },
          sender: {
            emailAddress: { address: senderAddress },
          },
        },
        saveToSentItems: false,
      }),
    },
  )

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Graph sendMail failed: ${response.status} ${detail}`)
  }
}

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('[auth-email] Missing Supabase service credentials. Auth emails will fail until configured.')
}

const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null

const defaultRedirect = process.env.SUPABASE_DEFAULT_REDIRECT ?? 'https://www.l2lunited.com/portal'

const redirectOverrides = {
  signup: process.env.SUPABASE_REDIRECT_SIGNUP,
  invite: process.env.SUPABASE_REDIRECT_INVITE,
  recovery: process.env.SUPABASE_REDIRECT_RECOVERY,
  magiclink: process.env.SUPABASE_REDIRECT_MAGICLINK,
  reauthenticate: process.env.SUPABASE_REDIRECT_REAUTHENTICATE,
  email_change: process.env.SUPABASE_REDIRECT_EMAIL_CHANGE,
}

const buildHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
})

const actionMap = {
  signup: 'signup',
  invite: 'invite',
  recovery: 'recovery',
  magiclink: 'magiclink',
  reauthenticate: 'magiclink',
  email_change: 'email_change',
}

const resolveRedirect = (action, explicitRedirect, origin) => {
  if (explicitRedirect) return explicitRedirect
  const override = redirectOverrides[action]
  if (override) return override
  if (origin) {
    try {
      const url = new URL(origin)
      url.pathname = '/portal'
      url.hash = ''
      url.search = ''
      return url.toString()
    } catch (error) {
      console.warn('[auth-email] Unable to derive redirect from origin', error)
    }
  }
  return defaultRedirect
}

const buildEmailContent = (action, { email, newEmail, link }) => {
  switch (action) {
    case 'signup':
    case 'invite': {
      const subject = 'Complete your L2L United portal registration'
      const html = `
        <h2>Finish setting up your account</h2>
        <p>Hi ${email},</p>
        <p>Click the link below to confirm your email address and activate your L2L United portal account.</p>
        <p><a href="${link}">Activate your account</a></p>
        <p>The link is valid for 60 minutes and can be used once. If you didn’t request access, you can safely ignore this message.</p>
        <p>Need assistance? Email <a href="mailto:support@l2lunited.com">support@l2lunited.com</a>.</p>
        <p>— The L2L United Team</p>
      `
      const text = `Hi ${email},\n\nConfirm your L2L United portal account: ${link}\n\nThe link is valid for 60 minutes and can be used once. If you didn’t request access, ignore this message.\n\nNeed help? support@l2lunited.com\n\n— The L2L United Team`
      return { subject, htmlBody: html, textBody: text, toAddress: email }
    }
    case 'recovery': {
      const subject = 'Reset your L2L United password'
      const html = `
        <h2>Reset your L2L United password</h2>
        <p>Hi ${email},</p>
        <p>We received a request to reset the password for your L2L United portal account.</p>
        <p><a href="${link}">Reset your password</a></p>
        <p>The link is valid for 60 minutes and can be used once. If you didn’t make this request, you can safely ignore this message.</p>
        <p>Questions? Email <a href="mailto:support@l2lunited.com">support@l2lunited.com</a>.</p>
        <p>— The L2L United Team</p>
      `
      const text = `Hi ${email},\n\nReset your L2L United portal password: ${link}\n\nThe link is valid for 60 minutes and can be used once. If you didn’t make this request, ignore this message.\n\nNeed help? support@l2lunited.com\n\n— The L2L United Team`
      return { subject, htmlBody: html, textBody: text, toAddress: email }
    }
    case 'magiclink':
    case 'reauthenticate': {
      const subject = 'L2L United portal sign-in link'
      const html = `
        <h2>Confirm it’s you</h2>
        <p>Hi ${email},</p>
        <p>Use the link below to continue into the L2L United portal.</p>
        <p><a href="${link}">Continue to the portal</a></p>
        <p>The link is valid for 60 minutes and can be used once. If you didn’t initiate this request, you can ignore this email.</p>
        <p>Need assistance? Email <a href="mailto:support@l2lunited.com">support@l2lunited.com</a>.</p>
        <p>— The L2L United Team</p>
      `
      const text = `Hi ${email},\n\nContinue to the L2L United portal: ${link}\n\nThe link is valid for 60 minutes and can be used once. If you didn’t initiate this request, ignore this email.\n\nNeed help? support@l2lunited.com\n\n— The L2L United Team`
      return { subject, htmlBody: html, textBody: text, toAddress: email }
    }
    case 'email_change': {
      const target = newEmail ?? email
      const subject = 'Confirm your updated L2L United email'
      const html = `
        <h2>Confirm your new email</h2>
        <p>We received a request to change the email for your L2L United portal account.</p>
        <p>Current email: ${email}</p>
        <p>New email: ${target}</p>
        <p><a href="${link}">Confirm new email address</a></p>
        <p>If you didn’t request this change, contact <a href="mailto:support@l2lunited.com">support@l2lunited.com</a>.</p>
        <p>— The L2L United Team</p>
      `
      const text = `Confirm your new L2L United portal email:\nCurrent email: ${email}\nNew email: ${target}\nLink: ${link}\n\nIf you didn’t request this change, contact support@l2lunited.com.\n\n— The L2L United Team`
      return { subject, htmlBody: html, textBody: text, toAddress: target }
    }
    default:
      throw new Error(`Unsupported auth email action: ${action}`)
  }
}

export const handler = async (event) => {
  const origin = event.headers?.origin
  const headers = buildHeaders(origin)

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    }
  }

  try {
    if (!supabaseAdmin) {
      throw new Error('Supabase admin client is not configured.')
    }

    const body = JSON.parse(event.body ?? '{}')
    const { action, email, password, newEmail, redirectTo } = body

    if (!action || !actionMap[action]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid or missing "action" field.' }),
      }
    }

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Email is required.' }),
      }
    }

    if (action === 'email_change' && !newEmail) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'New email is required for email change requests.' }),
      }
    }

    const supabaseAction = actionMap[action]

    const payload = {
      type: supabaseAction,
      email,
      options: {
        redirectTo: resolveRedirect(action, redirectTo, origin),
      },
    }

    if (supabaseAction === 'email_change') {
      payload.newEmail = newEmail
    }

    if ((supabaseAction === 'signup' || supabaseAction === 'invite') && password) {
      payload.password = password
    }

    const { data, error } = await supabaseAdmin.auth.admin.generateLink(payload)

    if (error) {
      throw error
    }

    const actionLink = data?.properties?.action_link ?? data?.action_link

    if (!actionLink) {
      throw new Error('Supabase did not return an action link for this request.')
    }

    const { subject, htmlBody, textBody, toAddress } = buildEmailContent(action, {
      email,
      newEmail,
      link: actionLink,
    })

    await sendGraphMail({
      subject,
      htmlBody,
      textBody,
      replyTo: 'support@l2lunited.com',
      toAddress,
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    }
  } catch (error) {
    console.error('[auth-email] error sending auth email', error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: error.message ?? 'Failed to send auth email.' }),
    }
  }
}
