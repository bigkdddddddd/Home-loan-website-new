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
- Homepage forms for:
  - Main contact form
  - Book a Free Consultation form
  - Check Your Options form
- Shared `app/api/enquiries/route.ts` backend with:
  - Zod validation
  - Honeypot spam protection
  - Supabase lead storage
  - Resend notification emails
  - Optional customer confirmation emails
- Server-only Supabase admin client and Resend client
- SQL migration for `lead_enquiries`

## Local development

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in the required environment variables.
4. Run `npm run dev`.
5. Visit `http://localhost:3000`.

## Route map

- `/`
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
3. Add the Supabase URL and service role key to `.env.local`.
4. Create a Resend API key.
5. Add the Resend API key to `.env.local`.
6. Add `RESEND_FROM_EMAIL=info@kmfinancing.com` and `KM_FINANCING_NOTIFICATION_EMAIL=info@kmfinancing.com` to `.env.local`.
7. Set `NEXT_PUBLIC_SITE_URL` in `.env.local`, then restart the dev server.
8. Verify the `kmfinancing.com` sending domain inside Resend before using `info@kmfinancing.com`.
9. Test each form and confirm the request reaches `/api/enquiries`.
10. Confirm the lead appears in Supabase and the notification email is received.

## Security notes

- The browser never inserts directly into Supabase.
- The browser never calls Resend directly.
- `SUPABASE_SERVICE_ROLE_KEY` is only read in server-only modules.
- Secrets are not prefixed with `NEXT_PUBLIC_`.
- `.gitignore` excludes local environment files.
- RLS is enabled on `public.lead_enquiries`, and this project does not add an anonymous insert policy.
- Supabase now prefers newer secret keys (`sb_secret_...`) for fresh projects. If you use one, keep it server-side exactly the same way.
