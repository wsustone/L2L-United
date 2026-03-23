import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

export type Activity = Tables<'activities'>;
export type ActivityInsert = TablesInsert<'activities'>;

export function useProjectActivities(projectId: string | undefined) {
  return useQuery({
    queryKey: ['activities', 'project', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!projectId,
  });
}

export function useContactActivities(contactId: string | undefined) {
  return useQuery({
    queryKey: ['activities', 'contact', contactId],
    queryFn: async () => {
      if (!contactId) return [];
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!contactId,
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activity: ActivityInsert) => {
      const { data, error } = await supabase
        .from('activities')
        .insert(activity)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      if (data.project_id) {
        queryClient.invalidateQueries({ queryKey: ['activities', 'project', data.project_id] });
      }
      if (data.contact_id) {
        queryClient.invalidateQueries({ queryKey: ['activities', 'contact', data.contact_id] });
      }
    },
  });
}
