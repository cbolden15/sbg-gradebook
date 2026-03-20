-- EXTENSIONS
create extension if not exists "uuid-ossp";

-- ============================================================
-- TEACHERS
-- Mirrors auth.users; created via trigger on signup.
-- ============================================================
create table public.teachers (
  id                  uuid primary key references auth.users(id) on delete cascade,
  email               text not null unique,
  full_name           text,
  plan                text not null default 'free' check (plan in ('free', 'pro')),
  stripe_customer_id  text unique,
  stripe_sub_id       text unique,
  sub_status          text,
  sub_period_end      timestamptz,
  created_at          timestamptz not null default now()
);

-- Auto-create teacher row on auth.users insert
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.teachers (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- CLASSES
-- ============================================================
create table public.classes (
  id              uuid primary key default uuid_generate_v4(),
  teacher_id      uuid not null references public.teachers(id) on delete cascade,
  name            text not null,
  subject         text,
  grade_level     text,
  mastery_config  jsonb not null default '{"method":"highest","thresholds":{"4":97,"3":80,"2":65,"1":50}}'::jsonb,
  created_at      timestamptz not null default now(),
  constraint mastery_config_valid check (mastery_config ? 'method' and mastery_config ? 'thresholds')
);

-- ============================================================
-- STUDENTS
-- ============================================================
create table public.students (
  id         uuid primary key default uuid_generate_v4(),
  class_id   uuid not null references public.classes(id) on delete cascade,
  name       text not null check (char_length(name) <= 100),
  created_at timestamptz not null default now()
);

-- ============================================================
-- STANDARDS
-- ============================================================
create table public.standards (
  id          uuid primary key default uuid_generate_v4(),
  class_id    uuid not null references public.classes(id) on delete cascade,
  name        text not null check (char_length(name) <= 200),
  description text check (char_length(description) <= 500),
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- SCORES
-- ============================================================
create table public.scores (
  id           uuid primary key default uuid_generate_v4(),
  student_id   uuid not null references public.students(id) on delete cascade,
  standard_id  uuid not null references public.standards(id) on delete cascade,
  score        int not null check (score between 1 and 4),
  assessed_at  timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

-- Enforce that student and standard belong to the same class
create or replace function enforce_score_class_membership()
returns trigger language plpgsql as $$
begin
  if (select class_id from public.students where id = new.student_id) !=
     (select class_id from public.standards where id = new.standard_id) then
    raise exception 'student and standard must belong to the same class';
  end if;
  return new;
end;
$$;

create trigger check_score_class_membership
  before insert on public.scores
  for each row execute function enforce_score_class_membership();

-- ============================================================
-- INDEXES
-- ============================================================
create index scores_student_standard_idx on public.scores (student_id, standard_id, assessed_at desc);
create index classes_teacher_idx on public.classes (teacher_id);
create index students_class_idx on public.students (class_id);
create index standards_class_idx on public.standards (class_id, sort_order);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.teachers enable row level security;
alter table public.classes enable row level security;
alter table public.students enable row level security;
alter table public.standards enable row level security;
alter table public.scores enable row level security;

create policy "teachers_own" on public.teachers
  for all using (id = auth.uid());

create policy "classes_own" on public.classes
  for all using (teacher_id = auth.uid());

create policy "students_own" on public.students
  for all using (
    exists (select 1 from public.classes where id = students.class_id and teacher_id = auth.uid())
  );

create policy "standards_own" on public.standards
  for all using (
    exists (select 1 from public.classes where id = standards.class_id and teacher_id = auth.uid())
  );

create policy "scores_own" on public.scores
  for all using (
    exists (
      select 1 from public.students s
      join public.classes c on c.id = s.class_id
      where s.id = scores.student_id and c.teacher_id = auth.uid()
    )
  );

-- ============================================================
-- MASTERY GRID FUNCTION
-- SECURITY DEFINER with explicit ownership check to prevent
-- cross-tenant data exposure (security review finding S-03)
-- ============================================================
create or replace function get_mastery_grid(p_class_id uuid)
returns json
language plpgsql security definer set search_path = public
as $$
declare
  v_teacher_id uuid;
begin
  -- Verify ownership before any data access
  select teacher_id into v_teacher_id
  from public.classes
  where id = p_class_id;

  if v_teacher_id is null or v_teacher_id != auth.uid() then
    raise exception 'unauthorized';
  end if;

  return (
    with latest_scores as (
      select distinct on (student_id, standard_id)
        student_id, standard_id, score, assessed_at
      from public.scores
      where standard_id in (select id from public.standards where class_id = p_class_id)
      order by student_id, standard_id, assessed_at desc
    )
    select json_build_object(
      'students', (select json_agg(row_to_json(s) order by s.name) from public.students s where s.class_id = p_class_id),
      'standards', (select json_agg(row_to_json(st) order by st.sort_order) from public.standards st where st.class_id = p_class_id),
      'scores', (select json_object_agg(student_id::text || '_' || standard_id::text, score) from latest_scores)
    )
  );
end;
$$;
