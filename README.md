# PokeWiki

A Pokédex web application built with **Next.js 15**, **Tailwind CSS**, and **Shadcn/UI**. All Pokémon data is copied
from [PokéAPI](https://pokeapi.co) into a local **MySQL** database — no runtime API calls, no rate limits.

## Tech Stack

| Layer     | Technology                          |
|:----------|:------------------------------------|
| Framework | Next.js 15 (App Router)             |
| Language  | TypeScript                          |
| Styling   | Tailwind CSS + Shadcn/UI (Radix UI) |
| State     | Zustand                             |
| i18n      | next-intl                           |
| Database  | MySQL 8 (Docker) via Prisma + mysql2 |
| Testing   | Jest + Testing Library, Playwright  |
| CI        | GitHub Actions                      |

---

## Project Architecture

The codebase follows **Feature-Sliced Design (FSD)** adapted for Next.js App Router:

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing (next-intl)
│   │   ├── pokemon/        # Pokémon list & detail pages
│   │   ├── skills/         # Moves/skills pages
│   │   ├── items/          # Items pages
│   │   └── game/           # Game info pages
│   ├── api/                # Route handlers (db-test, etc.)
│   └── _providers/         # Global React providers
├── views/                  # Page-level view components
│   ├── Home/
│   ├── Pokemon/
│   ├── Skills/
│   ├── Items/
│   ├── Game/
│   └── NotFound/
├── widgets/                # Layout units
│   ├── Header/
│   ├── Footer/
│   └── NavLinks/
├── features/               # User interactions
│   ├── LanguageSwitcher/
│   ├── PokemonSearch/
│   ├── ThemeSwitcher/
│   └── ToTopButton/
├── entities/               # Business domain
│   └── Pokemon/
└── shared/                 # Reusable primitives
    ├── ui/                 # Components (shadcn, BurgerButton, InfiniteSlider…)
    ├── config/             # i18n, navigation, jest config
    ├── lib/                # Hooks, utils, theme
    └── assets/             # Icons, images
```

### i18n

Locale routing via `next-intl` — all pages live under `/[locale]/`. Supported locales: **en, de, es, fr, nl, ru**.

> Dutch (`nl`) and Russian (`ru`) have no Pokémon translations in PokéAPI — the app falls back to `en` for
> Pokémon-specific content (names, descriptions, flavor texts).

---

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment file and fill in values
cp .env.example .env

# Start MySQL via Docker Compose
docker-compose up -d

# Apply database schema
npm run db:migrate

# Populate database from PokéAPI (~15–30 min)
npm run seed:all

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Switching databases

The `.env` file stores both connection strings. Use the npm scripts to switch the active `DATABASE_URL`:

```bash
npm run db:use:docker   # mysql://root:root@localhost:3306/pokemon
npm run db:use:tidb     # TiDB Cloud
```

---

## Available Scripts

### Application

| Command             | Action                            |
|:--------------------|:----------------------------------|
| `npm run dev`       | Start Next.js dev server with HMR |
| `npm run build`     | Build for production              |
| `npm run start`     | Start production server           |
| `npm run lint`      | ESLint check                      |
| `npm run typecheck` | TypeScript check (`tsc --noEmit`) |
| `npm run fix`       | Auto-fix with Prettier + ESLint   |
| `npm run test`      | Jest unit & integration tests     |
| `npm run test:e2e`  | Playwright end-to-end tests       |

### Database

| Command                   | Action                                      |
|:--------------------------|:--------------------------------------------|
| `npm run db:migrate`      | Create / update all 80+ tables (idempotent) |
| `npm run db:use:docker`   | Switch `DATABASE_URL` to local Docker MySQL |
| `npm run db:use:tidb`     | Switch `DATABASE_URL` to TiDB Cloud         |
| `npm run seed:all`        | Run full seed in correct dependency order   |
| `npm run seed:reset`      | Truncate all tables for a clean re-seed     |

---

## Database & Seeding

All Pokémon data is seeded once from PokéAPI and stored in MySQL. This gives full offline access and freedom to
query, extend, or index the schema however needed.

### Full seed order

`seed:all` runs everything in the correct order automatically:

```
db:migrate → version-groups → types → stats → growth-rates → egg-groups → natures →
encounter-methods → item-categories → item-attributes → items → berries → moves →
abilities → machines → pokemon → forms → characteristics → generations → regions →
versions → pokedex → locations
```

### Individual seeds

| Command                          | Records                                                                          |
|:---------------------------------|:---------------------------------------------------------------------------------|
| `npm run seed:pokemon`           | 1 350 Pokémon · species · sprites · moves · stats · abilities · evolution chains |
| `npm run seed:moves`             | 937 moves with effects, meta, flavor texts, stat changes                         |
| `npm run seed:abilities`         | 371 abilities with descriptions and flavor texts                                 |
| `npm run seed:types`             | 18 types with full damage relations (current + past)                             |
| `npm run seed:items`             | 2 176 items with effects, categories, attributes, flavor texts                   |
| `npm run seed:berries`           | 64 berries with flavor potency data                                              |
| `npm run seed:machines`          | 2 212 TM/HM/TR records                                                           |
| `npm run seed:forms`             | 1 578 Pokémon forms with sprites and types                                       |
| `npm run seed:locations`         | 1 096 locations · 1 246 areas · 31 866 encounter records                         |
| `npm run seed:natures`           | 25 natures with stat modifiers and Pokéathlon data                               |
| `npm run seed:stats`             | 9 base stats with localized names                                                |
| `npm run seed:growth-rates`      | 6 growth rates with full XP-per-level tables                                     |
| `npm run seed:egg-groups`        | 15 egg groups with localized names                                               |
| `npm run seed:characteristics`   | 30 characteristics with descriptions                                             |
| `npm run seed:generations`       | 9 generations with localized names                                               |
| `npm run seed:regions`           | 11 regions with localized names                                                  |
| `npm run seed:versions`          | 30 game versions with localized names                                            |
| `npm run seed:version-groups`    | 25 version groups                                                                |
| `npm run seed:pokedex`           | 35 regional Pokédexes with descriptions                                          |
| `npm run seed:encounter-methods` | 55 encounter methods with localized names                                        |
| `npm run seed:item-categories`   | 54 item categories with localized names                                          |
| `npm run seed:item-attributes`   | 8 item attributes with descriptions                                              |
| `npm run seed:sprites`           | Download sprite images to `public/sprites/`                                      |

### Resume & idempotency

Long-running seeds (`pokemon`, `moves`, `items`, `forms`, `locations`, `machines`) checkpoint progress in the
`seed_state` table. Interrupting and re-running resumes from the last completed batch. All seeds use
`INSERT ... ON DUPLICATE KEY UPDATE` and are safe to run multiple times.

---

## Prisma

Prisma is used to generate a fully-typed database client from the MySQL schema.

### Initial setup (run once after seeding the database)

These commands set up Prisma from scratch by introspecting the already-seeded MySQL database:

```bash
# 1. Install Prisma packages
npm install @prisma/client
npm install prisma --save-dev

# 2. Create prisma.config.ts and an empty prisma/schema.prisma
npx prisma init

# 3. Pull the existing MySQL schema into schema.prisma
npx prisma db pull

# 4. Split the monolithic schema into per-model files under prisma/schema/
node --experimental-modules prisma/split-prisma.js

# 5. Generate the typed Prisma client
npx prisma generate
```

After step 3, edit `prisma/schema.prisma` (or `prisma/schema/main.prisma` after the split) to point the datasource to `DATABASE_URL` from your `.env`, then run step 4 onward.

---

### Multi-file schema

The schema is split into individual `.prisma` files under `prisma/schema/` — one file per model. The datasource and generator config live in `prisma/schema/main.prisma`. Prisma reads the entire directory via `prisma.config.ts`:

```ts
// prisma.config.ts
export default defineConfig({
  schema: 'prisma/schema',
  datasource: { url: env('DATABASE_URL') },
});
```

### Generate the client

Run this after `npm install` (or any time the schema changes):

```bash
npx prisma generate
```

This picks up `prisma.config.ts` automatically and writes the typed client to `node_modules/@prisma/client`.

### Splitting a monolithic schema

If you have a single `prisma/schema.prisma` and want to split it into per-model files, run:

```bash
node prisma/split-prisma.js
```

The script extracts every `model`, `enum`, and `view` block into its own file in `prisma/schema/`, updates `main.prisma` to contain only the datasource/generator config, and deletes the original `schema.prisma`.

---

## Roadmap

- [x] **v1.0.0** — Custom Webpack 5 pipeline, FSD architecture, dark mode, Jest/Playwright/CI.
- [x] **v2.0.0** — Migrated to Next.js 15 App Router, Tailwind CSS, Shadcn/UI, next-intl i18n (6 locales), MySQL local
  database with full PokéAPI seed.
