-- Fix infinite recursion in folder delete policy
-- Run this in your Supabase SQL Editor to fix the delete issue

-- Drop the existing delete policy that causes infinite recursion
DROP POLICY IF EXISTS "Users can delete their folders" ON public.folders;

-- Create a new delete policy that avoids recursion
-- This policy uses a simpler check that doesn't trigger recursive RLS evaluation
CREATE POLICY "Users can delete their folders" ON public.folders
  FOR DELETE
  USING (
    created_by = auth.uid() OR
    id IN (
      SELECT folder_id 
      FROM public.folder_permissions
      WHERE user_id = auth.uid()
      AND can_delete = TRUE
    )
  );

-- Also update the update policy to avoid potential recursion
DROP POLICY IF EXISTS "Users can update their folders" ON public.folders;

CREATE POLICY "Users can update their folders" ON public.folders
  FOR UPDATE
  USING (
    created_by = auth.uid() OR
    id IN (
      SELECT folder_id 
      FROM public.folder_permissions
      WHERE user_id = auth.uid()
      AND can_write = TRUE
    )
  );

-- Update the select policy to be more efficient and avoid recursion
DROP POLICY IF EXISTS "Users can view accessible folders" ON public.folders;

CREATE POLICY "Users can view accessible folders" ON public.folders
  FOR SELECT
  USING (
    created_by = auth.uid() OR
    id IN (
      SELECT folder_id 
      FROM public.folder_permissions
      WHERE user_id = auth.uid()
      AND can_read = TRUE
    )
  );
