<!-- .github/copilot-instructions.md
     Purpose: concise, actionable guidance for AI coding agents working on this repo.
-->

# Quick guide for AI coding agents

This is a small Nuxt 4 single-repo web app. The goal of this file is to capture the minimal, actionable knowledge an AI agent needs to be productive without making risky assumptions.

## Quick start (what to run)

Install dependencies then run the dev server (npm is used in CI/scripts):

```bash
npm install
npm run dev
```

Build / preview commands are defined in `package.json`:

```bash
npm run build   # nuxt build
npm run preview # nuxt preview (local preview of production build)
```

Note: `postinstall` runs `nuxt prepare` (see `package.json`).

## Big-picture architecture

- Framework: Nuxt 4 (see `nuxt.config.ts`). Devtools are enabled (`devtools: { enabled: true }`).
- Client-only, file-based routing: pages under `app/pages/` map to routes (e.g. `app/pages/about.vue` -> `/about`).
- Layouts live in `app/layouts/` and are applied via `<NuxtLayout>` / page defaults. `app/app.vue` renders `<NuxtLayout><NuxtPage/></NuxtLayout>`.
- Static assets and public files are in the `public/` directory (served at `/`).

There are currently only a few Vue SFCs with static content (for example `app/pages/index.vue` and `app/pages/about.vue`). There is no API/backend code in the repository.

## Key files and what they show

- `package.json` — scripts and dependencies. Use npm scripts for local dev/CI.
- `nuxt.config.ts` — Nuxt configuration; compatibilityDate and devtools are explicitly set.
- `app/app.vue` — root wrapper; it uses `NuxtLayout` / `NuxtPage` pattern.
- `app/pages/*.vue` — page components (routes). Edit/create here to add pages.
- `app/layouts/*.vue` — layout components (`default.vue`, `public.vue`). Place shared wrappers or navigation here.
- `public/` — static assets like `favicon.ico`, `robots.txt`.

## Project-specific conventions and patterns

- Minimal, defaults-first: code favors simple SFC templates with no script/style blocks yet. When adding behavior, prefer the standard Nuxt composables (useFetch/useState/useRouter) to keep with framework conventions.
- Routing: add a Vue SFC under `app/pages/` to create a route. Example: add `app/pages/contact.vue` to create `/contact`.
- Layouts: pages default to `default.vue` unless a different layout is declared; code already wraps pages with `NuxtLayout` in `app/app.vue`.

## Integration points and dependencies

- Only direct dependencies declared: `nuxt`, `vue`, `vue-router`. There is no indication of external services or environment variables in the repo.
- If adding external integrations (APIs, auth), add configuration to `nuxt.config.ts` and document required env vars in `README.md`.

## Developer workflows & debugging notes

- Use `npm run dev` for fast feedback. Devtools are enabled in config which helps component inspection.
- Validate changes by building: `npm run build` then `npm run preview` to exercise production build paths.
- There are no tests or linters present. Avoid adding test frameworks without adding the relevant dependencies and scripts.

## Recommendations for automated edits by AI agents

- Keep changes small and local: edit files under `app/` for UI work or update `README.md`/`package.json` only when necessary.
- Run the dev server after edits to sanity-check behavior. If adding dependencies, update `package.json` and run `npm install`.
- If you add new routes or components, update the README or add brief comments to the new files explaining their role.
- Do not remove `postinstall` or other npm scripts unless you confirm an alternative is provided.

## Examples (concrete)

- Add route: create `app/pages/contact.vue` with a `<template><p>Contact</p></template>` to expose `/contact`.
- Use a layout: to force `public.vue` on a page, set <script setup> definePageMeta({ layout: 'public' }) in that page.

## If something is missing

If you need runtime environment variables, test suites, or build CI details that are not in this repo, ask the maintainers (or open an issue). Only add those after confirming required values and CI expectations.

---
Please review these instructions and tell me which parts feel incomplete or unclear (for example missing conventions you rely on, expected CI checks, or preferred styling/formatters). I'll iterate quickly.
