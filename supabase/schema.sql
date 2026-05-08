-- Core app tables for multi-user production.
-- Run in Supabase SQL editor.

create table if not exists public.users (
  id bigint generated always as identity primary key,
  username text unique not null,
  password_hash text not null,
  role text not null default 'participant',
  name text not null,
  team_name text null,
  phone text null,
  university text null,
  created_at timestamptz not null default now()
);

create table if not exists public.teams (
  name text primary key,
  created_at timestamptz not null default now()
);

-- Theme + timer are shared per team (members see same theme).
create table if not exists public.team_state (
  team_name text primary key references public.teams(name) on delete cascade,
  theme_id text null,
  theme_confirmed boolean not null default false,
  timer_start timestamptz null,
  updated_at timestamptz not null default now()
);

create table if not exists public.app_state (
  id int primary key,
  current_day int not null default 1,
  updated_at timestamptz not null default now()
);

insert into public.app_state (id, current_day)
values (1, 1)
on conflict (id) do nothing;

create table if not exists public.user_state (
  user_id bigint primary key references public.users(id) on delete cascade,
  theme_id text null,
  theme_confirmed boolean not null default false,
  timer_start timestamptz null,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  user_id bigint primary key references public.users(id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.count_true_values(obj jsonb)
returns int language sql immutable as $$
  select coalesce(sum(case when value = 'true'::jsonb then 1 else 0 end), 0)::int
  from jsonb_each(obj)
$$;

create or replace view public.leaderboard_view as
select
  u.id as user_id,
  u.name,
  u.username,
  u.role,
  u.team_name,
  ts.theme_id,
  public.count_true_values(up.progress) as total_points,
  least(100, public.count_true_values(up.progress)) as completion_pct,
  case
    when exists (
      select 1
      from jsonb_each(up.progress) e
      where e.key like '%_day2_%' and e.value = 'true'::jsonb
    ) then 2
    else 1
  end as day_reached
from public.users u
left join public.team_state ts on ts.team_name = u.team_name
left join public.user_progress up on up.user_id = u.id;

-- Simple brute-force protection for auth endpoints.
-- (Stores attempt counts + a lock window per IP + username + action.)
create table if not exists public.auth_attempts (
  id bigint generated always as identity primary key,
  ip_text text not null,
  username text not null,
  action text not null,
  attempts int not null default 0,
  locked_until timestamptz null,
  last_attempt_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(ip_text, username, action)
);

-- Team = Excel team list (group by team_name).
-- Used to power the "Team dropdown" leaderboard UI.
create or replace view public.leaderboard_team_view as
select
  coalesce(team_name, 'unassigned') as team_key,
  max(theme_id) as theme_id,
  count(*)::int as members_count,
  array_agg(name order by name) as member_names,
  sum(total_points)::bigint as team_points,
  round(avg(completion_pct))::int as completion_pct,
  max(day_reached) as day_reached
from public.leaderboard_view
where role <> 'admin'
group by coalesce(team_name, 'unassigned');

-- Seed admin/user examples (passwords need to be generated via register endpoint in practice).
