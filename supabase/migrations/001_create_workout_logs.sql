-- workout_logs: 단일 테이블로 모든 운동 기록 관리
-- exercises JSONB: [{ "name": "squat", "sets": [{ "w": 60, "r": 10 }] }]

create table if not exists public.workout_logs (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  date             date not null,
  routine_name     text not null,
  duration_minutes integer not null check (duration_minutes > 0),
  category         text not null,
  photo_url        text,
  exercises        jsonb not null default '[]'::jsonb,
  created_at       timestamptz not null default now()
);

-- 달력 조회: user_id + date 복합 인덱스
create index if not exists workout_logs_user_date_idx
  on public.workout_logs (user_id, date desc);

-- Row Level Security
alter table public.workout_logs enable row level security;

create policy "본인 기록만 조회 가능"
  on public.workout_logs for select
  using (auth.uid() = user_id);

create policy "본인 기록만 삽입 가능"
  on public.workout_logs for insert
  with check (auth.uid() = user_id);

create policy "본인 기록만 수정 가능"
  on public.workout_logs for update
  using (auth.uid() = user_id);

create policy "본인 기록만 삭제 가능"
  on public.workout_logs for delete
  using (auth.uid() = user_id);
