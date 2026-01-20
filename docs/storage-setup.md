# Supabase Storage Setup for Document Sharing

## Create Storage Bucket

1. Go to your Supabase Dashboard → Storage
2. Create a new bucket named `documents`
3. Set it as **Private** (not public)

## Storage Policies

Run these policies in the Supabase SQL Editor to secure the storage bucket:

```sql
-- Allow authenticated users to upload files to folders they have access to
CREATE POLICY "Users can upload to accessible folders"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.folders
    WHERE created_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.folder_permissions
      WHERE folder_permissions.folder_id = folders.id
      AND folder_permissions.user_id = auth.uid()
      AND folder_permissions.can_write = TRUE
    )
  )
);

-- Allow users to view files in folders they have access to
CREATE POLICY "Users can view accessible files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.folders
    WHERE created_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.folder_permissions
      WHERE folder_permissions.folder_id = folders.id
      AND folder_permissions.user_id = auth.uid()
      AND folder_permissions.can_read = TRUE
    )
  )
);

-- Allow users to update files in folders they have access to
CREATE POLICY "Users can update accessible files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.folders
    WHERE created_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.folder_permissions
      WHERE folder_permissions.folder_id = folders.id
      AND folder_permissions.user_id = auth.uid()
      AND folder_permissions.can_write = TRUE
    )
  )
);

-- Allow users to delete files in folders they have access to
CREATE POLICY "Users can delete accessible files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.folders
    WHERE created_by = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.folder_permissions
      WHERE folder_permissions.folder_id = folders.id
      AND folder_permissions.user_id = auth.uid()
      AND folder_permissions.can_delete = TRUE
    )
  )
);
```

## File Path Structure

Files in the storage bucket will be organized as:
```
documents/
  {folder_id}/
    {file_id}.{extension}
```

This structure ensures:
- Files are organized by folder
- Each file has a unique identifier
- Easy to manage permissions at the folder level
