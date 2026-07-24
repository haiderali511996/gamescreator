# Games Creator

Marketing website and admin CMS for **Games Creator**, a video game development studio.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **MongoDB** via **Mongoose**
- **NextAuth.js** (Credentials provider) for admin authentication
- All backend logic runs as Next.js Route Handlers under `src/app/api/**` — no separate Node/Express server needed

## Pages

Home, About Us, Vision, Mission, Privacy Policy, Terms of Service, Blogs (+ post detail), Contact Us, Career, Games (+ game detail), Team, and Submit Game — plus a mega-menu navbar with a dedicated **Submit Game** CTA button.

## Admin Panel (`/admin`)

Protected by NextAuth session (see `src/proxy.ts`). Lets an admin manage:

- Blog posts
- Team members
- Games
- Career postings
- View newsletter subscribers
- View & triage game submissions and contact messages

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

   - `MONGODB_URI` — your MongoDB connection string (Atlas or local)
   - `NEXTAUTH_SECRET` — a random secret (`openssl rand -base64 32`)
   - `NEXTAUTH_URL` — `http://localhost:3000` for local dev
   - `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` — credentials for the admin account the seed script creates

3. Seed the database (creates the admin user + sample games/team/careers/blog posts, idempotent):

   ```bash
   npm run seed
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Log in to the admin panel at `http://localhost:3000/admin/login` with the `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` you set in `.env.local`.

## Branding

The real logo/favicon files weren't available on disk when this was built, so `src/components/Logo.tsx` and `src/app/icon.tsx` contain a CSS/SVG placeholder mark matching the brand's hexagonal "GC" monogram in white/amber on black. Drop the real logo at `public/images/logo.png` and swap the internals of those two files for an `<Image>` tag to use the real assets — every call site stays the same.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — lint
- `npm run seed` — seed the database
