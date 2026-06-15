# KM Financing Website

Full Next.js App Router build for KM Financing with secure lead capture through Supabase and Resend.

The most important security rule is preserved throughout the project: do not import `lib/supabaseAdmin.ts`, `lib/resend.ts`, or `lib/env.ts` into any client component. Client components should only post JSON to `/api/enquiries`.

## What is included

- Multi-page marketing site for:
  - Home Loans
  - Car Loans
  - Refinance
  - First Home Buyer
  - Asset Finance
  - Business Loans
  - Calculators
- Dedicated `/enquiry` page with one shared enquiry form
- Shared `app/api/enquiries/route.ts` backend with:
  - Zod validation
  - Honeypot spam protection
  - Supabase lead storage
  - Optional app-owned Resend notification emails
  - Optional app-owned customer confirmation emails
- Server-only Supabase admin client and Resend client
- SQL migration for `lead_enquiries`
- Supabase Edge Function for direct Supabase to Resend delivery

## Local development

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in the required environment variables.
4. Run `npm run dev`.
5. Visit `http://localhost:3000`.

## Route map

- `/`
- `/enquiry`
- `/home-loans`
- `/car-loans`
- `/refinance`
- `/first-home-buyer`
- `/asset-finance`
- `/business-loans`
- `/calculators`

## Supabase and Resend Setup

1. Create a Supabase project.
2. Run the SQL migration in `supabase/migrations/202606140001_create_lead_enquiries.sql`.
3. Run the SQL migration in `supabase/migrations/202606140002_secure_lead_enquiries_privileges.sql`.
4. Add the Supabase URL and service role key to `.env.local`.
5. Set `EMAIL_DELIVERY_MODE=supabase` in `.env.local` to let Supabase own email delivery.
6. Apply `supabase/migrations/202606150001_add_lead_enquiry_email_delivery_tracking.sql`.
7. Deploy the Edge Function in `supabase/functions/send-enquiry-emails/index.ts`.
8. Add these secrets to your Supabase Edge Function environment:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `KM_FINANCING_NOTIFICATION_EMAIL`
   - `ENQUIRY_WEBHOOK_SECRET` (recommended)
9. Verify the sending domain inside Resend before using `RESEND_FROM_EMAIL`.
10. Run `supabase/sql/create_enquiry_email_webhook.sql` after replacing the project ref and webhook secret placeholders.
11. Set `NEXT_PUBLIC_SITE_URL` in `.env.local`, then restart the dev server.
12. Test the enquiry page and confirm the request reaches `/api/enquiries`.
13. Confirm the lead appears in Supabase and the notification emails are received.

## Environment variables

- Required for lead storage:
  - `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` or `SUPABASE_SECRET_KEY`
- Optional for app-owned email sending fallback:
  - `EMAIL_DELIVERY_MODE`
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `KM_FINANCING_NOTIFICATION_EMAIL`

When `EMAIL_DELIVERY_MODE=supabase` (the default), the web app only stores the lead and Supabase handles email delivery through the Edge Function webhook flow.

If Resend is not configured yet, the form will still store the lead in Supabase and skip the email sends.

## Security notes

- The browser never inserts directly into Supabase.
- The browser never calls Resend directly.
- `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_SECRET_KEY` is only read in server-only modules.
- Secrets are not prefixed with `NEXT_PUBLIC_`.
- `.gitignore` excludes local environment files.
- RLS is enabled on `public.lead_enquiries`, and public table privileges are revoked from `anon` and `authenticated`.
- Supabase now prefers newer secret keys (`sb_secret_...`) for fresh projects. If you use one, keep it server-side exactly the same way.
