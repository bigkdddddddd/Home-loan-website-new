create extension if not exists pgcrypto;

create table if not exists public.lead_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  enquiry_type text not null check (
    enquiry_type in (
      'Home Loan',
      'Car Loan',
      'Refinance',
      'First Home Buyer',
      'Asset Finance',
      'Business Loan',
      'Personal Loan',
      'Other'
    )
  ),
  estimated_loan_amount numeric(14, 2),
  message text,
  consent boolean not null default false,
  source_page text,
  form_name text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'new' check (
    status in (
      'new',
      'contacted',
      'qualified',
      'not suitable',
      'converted',
      'closed'
    )
  ),
  user_agent text,
  ip_address text
);

alter table public.lead_enquiries enable row level security;

create index if not exists lead_enquiries_created_at_idx
  on public.lead_enquiries (created_at desc);

create index if not exists lead_enquiries_enquiry_type_idx
  on public.lead_enquiries (enquiry_type);

create index if not exists lead_enquiries_status_idx
  on public.lead_enquiries (status);
