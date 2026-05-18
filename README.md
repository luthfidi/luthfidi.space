# Luthfi Hadi's Portfolio

Personal portfolio of Luthfi Hadi, Computer Science graduate, CTO of Lummy Ticket, and freelance product developer.

🔗 **Live:** [luthfidi-space.vercel.app](https://luthfidi-space.vercel.app)

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19, Turbopack)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [next-intl](https://next-intl-docs.vercel.app) — bilingual (English / Indonesian)
- [Motion](https://motion.dev) — animations
- [Zustand](https://zustand-demo.pmnd.rs) — client state
- [SWR](https://swr.vercel.app) — client-side data fetching for live widgets
- [Resend](https://resend.com) — contact form email
- [Vercel Analytics](https://vercel.com/analytics) — page analytics

## Features

- **8 pages** — Home, About, Projects, Achievements, Creations, Dashboard, Uses, Contact
- **Bilingual** — every page translated EN/ID, locale-aware URLs (`/en`, `/id`)
- **SEO-ready** — per-page metadata, JSON-LD (Person + WebSite + Article), sitemap.xml, robots.txt, hreflang
- **Dark mode** — system-aware, persisted preference
- **Live dashboard** — GitHub contribution calendar + WakaTime coding stats
- **Animated UI** — page transitions, hover effects, layout animations
- **Server Components** — static-data pages prerendered at build time for fast first paint
- **Custom cursor** — desktop only, respects `prefers-reduced-motion`

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

See `.env.example` for the full list. Notable ones:

| Variable | Purpose | Required? |
|---|---|---|
| `DOMAIN` | Canonical site URL used by metadata, sitemap, JSON-LD | Optional (auto-falls back to Vercel URL) |
| `NEXT_PUBLIC_AUTHOR_EMAIL` | Recipient address for contact form | Optional |
| `GITHUB_READ_USER_TOKEN_PERSONAL` | GitHub GraphQL token (scope: `read:user`) | Required for Dashboard contributions |
| `RESEND_API_KEY` | [Resend](https://resend.com/api-keys) API key | Required for contact form (falls back to console log) |
| `RESEND_FROM_EMAIL` | Verified Resend sender address | Optional (defaults to `onboarding@resend.dev`) |
| `WAKATIME_API_KEY` | [WakaTime](https://wakatime.com/api-key) API key | Required for Dashboard WakaTime stats |

## Scripts

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Project Structure

```
app/              # Next.js App Router pages + API routes
common/
  components/    # shared UI elements + layouts
  constants/     # static data + config
  helpers/       # utility functions
  libs/          # third-party wrappers
  stores/        # Zustand stores
  styles/        # global styles + fonts
  types/         # TypeScript shared types
data/            # static JSON content (projects, achievements, creations)
hooks/           # custom React hooks
i18n/            # next-intl config + navigation helpers
messages/        # i18n translation files (en.json, id.json)
modules/         # feature modules per page
public/          # static assets
services/        # data-fetching layer (read JSON, external APIs)
```

## Deployment

Auto-deploys to Vercel on push to `main`. Preview deployments created for each branch.
