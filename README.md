# KM Financing Supabase + Resend Starter

This starter matches the PDF requirements and keeps the Supabase service role key server-side only.

Do not import `lib/supabaseAdmin.ts`, `lib/resend.ts`, or `lib/env.ts` into any client component. Client components should only post JSON to `/api/enquiries`.

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

## Install

```bash
npm install @supabase/supabase-js resend zod
```

## Included files

- `app/api/enquiries/route.ts`: secure backend route for validation, persistence, and email delivery
- `lib/supabaseAdmin.ts`: server-only Supabase admin client
- `lib/resend.ts`: server-only Resend client
- `lib/enquiry-schema.ts`: shared Zod schema used by the route and example form
- `components/forms/EnquiryForm.tsx`: client example that only talks to `/api/enquiries`
- `supabase/migrations/202606140001_create_lead_enquiries.sql`: table creation and RLS migration

## Security notes

- The browser never inserts directly into Supabase.
- The browser never calls Resend directly.
- `SUPABASE_SERVICE_ROLE_KEY` is only read in server-only modules.
- RLS is enabled on `public.lead_enquiries`, and this starter does not add an anonymous insert policy.
- Supabase now prefers newer secret keys (`sb_secret_...`) for fresh projects. If you use one, keep it server-side exactly the same way.
