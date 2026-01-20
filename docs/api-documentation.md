# L2L United Documents API Documentation

## Overview

The L2L United Documents API allows external applications to securely access the document sharing system. Authentication is supported via both Bearer tokens (for user sessions) and API keys (for application-to-application communication).

## Base URL

```
https://www.l2lunited.com/.netlify/functions/documents-api
```

## Authentication

### Option 1: Bearer Token (User Session)

Use a valid Supabase session token:

```
Authorization: Bearer <session_token>
```

### Option 2: API Key (Application Access)

Use an API key generated from the portal:

```
X-API-Key: l2l_<your_api_key>
```

## Endpoints

### 1. List Folders

Get all folders at the root level or within a parent folder.

**Endpoint:** `GET /folders`

**Query Parameters:**
- `parent_id` (optional): UUID of the parent folder. Omit for root-level folders.

**Example Request:**
```bash
curl -X GET "https://www.l2lunited.com/.netlify/functions/documents-api/folders" \
  -H "X-API-Key: l2l_your_api_key_here"
```

**Example Response:**
```json
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "Project Documents",
    "description": "Documents for the main project",
    "parent_id": null,
    "created_at": "2024-01-20T10:00:00Z",
    "updated_at": "2024-01-20T10:00:00Z"
  }
]
```

### 2. Get Folder Details

Get detailed information about a specific folder, including its path.

**Endpoint:** `GET /folders/{folder_id}`

**Example Request:**
```bash
curl -X GET "https://www.l2lunited.com/.netlify/functions/documents-api/folders/123e4567-e89b-12d3-a456-426614174000" \
  -H "X-API-Key: l2l_your_api_key_here"
```

**Example Response:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "Project Documents",
  "description": "Documents for the main project",
  "parent_id": null,
  "created_at": "2024-01-20T10:00:00Z",
  "updated_at": "2024-01-20T10:00:00Z",
  "path": "Project Documents"
}
```

### 3. Create Folder

Create a new folder at the root level or within a parent folder.

**Endpoint:** `POST /folders`

**Request Body:**
```json
{
  "name": "New Folder",
  "description": "Optional description",
  "parent_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

**Example Request:**
```bash
curl -X POST "https://www.l2lunited.com/.netlify/functions/documents-api/folders" \
  -H "X-API-Key: l2l_your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Folder",
    "description": "Optional description",
    "parent_id": null
  }'
```

**Example Response:**
```json
{
  "id": "789e4567-e89b-12d3-a456-426614174999",
  "name": "New Folder",
  "description": "Optional description",
  "parent_id": null,
  "created_by": "user-uuid",
  "created_at": "2024-01-20T11:00:00Z",
  "updated_at": "2024-01-20T11:00:00Z",
  "is_active": true
}
```

### 4. List Files in Folder

Get all files within a specific folder.

**Endpoint:** `GET /folders/{folder_id}/files`

**Example Request:**
```bash
curl -X GET "https://www.l2lunited.com/.netlify/functions/documents-api/folders/123e4567-e89b-12d3-a456-426614174000/files" \
  -H "X-API-Key: l2l_your_api_key_here"
```

**Example Response:**
```json
[
  {
    "id": "file-uuid-1",
    "name": "document.pdf",
    "description": "Important document",
    "file_path": "folder-id/file-id.pdf",
    "file_size": 1048576,
    "mime_type": "application/pdf",
    "created_at": "2024-01-20T10:30:00Z",
    "updated_at": "2024-01-20T10:30:00Z"
  }
]
```

### 5. Get File Download URL

Get a signed URL to download a specific file. The URL is valid for 1 hour.

**Endpoint:** `GET /files/{file_id}/download`

**Example Request:**
```bash
curl -X GET "https://www.l2lunited.com/.netlify/functions/documents-api/files/file-uuid-1/download" \
  -H "X-API-Key: l2l_your_api_key_here"
```

**Example Response:**
```json
{
  "downloadUrl": "https://storage.supabase.co/...",
  "expiresIn": 3600
}
```

## API Keys Management

### Endpoints for Managing API Keys

**Base URL:** `https://www.l2lunited.com/.netlify/functions/api-keys`

### 1. List API Keys

**Endpoint:** `GET /`

**Authentication:** Bearer token only

**Example Request:**
```bash
curl -X GET "https://www.l2lunited.com/.netlify/functions/api-keys" \
  -H "Authorization: Bearer <session_token>"
```

### 2. Create API Key

**Endpoint:** `POST /`

**Authentication:** Bearer token only

**Request Body:**
```json
{
  "name": "Production App",
  "description": "API key for production application",
  "expires_in_days": 90
}
```

**Example Response:**
```json
{
  "id": "key-uuid",
  "name": "Production App",
  "description": "API key for production application",
  "created_at": "2024-01-20T10:00:00Z",
  "expires_at": "2024-04-20T10:00:00Z",
  "is_active": true,
  "api_key": "l2l_abc123...",
  "warning": "Save this API key now. You will not be able to see it again."
}
```

### 3. Delete API Key

**Endpoint:** `DELETE /{key_id}`

**Authentication:** Bearer token only

### 4. Toggle API Key Status

**Endpoint:** `POST /{key_id}/toggle`

**Authentication:** Bearer token only

**Request Body:**
```json
{
  "is_active": false
}
```

## Error Responses

All endpoints return standard HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

**Error Response Format:**
```json
{
  "error": "Error message describing what went wrong"
}
```

## Rate Limiting

Currently, there are no rate limits enforced. However, please be respectful of the API and avoid excessive requests.

## Example Integration (Node.js)

```javascript
const axios = require('axios');

class L2LDocumentsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://www.l2lunited.com/.netlify/functions/documents-api';
  }

  async getFolders(parentId = null) {
    const url = parentId 
      ? `${this.baseUrl}/folders?parent_id=${parentId}`
      : `${this.baseUrl}/folders`;
    
    const response = await axios.get(url, {
      headers: { 'X-API-Key': this.apiKey }
    });
    
    return response.data;
  }

  async getFiles(folderId) {
    const response = await axios.get(
      `${this.baseUrl}/folders/${folderId}/files`,
      { headers: { 'X-API-Key': this.apiKey } }
    );
    
    return response.data;
  }

  async downloadFile(fileId) {
    const response = await axios.get(
      `${this.baseUrl}/files/${fileId}/download`,
      { headers: { 'X-API-Key': this.apiKey } }
    );
    
    const { downloadUrl } = response.data;
    
    // Download the file
    const fileResponse = await axios.get(downloadUrl, {
      responseType: 'arraybuffer'
    });
    
    return fileResponse.data;
  }

  async createFolder(name, description = '', parentId = null) {
    const response = await axios.post(
      `${this.baseUrl}/folders`,
      { name, description, parent_id: parentId },
      { headers: { 'X-API-Key': this.apiKey, 'Content-Type': 'application/json' } }
    );
    
    return response.data;
  }
}

// Usage
const client = new L2LDocumentsClient('l2l_your_api_key_here');

async function main() {
  try {
    // List root folders
    const folders = await client.getFolders();
    console.log('Folders:', folders);
    
    // Get files in a folder
    if (folders.length > 0) {
      const files = await client.getFiles(folders[0].id);
      console.log('Files:', files);
      
      // Download a file
      if (files.length > 0) {
        const fileData = await client.downloadFile(files[0].id);
        console.log('Downloaded file size:', fileData.length);
      }
    }
    
    // Create a new folder
    const newFolder = await client.createFolder('API Test Folder', 'Created via API');
    console.log('Created folder:', newFolder);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

main();
```

## Example Integration (Python)

```python
import requests

class L2LDocumentsClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://www.l2lunited.com/.netlify/functions/documents-api'
        self.headers = {'X-API-Key': api_key}
    
    def get_folders(self, parent_id=None):
        url = f"{self.base_url}/folders"
        params = {'parent_id': parent_id} if parent_id else {}
        response = requests.get(url, headers=self.headers, params=params)
        response.raise_for_status()
        return response.json()
    
    def get_files(self, folder_id):
        url = f"{self.base_url}/folders/{folder_id}/files"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def download_file(self, file_id):
        url = f"{self.base_url}/files/{file_id}/download"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        
        download_url = response.json()['downloadUrl']
        file_response = requests.get(download_url)
        file_response.raise_for_status()
        
        return file_response.content
    
    def create_folder(self, name, description='', parent_id=None):
        url = f"{self.base_url}/folders"
        data = {
            'name': name,
            'description': description,
            'parent_id': parent_id
        }
        response = requests.post(url, headers=self.headers, json=data)
        response.raise_for_status()
        return response.json()

# Usage
client = L2LDocumentsClient('l2l_your_api_key_here')

try:
    # List root folders
    folders = client.get_folders()
    print('Folders:', folders)
    
    # Get files in a folder
    if folders:
        files = client.get_files(folders[0]['id'])
        print('Files:', files)
        
        # Download a file
        if files:
            file_data = client.download_file(files[0]['id'])
            print(f'Downloaded file size: {len(file_data)} bytes')
    
    # Create a new folder
    new_folder = client.create_folder('API Test Folder', 'Created via API')
    print('Created folder:', new_folder)
    
except requests.exceptions.HTTPError as e:
    print(f'Error: {e.response.json()}')
```

## Security Best Practices

1. **Store API Keys Securely**: Never commit API keys to version control. Use environment variables or secure key management systems.

2. **Use HTTPS**: Always use HTTPS when making API requests to ensure data is encrypted in transit.

3. **Rotate Keys Regularly**: Set expiration dates on API keys and rotate them periodically.

4. **Principle of Least Privilege**: Only grant the minimum necessary permissions to users and applications.

5. **Monitor API Usage**: Regularly review API key usage through the last_used_at field.

6. **Deactivate Unused Keys**: Disable or delete API keys that are no longer needed.

## Support

For questions or issues with the API, please contact:
- Email: support@l2lunited.com
- Portal: https://www.l2lunited.com/portal
