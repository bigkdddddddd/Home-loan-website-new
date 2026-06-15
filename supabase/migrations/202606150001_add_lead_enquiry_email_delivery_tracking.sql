alter table public.lead_enquiries
  add column if not exists notification_email_sent_at timestamptz,
  add column if not exists customer_confirmation_sent_at timestamptz,
  add column if not exists email_delivery_error text;

create index if not exists lead_enquiries_notification_email_sent_at_idx
  on public.lead_enquiries (notification_email_sent_at desc);

create index if not exists lead_enquiries_customer_confirmation_sent_at_idx
  on public.lead_enquiries (customer_confirmation_sent_at desc);
