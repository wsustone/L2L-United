export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          contact_id: string | null
          created_at: string | null
          created_by: string | null
          details: string | null
          from_status: Database["public"]["Enums"]["project_status"] | null
          id: string
          project_id: string | null
          summary: string
          to_status: Database["public"]["Enums"]["project_status"] | null
          type: Database["public"]["Enums"]["activity_type"]
        }
        Insert: {
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          details?: string | null
          from_status?: Database["public"]["Enums"]["project_status"] | null
          id?: string
          project_id?: string | null
          summary: string
          to_status?: Database["public"]["Enums"]["project_status"] | null
          type: Database["public"]["Enums"]["activity_type"]
        }
        Update: {
          contact_id?: string | null
          created_at?: string | null
          created_by?: string | null
          details?: string | null
          from_status?: Database["public"]["Enums"]["project_status"] | null
          id?: string
          project_id?: string | null
          summary?: string
          to_status?: Database["public"]["Enums"]["project_status"] | null
          type?: Database["public"]["Enums"]["activity_type"]
        }
        Relationships: [
          {
            foreignKeyName: "activities_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activities_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          company_name: string
          created_at: string | null
          id: string
          notes: string | null
          type: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          id?: string
          notes?: string | null
          type?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          type?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          assigned_to: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          notes: string | null
          phone: string | null
          status: string | null
        }
        Insert: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          notes?: string | null
          phone?: string | null
          status?: string | null
        }
        Update: {
          assigned_to?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          notes?: string | null
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company_id: string | null
          created_at: string | null
          email: string | null
          email_normalized: string | null
          full_name: string
          id: string
          notes: string | null
          phone: string | null
          phone_normalized: string | null
          role_or_title: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          email?: string | null
          email_normalized?: string | null
          full_name: string
          id?: string
          notes?: string | null
          phone?: string | null
          phone_normalized?: string | null
          role_or_title?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          email?: string | null
          email_normalized?: string | null
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string | null
          phone_normalized?: string | null
          role_or_title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      news_posts: {
        Row: {
          category: string
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string | null
          published: boolean
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string | null
          published?: boolean
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          created_by: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          archived: boolean | null
          assigned_to: string | null
          company_id: string | null
          contact_id: string | null
          contact_name: string | null
          contact_owner: string | null
          created_at: string | null
          date_added: string | null
          email: string | null
          email_normalized: string | null
          est_project_value: string | null
          id: string
          importance: Database["public"]["Enums"]["project_importance"] | null
          next_follow_up_date: string | null
          notes: string | null
          phone: string | null
          phone_normalized: string | null
          project_city: string | null
          project_country: string | null
          project_name: string
          project_scope: Database["public"]["Enums"]["project_scope"] | null
          project_state: string | null
          project_timeline:
            | Database["public"]["Enums"]["project_timeline"]
            | null
          project_type: Database["public"]["Enums"]["project_type"] | null
          qty: number | null
          source: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          status_last_changed_at: string | null
          tags: string[] | null
          updated_at: string | null
          value_currency: string | null
          value_number: number | null
        }
        Insert: {
          archived?: boolean | null
          assigned_to?: string | null
          company_id?: string | null
          contact_id?: string | null
          contact_name?: string | null
          contact_owner?: string | null
          created_at?: string | null
          date_added?: string | null
          email?: string | null
          email_normalized?: string | null
          est_project_value?: string | null
          id?: string
          importance?: Database["public"]["Enums"]["project_importance"] | null
          next_follow_up_date?: string | null
          notes?: string | null
          phone?: string | null
          phone_normalized?: string | null
          project_city?: string | null
          project_country?: string | null
          project_name: string
          project_scope?: Database["public"]["Enums"]["project_scope"] | null
          project_state?: string | null
          project_timeline?:
            | Database["public"]["Enums"]["project_timeline"]
            | null
          project_type?: Database["public"]["Enums"]["project_type"] | null
          qty?: number | null
          source?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          status_last_changed_at?: string | null
          tags?: string[] | null
          updated_at?: string | null
          value_currency?: string | null
          value_number?: number | null
        }
        Update: {
          archived?: boolean | null
          assigned_to?: string | null
          company_id?: string | null
          contact_id?: string | null
          contact_name?: string | null
          contact_owner?: string | null
          created_at?: string | null
          date_added?: string | null
          email?: string | null
          email_normalized?: string | null
          est_project_value?: string | null
          id?: string
          importance?: Database["public"]["Enums"]["project_importance"] | null
          next_follow_up_date?: string | null
          notes?: string | null
          phone?: string | null
          phone_normalized?: string | null
          project_city?: string | null
          project_country?: string | null
          project_name?: string
          project_scope?: Database["public"]["Enums"]["project_scope"] | null
          project_state?: string | null
          project_timeline?:
            | Database["public"]["Enums"]["project_timeline"]
            | null
          project_type?: Database["public"]["Enums"]["project_type"] | null
          qty?: number | null
          source?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          status_last_changed_at?: string | null
          tags?: string[] | null
          updated_at?: string | null
          value_currency?: string | null
          value_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          contact_id: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          project_id: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          contact_id?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff_or_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      activity_type:
        | "call"
        | "email"
        | "meeting"
        | "sms"
        | "note"
        | "status_change"
        | "task_completed"
        | "document_uploaded"
      app_role: "admin" | "staff"
      project_importance: "Contracted" | "High" | "Medium" | "Low"
      project_scope:
        | "TBD"
        | "A&E Only"
        | "Panel Supply"
        | "Panel Installation"
        | "Fit Out & Finish"
        | "A&E & Panel Supply"
        | "A&E & Panel Sup+Ins."
        | "A&E, Panel S+I, & F/F"
      project_status:
        | "Discovery Phase"
        | "Drawings Received"
        | "Priced"
        | "Internal Review"
        | "Proposal Sent"
        | "Client Review"
        | "Contracted"
        | "PO Issued"
        | "A&E"
        | "In Production"
        | "Shipped"
        | "Onsite"
        | "Installation"
        | "Complete"
      project_timeline:
        | "Discovery Phase"
        | "30 Days Out"
        | "3 Months Out"
        | "6 Months Out"
        | "1 Year Out"
        | "1 Year +"
      project_type:
        | "Single Family"
        | "Multi Family"
        | "Industrial"
        | "Modular"
        | "Mutli-Story"
        | "Commercial"
        | "Military"
      task_status: "open" | "done" | "snoozed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      activity_type: [
        "call",
        "email",
        "meeting",
        "sms",
        "note",
        "status_change",
        "task_completed",
        "document_uploaded",
      ],
      app_role: ["admin", "staff"],
      project_importance: ["Contracted", "High", "Medium", "Low"],
      project_scope: [
        "TBD",
        "A&E Only",
        "Panel Supply",
        "Panel Installation",
        "Fit Out & Finish",
        "A&E & Panel Supply",
        "A&E & Panel Sup+Ins.",
        "A&E, Panel S+I, & F/F",
      ],
      project_status: [
        "Discovery Phase",
        "Drawings Received",
        "Priced",
        "Internal Review",
        "Proposal Sent",
        "Client Review",
        "Contracted",
        "PO Issued",
        "A&E",
        "In Production",
        "Shipped",
        "Onsite",
        "Installation",
        "Complete",
      ],
      project_timeline: [
        "Discovery Phase",
        "30 Days Out",
        "3 Months Out",
        "6 Months Out",
        "1 Year Out",
        "1 Year +",
      ],
      project_type: [
        "Single Family",
        "Multi Family",
        "Industrial",
        "Modular",
        "Mutli-Story",
        "Commercial",
        "Military",
      ],
      task_status: ["open", "done", "snoozed"],
    },
  },
} as const
