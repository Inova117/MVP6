// Database type definitions will be auto-generated from Supabase
// For now, we'll create placeholder types

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          company_name: string
          industry: string | null
          website: string | null
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          ai_score: number | null
          ai_insights: string[] | null
          status:
            | 'new'
            | 'qualified'
            | 'contacted'
            | 'proposal'
            | 'won'
            | 'lost'
          deal_value: number | null
          created_at: string
          created_by: string
        }
        Insert: Omit<
          Database['public']['Tables']['leads']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      activities: {
        Row: {
          id: string
          lead_id: string
          type: 'note' | 'email' | 'call'
          content: string
          created_by: string
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['activities']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<Database['public']['Tables']['activities']['Insert']>
      }
      email_campaigns: {
        Row: {
          id: string
          name: string
          subject: string
          body: string
          status: 'draft' | 'sent'
          sent_at: string | null
          created_by: string
          created_at: string
        }
        Insert: Omit<
          Database['public']['Tables']['email_campaigns']['Row'],
          'id' | 'created_at'
        >
        Update: Partial<
          Database['public']['Tables']['email_campaigns']['Insert']
        >
      }
      campaign_recipients: {
        Row: {
          id: string
          campaign_id: string
          lead_id: string
          sent: boolean
          opened: boolean
          clicked: boolean
        }
        Insert: Omit<
          Database['public']['Tables']['campaign_recipients']['Row'],
          'id'
        >
        Update: Partial<
          Database['public']['Tables']['campaign_recipients']['Insert']
        >
      }
    }
  }
}
