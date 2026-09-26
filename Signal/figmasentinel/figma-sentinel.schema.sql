-- Figma Sentinel v1 — Postgres / Supabase
-- Namespace: figma_sentinel

create schema if not exists figma_sentinel;

create table if not exists figma_sentinel.ingest_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  window_start timestamptz not null,
  window_end timestamptz not null,
  status text not null check (status in ('running', 'ok', 'partial', 'failed')),
  events_pulled int not null default 0,
  mentions_written int not null default 0,
  rate_limit_hits int not null default 0,
  error_summary text
);

create table if not exists figma_sentinel.watermarks (
  key text primary key,
  last_created_utc bigint not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists figma_sentinel.mentions (
  id uuid primary key default gen_random_uuid(),
  reddit_fullname text not null unique,
  thread_id text not null,
  parent_id text,
  subreddit text not null,
  kind text not null check (kind in ('post', 'comment')),
  created_utc timestamptz not null,
  score int,
  permalink text,
  author_hash text,
  title text,
  body text,
  evidence_span text,
  entities jsonb not null default '{}'::jsonb,
  relevance real not null default 0,
  harvested_at timestamptz not null default now(),
  deleted_from_reddit boolean not null default false
);

create index if not exists mentions_created_idx
  on figma_sentinel.mentions (created_utc desc);
create index if not exists mentions_subreddit_idx
  on figma_sentinel.mentions (subreddit, created_utc desc);

create table if not exists figma_sentinel.classifications (
  mention_id uuid primary key references figma_sentinel.mentions(id) on delete cascade,
  sentiment_label text not null check (
    sentiment_label in ('love', 'like', 'mixed', 'dislike', 'hate', 'unclear')
  ),
  sentiment_score smallint not null check (sentiment_score between -2 and 2),
  intent text not null,
  confidence real not null,
  model text not null,
  classified_at timestamptz not null default now()
);

create table if not exists figma_sentinel.issues (
  id uuid primary key default gen_random_uuid(),
  mention_id uuid not null references figma_sentinel.mentions(id) on delete cascade,
  domain text not null,
  confidence real not null,
  unique (mention_id, domain)
);

create table if not exists figma_sentinel.issue_clusters (
  id uuid primary key default gen_random_uuid(),
  window_date date not null,
  domain text not null,
  label text not null,
  mention_count int not null,
  avg_sentiment real,
  weak_n boolean not null default false,
  mention_ids uuid[] not null
);

create table if not exists figma_sentinel.competitor_signals (
  id uuid primary key default gen_random_uuid(),
  mention_id uuid not null references figma_sentinel.mentions(id) on delete cascade,
  software_id text not null,
  relation text not null check (
    relation in ('substitute', 'complement', 'migration_source', 'migration_target', 'analog_workflow')
  ),
  job text,
  evidence_span text
);

create table if not exists figma_sentinel.hypotheses (
  id uuid primary key default gen_random_uuid(),
  report_date date not null,
  owner_team text not null check (owner_team in ('product', 'pmm', 'education', 'partnership')),
  statement text not null,
  action text not null,
  audience text not null,
  metric text not null,
  evidence_ids uuid[] not null,
  kill_criteria text not null,
  confidence real
);

create table if not exists figma_sentinel.daily_reports (
  report_date date primary key,
  run_id uuid references figma_sentinel.ingest_runs(id),
  markdown text not null,
  json_payload jsonb not null,
  quality_score real,
  created_at timestamptz not null default now()
);

create table if not exists figma_sentinel.audit_events (
  id uuid primary key default gen_random_uuid(),
  at timestamptz not null default now(),
  actor text not null,
  action text not null,
  detail jsonb
);

alter table figma_sentinel.mentions enable row level security;
alter table figma_sentinel.classifications enable row level security;
alter table figma_sentinel.issues enable row level security;
alter table figma_sentinel.competitor_signals enable row level security;
alter table figma_sentinel.hypotheses enable row level security;
alter table figma_sentinel.daily_reports enable row level security;

-- Headline metrics exclude unclear + low confidence
create or replace view figma_sentinel.v_headline_mentions as
select
  m.*,
  c.sentiment_label,
  c.sentiment_score,
  c.intent,
  c.confidence
from figma_sentinel.mentions m
join figma_sentinel.classifications c on c.mention_id = m.id
where m.deleted_from_reddit = false
  and c.sentiment_label <> 'unclear'
  and c.confidence >= 0.55;
