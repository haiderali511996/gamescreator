# Deploying Games Creator to cPanel (gamescreator.co)

This app runs on Node.js/Next.js, so it needs cPanel's **"Setup Node.js App"**
feature (Phusion Passenger) — a plain static-file hosting plan will not work.
Confirm your hosting plan includes this before starting; if it doesn't, you'll
need to upgrade or use a different host (Vercel, Railway, a VPS, etc.).

## 1. Prerequisites

- cPanel with **Setup Node.js App** available (under "Software").
- Node.js version 20+ available in that tool (check the dropdown when creating the app).
- A MongoDB Atlas cluster (or other reachable MongoDB) — the one already
  configured for this project works, but you must whitelist your server's IP
  (step 6).
- Domain `gamescreator.co` pointed at this cPanel account (nameservers or A
  record already configured with your registrar).

## 2. Get the code onto the server

Easiest: cPanel → **Git Version Control** → clone this repository directly
into a folder, e.g. `/home/<user>/gamescreator`. Point it at the
`claude/awesome-fermat-vewpsz` branch (or `main` once merged).

Alternative: `git clone` over SSH if your plan has terminal access, or upload
a zip via File Manager and extract it (make sure `.env.local` is **not**
included in the zip — you'll set env vars through cPanel instead).

## 3. Create the Node.js App

cPanel → **Setup Node.js App** → **Create Application**:

- **Node.js version**: 20.x or newer
- **Application mode**: Production
- **Application root**: the folder you cloned into (e.g. `gamescreator`)
- **Application URL**: `gamescreator.co` (and/or `www.gamescreator.co`)
- **Application startup file**: `server.js`

Click **Create**. cPanel will show you a command to "Enter to the virtual
environment" — copy it, you'll need it in the next step.

## 4. Set environment variables

Still in the Node.js App page, scroll to **Environment variables** and add:

| Name | Value |
|---|---|
| `MONGODB_URI` | your MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | a random 32+ byte secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | `https://gamescreator.co` |
| `ADMIN_SEED_EMAIL` | the admin login email you want |
| `ADMIN_SEED_PASSWORD` | the admin login password you want |
| `NODE_ENV` | `production` |

Save.

## 5. Install, build, and seed

Open cPanel's **Terminal** (or SSH in), run the "enter virtual environment"
command from step 3, `cd` into the app root, then:

```bash
npm install
npm run build
npm run seed
```

`npm run build` compiles the Next.js app (required — cPanel does not do this
automatically). `npm run seed` creates the admin user and sample content in
MongoDB; safe to skip on later deploys since it's idempotent.

## 6. Whitelist the server's IP in MongoDB Atlas

Find your server's outbound IP (`curl ifconfig.me` in the same terminal),
then in MongoDB Atlas → **Network Access** → **Add IP Address**, add it (or
add `0.0.0.0/0` temporarily to confirm connectivity works, then narrow it
down — not recommended long-term).

## 7. Start / restart the app

Back in **Setup Node.js App**, click **Restart**. Visit `https://gamescreator.co`
— you should see the homepage. Check `/admin/login` and sign in with the
`ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` you set.

Whenever you deploy new code (`git pull` in the app root), re-run
`npm install && npm run build`, then click **Restart** again in cPanel.

## 8. SSL

cPanel → **SSL/TLS Status** → run **AutoSSL** for `gamescreator.co` (usually
automatic if the domain already resolves to this server). `NEXTAUTH_URL` must
be the `https://` URL or admin login sessions/cookies can misbehave.

## Troubleshooting

- **App won't start / 503**: check the Node app's log (cPanel shows a link to
  it) — most often a missing/wrong env var, or `npm run build` was never run.
- **Admin login redirects loop**: `NEXTAUTH_URL` doesn't match the real
  domain/protocol, or `NEXTAUTH_SECRET` is missing.
- **Pages load but show empty content** (no games/team/blog posts): MongoDB
  isn't reachable — recheck `MONGODB_URI` and the Atlas IP whitelist (step 6).
- **"Another next dev server is running"**: irrelevant on cPanel — that's a
  local-dev-only message from `next dev`, not used here (`server.js` is used
  instead of `next dev`/`next start`).
