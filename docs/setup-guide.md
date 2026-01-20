# Document Sharing System Setup Guide

This guide will walk you through setting up the secure document sharing system with authentication, UI, and API access.

## Prerequisites

- Supabase project configured
- Netlify deployment set up
- Environment variables configured

## Step 1: Database Setup

1. Open your Supabase Dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `docs/database-schema.sql`
4. Verify that all tables were created successfully:
   - `folders`
   - `files`
   - `folder_permissions`
   - `api_keys`

## Step 2: Storage Setup

1. In Supabase Dashboard, go to **Storage**
2. Click **New Bucket**
3. Create a bucket named `documents`
4. Set it as **Private** (not public)
5. Navigate to the SQL Editor
6. Run the storage policies from `docs/storage-setup.md`

## Step 3: Environment Variables

Ensure these environment variables are set in your Netlify deployment:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Microsoft Graph (for email)
GRAPH_TENANT_ID=your_tenant_id
GRAPH_CLIENT_ID=your_client_id
GRAPH_CLIENT_SECRET=your_client_secret
GRAPH_SENDER_EMAIL=your_sender_email
```

## Step 4: Deploy the Application

1. Commit all changes to your repository
2. Push to your main branch
3. Netlify will automatically deploy the changes
4. Verify the deployment was successful

## Step 5: Test the System

### Test the UI

1. Navigate to `https://www.l2lunited.com/documents`
2. Sign in with your credentials
3. Create a test folder
4. Upload a test file
5. Verify you can download the file

### Test API Access

1. Navigate to `https://www.l2lunited.com/api-keys`
2. Create a new API key
3. Copy the API key (you won't see it again!)
4. Test the API using the examples in `docs/api-documentation.md`

## Step 6: Configure Permissions

### Grant Access to Team Members

1. Users must first register at `https://www.l2lunited.com/register`
2. After registration, they can sign in
3. Folder creators can share folders with other users:
   - Navigate to the folder
   - Click "Share Folder"
   - Enter the user's email
   - Set permissions (Read, Write, Delete)

### Create API Keys for External Applications

1. Sign in to the portal
2. Navigate to `/api-keys`
3. Click "Create New API Key"
4. Provide a name and description
5. Set expiration (optional)
6. Copy the generated API key
7. Use the API key in your external application

## Features Overview

### For End Users

- **Folder Navigation**: Browse folders with breadcrumb navigation
- **File Upload**: Upload files to any folder you have write access to
- **File Download**: Download files with secure signed URLs
- **Folder Sharing**: Share folders with team members with granular permissions
- **Folder Management**: Create, rename, and delete folders

### For Developers

- **RESTful API**: Clean REST API for programmatic access
- **API Key Authentication**: Secure API keys with expiration support
- **Bearer Token Support**: Use user session tokens for API access
- **Comprehensive Documentation**: Full API documentation with examples

### Security Features

- **Row Level Security**: Database-level access control
- **Signed URLs**: Temporary download URLs that expire
- **API Key Management**: Create, deactivate, and delete API keys
- **Permission System**: Granular read/write/delete permissions
- **Audit Trail**: Track who created folders and uploaded files

## Navigation

Add links to the documents page in your navigation menu:

```jsx
<Link to="/documents">Documents</Link>
<Link to="/api-keys">API Keys</Link>
```

## Troubleshooting

### Cannot Create Folders

- Verify you are signed in
- Check that the database schema was created correctly
- Verify RLS policies are enabled

### Cannot Upload Files

- Ensure the `documents` storage bucket exists
- Verify storage policies are configured
- Check that you have write permission to the folder

### API Key Not Working

- Verify the API key is active
- Check that the key hasn't expired
- Ensure you're using the correct header: `X-API-Key`

### Files Not Downloading

- Check that the file exists in the database
- Verify storage bucket permissions
- Ensure the signed URL hasn't expired (valid for 1 hour)

## Next Steps

1. **Customize the UI**: Modify the React components to match your branding
2. **Add More Features**: Consider adding file versioning, comments, or tags
3. **Set Up Monitoring**: Track API usage and storage consumption
4. **Create Backups**: Set up regular backups of your database and storage
5. **Document Workflows**: Create internal documentation for your team

## Support

For questions or issues:
- Email: support@l2lunited.com
- Documentation: See `docs/api-documentation.md`
- Database Schema: See `docs/database-schema.sql`
