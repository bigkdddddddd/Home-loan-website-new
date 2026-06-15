-- Replace BOTH placeholders before running this SQL:
-- 1. YOUR_PROJECT_REF
-- 2. REPLACE_WITH_WEBHOOK_SECRET
--
-- Example function URL:
-- https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-enquiry-emails
--
-- If you do not want to use a shared webhook secret, remove the
-- x-km-webhook-secret header here and also leave ENQUIRY_WEBHOOK_SECRET
-- unset in the Edge Function secrets. Using the secret is recommended.

drop trigger if exists send_enquiry_emails_on_insert on public.lead_enquiries;

create trigger send_enquiry_emails_on_insert
after insert on public.lead_enquiries
for each row
execute function supabase_functions.http_request(
  'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-enquiry-emails',
  'POST',
  '{"Content-Type":"application/json","x-km-webhook-secret":"REPLACE_WITH_WEBHOOK_SECRET"}',
  '{}',
  '1000'
);
