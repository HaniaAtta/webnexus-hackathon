# Production Multi-User Setup (Vercel + Supabase)

This project currently runs on frontend-only state in `localStorage`.
Use this setup to move to shared multi-user production data.

## 1) Create Supabase project

1. Create a new project in Supabase.
2. Open SQL Editor.
3. Run `supabase/schema.sql` from this repo.
4. Import participants/teams:
   - Option A (recommended): run the importer script in this repo (see below).
   - Option B: manually insert into `public.teams` and `public.users`.

## 2) Configure Vercel environment variables

Set these in Vercel Project Settings -> Environment Variables:

- `SUPABASE_URL` = your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` = service role key (server-only)
- `APP_JWT_SECRET` = random long secret (32+ chars)

## 3) API routes added

- `POST /api/auth/register` -> create user + app token
- `POST /api/auth/login` -> login + app token
- `GET /api/me` -> load current user (token)
- `GET /api/state/day` -> read global day state
- `PUT /api/state/day` -> update day state (admin only)
- `GET /api/theme/:userId` / `PUT /api/theme/:userId`
- `GET /api/progress/:userId` / `PUT /api/progress/:userId`
- `GET /api/leaderboard` -> shared leaderboard

For protected routes, send:

`Authorization: Bearer <token>`

## 4) Frontend migration notes (required next)

To fully switch off localStorage, update `app.js` data calls:

- login -> call `/api/auth/login` and store JWT (`wn_token`)
- replace:
  - `getUserProgress` / `saveUserProgress`
  - `getUserTheme` / `saveUserTheme`
  - `wn_current_day` local storage usage
  with API fetch calls and state cache.

This repo now uses:
- `/api/me`, `/api/state/day`, `/api/theme/:userId` (team theme), `/api/progress/:userId`, `/api/leaderboard`

## 4.1) Import participants (from Excel)

This project includes `data/participants.json` (from your Excel screenshots) and an importer:

```bash
npm install
export SUPABASE_URL="..."
export SUPABASE_SERVICE_ROLE_KEY="..."
node scripts/import-participants.mjs
```

## 5) Deploy

```bash
npm install
vercel
vercel --prod
```

## Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code.
- Keep all privileged DB writes behind server routes.
- Move to hashed passwords only (already implemented in register/login API).
