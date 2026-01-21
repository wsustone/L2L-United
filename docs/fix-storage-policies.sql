-- Fix potential infinite recursion in storage policies
-- Run this in your Supabase SQL Editor

-- Drop existing storage policies
DROP POLICY IF EXISTS "Users can upload to accessible folders" ON storage.objects;
DROP POLICY IF EXISTS "Users can view accessible files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update accessible files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete accessible files" ON storage.objects;

-- Recreate policies using IN subqueries to avoid recursion
-- Allow authenticated users to upload files to folders they have access to
CREATE POLICY "Users can upload to accessible folders"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.folders
    WHERE created_by = auth.uid()
    UNION
    SELECT folder_id::text FROM public.folder_permissions
    WHERE user_id = auth.uid() AND can_write = TRUE
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
    UNION
    SELECT folder_id::text FROM public.folder_permissions
    WHERE user_id = auth.uid() AND can_read = TRUE
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
    UNION
    SELECT folder_id::text FROM public.folder_permissions
    WHERE user_id = auth.uid() AND can_write = TRUE
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
    UNION
    SELECT folder_id::text FROM public.folder_permissions
    WHERE user_id = auth.uid() AND can_delete = TRUE
  )
);
