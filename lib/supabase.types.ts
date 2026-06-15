export type Database = {
  public: {
    Tables: {
      lead_enquiries: {
        Row: {
          id: string;
          created_at: string;
          full_name: string;
          email: string;
          phone: string;
          enquiry_type: string;
          estimated_loan_amount: number | null;
          message: string | null;
          consent: boolean;
          source_page: string | null;
          form_name: string | null;
          utm_source: string | null;
          utm_medium: string | null;
          utm_campaign: string | null;
          status: string;
          user_agent: string | null;
          ip_address: string | null;
          notification_email_sent_at: string | null;
          customer_confirmation_sent_at: string | null;
          email_delivery_error: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          full_name: string;
          email: string;
          phone: string;
          enquiry_type: string;
          estimated_loan_amount?: number | null;
          message?: string | null;
          consent?: boolean;
          source_page?: string | null;
          form_name?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          status?: string;
          user_agent?: string | null;
          ip_address?: string | null;
          notification_email_sent_at?: string | null;
          customer_confirmation_sent_at?: string | null;
          email_delivery_error?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          enquiry_type?: string;
          estimated_loan_amount?: number | null;
          message?: string | null;
          consent?: boolean;
          source_page?: string | null;
          form_name?: string | null;
          utm_source?: string | null;
          utm_medium?: string | null;
          utm_campaign?: string | null;
          status?: string;
          user_agent?: string | null;
          ip_address?: string | null;
          notification_email_sent_at?: string | null;
          customer_confirmation_sent_at?: string | null;
          email_delivery_error?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
