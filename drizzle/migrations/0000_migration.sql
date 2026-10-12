create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end; $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.handle_first_admin();

create type public.report_status as enum ('reported', 'in_progress', 'resolved');
create type public.report_category as enum ('pothole', 'garbage', 'streetlight', 'water', 'other');

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  category report_category not null,
  description text not null check (char_length(description) between 5 and 1000),
  latitude double precision not null check (latitude between -90 and 90),
  longitude double precision not null check (longitude between -180 and 180),
  photo_path text,
  status report_status not null default 'reported',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert on public.reports to anon, authenticated;
grant update, delete on public.reports to authenticated;
grant all on public.reports to service_role;
alter table public.reports enable row level security;
create policy "Anyone can view reports" on public.reports for select to anon, authenticated using (true);
create policy "Anyone can submit reports" on public.reports for insert to anon, authenticated with check (status = 'reported');
create policy "Admins update reports" on public.reports for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete reports" on public.reports for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;
create trigger reports_touch before update on public.reports for each row execute function public.touch_updated_at();

create policy "Public read report photos" on storage.objects for select to anon, authenticated using (bucket_id = 'report-photos');
create policy "Anyone upload report photos" on storage.objects for insert to anon, authenticated with check (bucket_id = 'report-photos');

insert into public.reports (category, description, latitude, longitude, status) values
('pothole', 'Large pothole near the bus stop causing traffic slowdowns.', 28.6139, 77.2090, 'reported'),
('streetlight', 'Streetlight has been out for a week on this corner.', 28.6200, 77.2150, 'in_progress'),
('garbage', 'Overflowing garbage bins not collected.', 28.6080, 77.2010, 'resolved'),
('water', 'Water pipe leak flooding the sidewalk.', 28.6170, 77.1980, 'reported');