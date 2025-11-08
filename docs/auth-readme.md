# L2L United Auth Email System

## Overview
The portal uses a custom Netlify function (`/.netlify/functions/auth-email`) to generate Supabase action links (signup, invite, recovery, email change, magic link) and deliver them through Microsoft Graph rather than Supabase’s default SMTP. This keeps email styling consistent and allows the same Microsoft 365 mailbox that handles other L2L correspondence to deliver authentication messages.

```
Client action (signup, reset, invite, etc.)
        ↓
AuthProvider helper → POST /.netlify/functions/auth-email
        ↓
Supabase service key generates action link
        ↓
Netlify function calls Microsoft Graph → sends HTML email
```

## Key Components
| Layer | File(s) | Purpose |
| ----- | ------- | ------- |
| Frontend helpers | `src/providers/AuthProvider.jsx` | Exposes `signUpWithPassword`, `sendInviteEmail`, `sendPasswordReset`, `requestEmailChange`, etc. Each helper posts a payload to the Netlify function. |
| UI Entry Points | `src/screens/RegisterPage.jsx`, `src/screens/SignInPage.jsx`, `src/screens/ProfilePage.jsx`, `src/screens/PortalPage.jsx` | Collect user input and call the helpers. The Portal page includes the admin invite form; Profile handles email-change requests. |
| Netlify function | `netlify/functions/auth-email.js` | Uses the Supabase service-role key to generate action links and Microsoft Graph to deliver HTML emails with branded content. |
| Email templates | Inline within `auth-email.js` | Each action type (signup, invite, recovery, magiclink/reauthenticate, email_change) has tailored HTML/text bodies. |

## Required Environment Variables
Configure these in **Netlify site settings** (production) and `.env.local` (local `netlify dev`). Values shown here are examples—replace with environment-specific URLs or secrets.

| Variable | Sample / Purpose |
| -------- | ---------------- |
| `GRAPH_TENANT_ID` | Azure AD tenant ID for Microsoft Graph client-credentials flow. |
| `GRAPH_CLIENT_ID` | App registration (client) ID. |
| `GRAPH_CLIENT_SECRET` | Client secret value created in the Azure app registration. |
| `GRAPH_SENDER_EMAIL` | Mailbox used to send all auth emails (e.g., `support@l2lunited.com`). |
| `GRAPH_FROM_ALIAS` *(optional)* | Display alias if different from the sender address. |
| `SUPABASE_URL` | Supabase project URL. (For local dev you can rely on `VITE_SUPABASE_URL` instead.) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key used only within the Netlify function to generate action links. **Keep this server-side.** |
| `SUPABASE_DEFAULT_REDIRECT` | Fallback redirect applied when an explicit override is not provided. Example: `https://portal.l2lunited.com/portal`. |
| `SUPABASE_REDIRECT_SIGNUP` | Redirect for signup/confirm emails. Example: `https://www.l2lunited.com/confirm-account`. |
| `SUPABASE_REDIRECT_INVITE` | Redirect when an admin sends an invite. |
| `SUPABASE_REDIRECT_RECOVERY` | Redirect for password recovery (e.g., `https://portal.l2lunited.com/reset-password`). |
| `SUPABASE_REDIRECT_MAGICLINK` | Redirect for one-click sign-in links when used. |
| `SUPABASE_REDIRECT_REAUTHENTICATE` | Redirect for reauthentication prompts. |
| `SUPABASE_REDIRECT_EMAIL_CHANGE` | Redirect opened after confirming an email change. |

> **Note:** Supabase project settings must also list these domains under **Authentication → URL Configuration** (Site URL + Allowed Redirect URLs) to avoid 422 errors.

## Enabling Providers in Supabase
* **Authentication → Providers → Email** must remain **enabled** so Supabase accepts password logins.
* Toggle **Disable email confirmations** (or “Autoconfirm new users”) to prevent Supabase from sending duplicate emails. Confirmation is handled by the custom function.

## Local Development
1. Populate `.env.local` with the variables above (Graph credentials, Supabase service role, redirect URLs).
2. Run `netlify dev` from the project root (`L2LUntited/`). Netlify injects the env values and proxies function calls.
3. Use the React UI to trigger flows:
   - Register page → signup email.
   - Sign-in page “Forgot password?” → recovery email.
   - Portal (admin) → invite email.
   - Profile → email change.
4. Reset links use URL fragments (`#access_token=…`) and are handled by `ResetPasswordPage` during local testing (default redirect typically `http://localhost:8888/reset-password`).

## Production Deployment Checklist
- [ ] Secrets and redirect URLs saved under **Netlify → Site settings → Environment variables**.
- [ ] Redeploy after updating env vars (`netlify deploy` or trigger build in UI).
- [ ] Supabase Site URL and allowed redirects updated to production domains.
- [ ] Microsoft Graph application has **Mail.Send (Application)** permission with admin consent.
- [ ] Sender mailbox allowed to send as the configured address (remove unused aliases or grant send-as permissions).
- [ ] Test each flow in production to confirm emails arrive with correct links.

## Testing Scenarios
| Scenario | Trigger | Expected Result |
| -------- | ------- | --------------- |
| Signup confirmation | Submit Register form. | Email arrives from Graph with confirm link pointing to `SUPABASE_REDIRECT_SIGNUP`. |
| Admin invite | Portal → Admin tools → “Send invite”. | Email to invitee with link to `SUPABASE_REDIRECT_INVITE` (or default). |
| Password reset | Sign-in page → “Forgot password?”. | Email with link to `SUPABASE_REDIRECT_RECOVERY`. |
| Email change | Profile → “Request email change”. | Both old and new inboxes receive confirmation to complete change. |
| Magic link / Reauth | Triggered when implemented. | Email with link to `SUPABASE_REDIRECT_MAGICLINK` / `SUPABASE_REDIRECT_REAUTHENTICATE`. |

## Operational Notes
* All Graph calls are logged via Netlify function logs. Monitor Netlify + Azure sign-in logs if delivery stalls.
* Supabase action links expire after one use or 60 minutes; ensure UI communicates this.
* To disable the custom system temporarily, remove the Netlify function env values and re-enable Supabase default emails—but never expose the service role key client-side.
