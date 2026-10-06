# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

DatAIJam is the landing site for a data + AI conference and 4-week hackathon in Guayaquil, Ecuador. It is a pnpm monorepo whose only package is `apps/web` (`@dataijam/web`): a React 19 + Vite + TypeScript SPA styled with Tailwind CSS v4. There is no backend — registration goes to an external Google Form. All user-facing copy, docs, and commit messages are in Spanish.

## Commands

Run from the repo root (pnpm 11, Node 24):

```bash
pnpm install --frozen-lockfile
pnpm dev            # Vite dev server for apps/web
pnpm build          # tsc -b && vite build (type-checking happens here)
pnpm lint           # eslint in apps/web
pnpm format:check   # prettier (pnpm format to write)
pnpm --filter @dataijam/web preview   # serve the production build
```

There is no test suite. CI (`.github/workflows/ci.yml`) runs `format:check`, `lint`, and `build`; run all three before opening a PR. A Husky pre-commit hook runs Prettier via lint-staged. Prettier style: single quotes, no semicolons, trailing commas, 100-column width.

## Architecture

- **Entry & routing**: `src/main.tsx` sets `data-theme` on `<html>` from `localStorage['dataijam-theme']` before render, then mounts `AppProviders` (Lenis smooth scrolling, enabled only on fine-pointer/hover devices), the router, and `AnalyticsGate`. `src/app/router.tsx` defines `/` (home), lazy-loaded `/terminos` and `/privacidad`, and a catch-all 404 outside `RootLayout`.
- **Features**: `src/features/landing/<section>/` each hold a component, a `*.data.ts` content file, and `types.ts`. Event content (speakers, agenda, FAQ, sponsors, locations, hackathon weeks) lives in the `.data.ts` files — edit those rather than the components. `src/pages/home-page.tsx` composes the sections and assigns the anchor ids (`#acerca`, `#sedes`, `#hackathon`, `#speakers`, …) used by header navigation. Legal pages follow the same pattern in `src/features/legal/`.
- **Shared UI**: `src/components/ui/` (animation primitives, `Button`, `Container`, `Wordmark`, `use-prefers-reduced-motion`) and `src/components/layout/` (header, footer, scroll progress).
- **Styling & theming**: Brand tokens are declared in `@theme` in `src/index.css` (`--color-brand-*`, font families, `text-h1`…`text-h4`/`text-body` scales) and **redefined under `:root[data-theme='light']`**, so the same `brand-*` class flips between dark and light modes. Always use `brand-*` tokens and the font/size utilities in components — never raw hex values. Larger section styling lives in `src/features/landing/landing-editorial.css` and a few colocated `.css` files.
- **Analytics** (`src/features/analytics/`): GA4 is fully inert unless `VITE_GA_MEASUREMENT_ID` is set to a valid `G-…` id. `gtag.js` is only injected after the visitor accepts in the consent banner; rejecting disables tracking and clears `_ga*` cookies. Page views are sent manually per route (`trackPageView`), and `registration_form_open` fires on the registration CTA. When adding a route, add its title in `trackPageView`.
- **Path alias**: `@/` → `apps/web/src/`.

## Deployment

Two targets that must stay in sync on security headers/CSP:

- **Production (VPS, `dataijam.com`)**: `apps/web/Dockerfile` builds the SPA and serves it via `infra/nginx/default.conf`; the host's nginx terminates TLS and proxies to the container. Deploys are automatic: a systemd timer on the VPS runs `infra/deploy/deploy.sh` every 2 minutes, which pulls `main` into `/opt/dataijam` and runs `docker compose -f compose.production.yaml --env-file .env.production up -d --build`. **Every commit merged to `main` goes live.** The VPS is shared with other projects — only touch dataijam's directory, units and container.
- **Vercel** (testing): root directory `apps/web`, configured by `apps/web/vercel.json`. `develop` is the testing environment; other branches get preview URLs.

If you add an external origin (script, image, font, API), update the CSP in **both** `infra/nginx/default.conf` and `apps/web/vercel.json`. See `docs/operations.md` for the full deploy and GA4 checklist.

## Content & design rules

- `docs/design/README.md` is the brand guide (palette, typography, logo assets, light/dark mode). Read it before visual changes.
- Never invent event facts — dates, figures, speakers, sponsors, prizes. Unconfirmed items use explicit placeholders (e.g. empty `sponsors` array renders labelled reserved slots; see `src/features/landing/sponsors/README.md`).
- Animations must respect reduced-motion preferences; mobile performance is tracked in `docs/production-readiness-review.md`.

## Git conventions

- Flow: `feature/…`, `fix/…`, `docs/…` branch off `develop` → PR to `develop` (tested on Vercel) → PR `develop` → `main` (production). Never commit directly to `main` or `develop`; create a branch, push it, and open a PR.
- Conventional commits with a scope, in Spanish (e.g. `fix(web): ajusta textos de preguntas frecuentes`).
- **Do not credit Claude**: no `Co-Authored-By: Claude …` trailer in commits and no "Generated with Claude Code" footer in PR descriptions.
