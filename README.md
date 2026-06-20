# AbaFans — Rwanda Football Match-Day Platform

A mobile-first football match-day platform for Rwanda and African football fans.

## Stack
- **Next.js 16** (App Router)
- **TypeScript**
- **TailwindCSS v4**
- **Supabase** (configured, schema below)
- **NextAuth / Auth.js** (configured)
- React Icons (Lucide)

## Quick start

```bash
cp .env.local.example .env.local
# Fill in your Supabase + NextAuth credentials
npm install
npm run dev
```

## Routes

| Route | Description |
|---|---|
| `/` | Homepage — live match ticker, leaderboard preview, predictions, venue highlights |
| `/matches` | Filtered match list (All / Live / Upcoming / Finished) |
| `/matches/[id]` | Match detail — score, predictions, fan stats, venues, WhatsApp share |
| `/venues` | Venue grid |
| `/venues/[slug]` | Venue detail — about, amenities, matches screening, friends, reviews, WhatsApp share |
| `/leaderboard` | Podium + full ranked table with period tabs |
| `/profile` | Fan profile — predictions, saved matches, stats |
| `/auth` | Sign in / Sign up (Google OAuth ready) |

## Supabase Schema

```sql
-- Users (extends Supabase Auth)
create table profiles (
  id uuid references auth.users primary key,
  username text unique,
  fullname text,
  bio text,
  avatar_url text,
  location text,
  points integer default 0,
  total_predictions integer default 0,
  correct_predictions integer default 0,
  streak integer default 0,
  joined_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Public profiles are viewable" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Teams
create table teams (
  id text primary key,
  name text not null,
  short_name text,
  country text,
  avatar_url text
);

-- Matches
create table matches (
  id text primary key,
  competition text not null,
  stage text,
  home_team_id text references teams(id),
  away_team_id text references teams(id),
  status text default 'scheduled',
  kickoff timestamptz,
  stadium text,
  home_score integer,
  away_score integer,
  minute text,
  created_at timestamptz default now()
);

-- Predictions
create table predictions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  match_id text references matches(id) on delete cascade,
  pick text check (pick in ('home','draw','away')),
  home_score_pred integer,
  away_score_pred integer,
  points_earned integer default 0,
  settled boolean default false,
  created_at timestamptz default now(),
  unique(user_id, match_id)
);
alter table predictions enable row level security;
create policy "Users can view own predictions" on predictions for select using (auth.uid() = user_id);
create policy "Users can insert own predictions" on predictions for insert with check (auth.uid() = user_id);

-- Venues
create table venues (
  id text primary key,
  name text not null,
  place text,
  about text,
  thumbnail_url text,
  screens integer,
  capacity integer,
  food boolean default true,
  drinks boolean default true,
  entry_fee integer,
  phone text,
  address text,
  city text,
  created_at timestamptz default now()
);

-- Venue match screenings
create table venue_matches (
  venue_id text references venues(id),
  match_id text references matches(id),
  primary key (venue_id, match_id)
);

-- Saved matches
create table saved_matches (
  user_id uuid references profiles(id) on delete cascade,
  match_id text references matches(id) on delete cascade,
  primary key (user_id, match_id)
);
alter table saved_matches enable row level security;
create policy "Users can manage own saved matches" on saved_matches using (auth.uid() = user_id);
```

## Environment Variables Required

See `.env.local.example` for all required variables.

## Features Implemented

- ✅ Today's Matches with live scores + status badges
- ✅ Match detail page — scores, predictions, head-to-head, venues
- ✅ Fan Predictions widget — pick winner + exact score
- ✅ Prediction bars showing community vote split
- ✅ Leaderboard with podium, full ranked table, period filters
- ✅ Venue list + venue detail pages
- ✅ WhatsApp sharing for matches and venues
- ✅ Venue amenities, friends watching, reviews, match screening schedule
- ✅ Search modal — teams, venues, fans
- ✅ User profile — predictions tab, saved matches, stats
- ✅ Auth page — sign in / sign up with Google OAuth stub
- ✅ Mobile bottom navigation
- ✅ Bookmark / save matches
- ✅ Dark theme design system (CSS variables)
- ✅ 100% mobile-first, responsive
- ✅ TypeScript strict mode, zero build errors

## Next Steps (Phase 2)

- Wire Supabase real-time for live scores
- Complete NextAuth Google OAuth flow
- Admin dashboard for match + venue management
- Push notification support (Web Push / WhatsApp Business API)
- Venue promotion / sponsorship banners
