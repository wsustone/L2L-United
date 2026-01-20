-- Document Sharing System Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create folders table
CREATE TABLE IF NOT EXISTS public.folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  CONSTRAINT unique_folder_name_per_parent UNIQUE (name, parent_id)
);

-- Create files table
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  folder_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create folder permissions table (for granular access control)
CREATE TABLE IF NOT EXISTS public.folder_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  folder_id UUID REFERENCES public.folders(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  can_read BOOLEAN DEFAULT TRUE,
  can_write BOOLEAN DEFAULT FALSE,
  can_delete BOOLEAN DEFAULT FALSE,
  granted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  granted_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_folder_user_permission UNIQUE (folder_id, user_id)
);

-- Create API keys table for external application access
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key_hash TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_folders_parent_id ON public.folders(parent_id);
CREATE INDEX IF NOT EXISTS idx_folders_created_by ON public.folders(created_by);
CREATE INDEX IF NOT EXISTS idx_files_folder_id ON public.files(folder_id);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_by ON public.files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_folder_permissions_folder_id ON public.folder_permissions(folder_id);
CREATE INDEX IF NOT EXISTS idx_folder_permissions_user_id ON public.folder_permissions(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON public.api_keys(key_hash);

-- Enable Row Level Security
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folder_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies for folders
-- Users can view folders they have permission to or created
-- Using IN subquery to avoid infinite recursion
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

-- Users can create folders
CREATE POLICY "Authenticated users can create folders" ON public.folders
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

-- Users can update folders they created or have write permission
-- Using IN subquery to avoid infinite recursion
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

-- Users can delete folders they created or have delete permission
-- Using IN subquery to avoid infinite recursion
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

-- RLS Policies for files
-- Users can view files in folders they have access to
CREATE POLICY "Users can view accessible files" ON public.files
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.folders
      WHERE folders.id = files.folder_id
      AND (
        folders.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.folder_permissions
          WHERE folder_permissions.folder_id = folders.id
          AND folder_permissions.user_id = auth.uid()
          AND folder_permissions.can_read = TRUE
        )
      )
    )
  );

-- Users can upload files to folders they have write access to
CREATE POLICY "Users can upload files to accessible folders" ON public.files
  FOR INSERT
  WITH CHECK (
    auth.uid() = uploaded_by AND
    EXISTS (
      SELECT 1 FROM public.folders
      WHERE folders.id = files.folder_id
      AND (
        folders.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.folder_permissions
          WHERE folder_permissions.folder_id = folders.id
          AND folder_permissions.user_id = auth.uid()
          AND folder_permissions.can_write = TRUE
        )
      )
    )
  );

-- Users can update files they uploaded or have write permission
CREATE POLICY "Users can update their files" ON public.files
  FOR UPDATE
  USING (
    auth.uid() = uploaded_by OR
    EXISTS (
      SELECT 1 FROM public.folders
      WHERE folders.id = files.folder_id
      AND EXISTS (
        SELECT 1 FROM public.folder_permissions
        WHERE folder_permissions.folder_id = folders.id
        AND folder_permissions.user_id = auth.uid()
        AND folder_permissions.can_write = TRUE
      )
    )
  );

-- Users can delete files they uploaded or have delete permission
CREATE POLICY "Users can delete their files" ON public.files
  FOR DELETE
  USING (
    auth.uid() = uploaded_by OR
    EXISTS (
      SELECT 1 FROM public.folders
      WHERE folders.id = files.folder_id
      AND EXISTS (
        SELECT 1 FROM public.folder_permissions
        WHERE folder_permissions.folder_id = folders.id
        AND folder_permissions.user_id = auth.uid()
        AND folder_permissions.can_delete = TRUE
      )
    )
  );

-- RLS Policies for folder_permissions
-- Users can view permissions for folders they created
CREATE POLICY "Folder creators can view permissions" ON public.folder_permissions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.folders
      WHERE folders.id = folder_permissions.folder_id
      AND folders.created_by = auth.uid()
    )
  );

-- Users can grant permissions to folders they created
CREATE POLICY "Folder creators can grant permissions" ON public.folder_permissions
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.folders
      WHERE folders.id = folder_permissions.folder_id
      AND folders.created_by = auth.uid()
    )
  );

-- Users can update permissions for folders they created
CREATE POLICY "Folder creators can update permissions" ON public.folder_permissions
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.folders
      WHERE folders.id = folder_permissions.folder_id
      AND folders.created_by = auth.uid()
    )
  );

-- Users can delete permissions for folders they created
CREATE POLICY "Folder creators can delete permissions" ON public.folder_permissions
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.folders
      WHERE folders.id = folder_permissions.folder_id
      AND folders.created_by = auth.uid()
    )
  );

-- RLS Policies for api_keys
-- Users can only view their own API keys
CREATE POLICY "Users can view their own API keys" ON public.api_keys
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own API keys
CREATE POLICY "Users can create their own API keys" ON public.api_keys
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own API keys
CREATE POLICY "Users can update their own API keys" ON public.api_keys
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own API keys
CREATE POLICY "Users can delete their own API keys" ON public.api_keys
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER set_folders_updated_at
  BEFORE UPDATE ON public.folders
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_files_updated_at
  BEFORE UPDATE ON public.files
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Helper function to get folder hierarchy
CREATE OR REPLACE FUNCTION public.get_folder_path(folder_id UUID)
RETURNS TEXT AS $$
DECLARE
  path TEXT := '';
  current_id UUID := folder_id;
  current_name TEXT;
  parent_id UUID;
BEGIN
  WHILE current_id IS NOT NULL LOOP
    SELECT name, folders.parent_id INTO current_name, parent_id
    FROM public.folders
    WHERE id = current_id;
    
    IF current_name IS NULL THEN
      EXIT;
    END IF;
    
    IF path = '' THEN
      path := current_name;
    ELSE
      path := current_name || '/' || path;
    END IF;
    
    current_id := parent_id;
  END LOOP;
  
  RETURN path;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has access to folder
CREATE OR REPLACE FUNCTION public.user_has_folder_access(
  folder_id UUID,
  user_id UUID,
  permission_type TEXT DEFAULT 'read'
)
RETURNS BOOLEAN AS $$
DECLARE
  has_access BOOLEAN := FALSE;
BEGIN
  -- Check if user created the folder
  SELECT EXISTS (
    SELECT 1 FROM public.folders
    WHERE id = folder_id AND created_by = user_id
  ) INTO has_access;
  
  IF has_access THEN
    RETURN TRUE;
  END IF;
  
  -- Check folder permissions
  IF permission_type = 'read' THEN
    SELECT EXISTS (
      SELECT 1 FROM public.folder_permissions
      WHERE folder_permissions.folder_id = $1
      AND folder_permissions.user_id = $2
      AND can_read = TRUE
    ) INTO has_access;
  ELSIF permission_type = 'write' THEN
    SELECT EXISTS (
      SELECT 1 FROM public.folder_permissions
      WHERE folder_permissions.folder_id = $1
      AND folder_permissions.user_id = $2
      AND can_write = TRUE
    ) INTO has_access;
  ELSIF permission_type = 'delete' THEN
    SELECT EXISTS (
      SELECT 1 FROM public.folder_permissions
      WHERE folder_permissions.folder_id = $1
      AND folder_permissions.user_id = $2
      AND can_delete = TRUE
    ) INTO has_access;
  END IF;
  
  RETURN has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
