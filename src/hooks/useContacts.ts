import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

export type Contact = Tables<'contacts'>;
export type ContactInsert = TablesInsert<'contacts'>;
export type ContactUpdate = TablesUpdate<'contacts'>;

export function useContacts(search?: string) {
  return useQuery({
    queryKey: ['contacts', search],
    queryFn: async () => {
      let query = supabase
        .from('contacts')
        .select('*')
        .order('full_name', { ascending: true });

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useContact(id: string | undefined) {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useContactProjects(contactId: string | undefined) {
  return useQuery({
    queryKey: ['contact-projects', contactId],
    queryFn: async () => {
      if (!contactId) return [];
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('contact_id', contactId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!contactId,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contact: ContactInsert) => {
      const { data, error } = await supabase
        .from('contacts')
        .insert(contact)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: ContactUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['contact', variables.id] });
    },
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}

// Find or create contact by email/phone
export function useFindOrCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contact: { full_name: string; email?: string | null; phone?: string | null }) => {
      const emailNormalized = contact.email?.toLowerCase().trim() || null;
      const phoneNormalized = contact.phone?.replace(/\D/g, '') || null;

      // Try to find by email first
      if (emailNormalized) {
        const { data: existing } = await supabase
          .from('contacts')
          .select('*')
          .eq('email_normalized', emailNormalized)
          .maybeSingle();
        if (existing) return existing;
      }

      // Try to find by phone
      if (phoneNormalized && phoneNormalized.length >= 7) {
        const { data: existing } = await supabase
          .from('contacts')
          .select('*')
          .eq('phone_normalized', phoneNormalized)
          .maybeSingle();
        if (existing) return existing;
      }

      // Create new contact
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          full_name: contact.full_name,
          email: contact.email || null,
          email_normalized: emailNormalized,
          phone: contact.phone || null,
          phone_normalized: phoneNormalized,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}
