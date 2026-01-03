-- Create events table
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  start_date timestamptz not null,
  end_date timestamptz not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create attendees table
create table if not exists public.attendees (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  email text not null,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.events enable row level security;
alter table public.attendees enable row level security;

-- Events policies
create policy "Users can view their own events"
  on public.events for select
  using (auth.uid() = created_by);

create policy "Users can create their own events"
  on public.events for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own events"
  on public.events for update
  using (auth.uid() = created_by);

create policy "Users can delete their own events"
  on public.events for delete
  using (auth.uid() = created_by);

-- Attendees policies
create policy "Users can view attendees of their events"
  on public.attendees for select
  using (
    exists (
      select 1 from public.events
      where events.id = attendees.event_id
      and events.created_by = auth.uid()
    )
  );

create policy "Users can add attendees to their events"
  on public.attendees for insert
  with check (
    exists (
      select 1 from public.events
      where events.id = attendees.event_id
      and events.created_by = auth.uid()
    )
  );

create policy "Users can update attendees of their events"
  on public.attendees for update
  using (
    exists (
      select 1 from public.events
      where events.id = attendees.event_id
      and events.created_by = auth.uid()
    )
  );

create policy "Users can delete attendees from their events"
  on public.attendees for delete
  using (
    exists (
      select 1 from public.events
      where events.id = attendees.event_id
      and events.created_by = auth.uid()
    )
  );

-- Create index for better performance
create index if not exists events_created_by_idx on public.events(created_by);
create index if not exists attendees_event_id_idx on public.attendees(event_id);
