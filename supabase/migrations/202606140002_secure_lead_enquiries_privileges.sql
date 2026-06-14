revoke all on table public.lead_enquiries from anon, authenticated;
grant all on table public.lead_enquiries to service_role;

drop policy if exists service_role_manage_lead_enquiries
  on public.lead_enquiries;

create policy service_role_manage_lead_enquiries
  on public.lead_enquiries
  for all
  to service_role
  using (true)
  with check (true);
