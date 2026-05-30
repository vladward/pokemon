# PokeWiki (v1.0.0)

A web portal about the Pokémon universe. The main goal of `v1.0.0` was to set up a custom, production-ready client
architecture from scratch using **React 19** and **TypeScript** without relying on standard CLI templates.

## 🛠 Architecture & Features

### Architecture & Folder Structure (FSD)

- **Feature-Sliced Design:** Structured the repository using the FSD methodology to ensure strict separation of concerns
  and high scalability.
- **Layers Used (v1.0.0):**
    - `app/`: Entry point, global style injections, and provider configs.
    - `shared/`: Reusable UI primitives, theme tokens, assets, and base SCSS variables/mixins.
- **Import Rules:** Configured strict path aliases (`@/*`) in `tsconfig.json` to manage clean boundaries between FSD
  layers.

### Build & Bundling Setup (Webpack 5)

- **Environment Splitting:** Split into `webpack.common.js`, `webpack.dev.js`, and `webpack.prod.js` using
  `webpack-merge`.
- **Cache Busting:** Included `[contenthash:8]` string interpolation for built bundles to prevent browser caching issues
  on new deployments.
- **Dev Speedups:** Enabled Webpack's persistent filesystem cache (`type: 'filesystem'`) to minimize rebuild times
  during active coding.
- **SVG Inlining:** Configured `@svgr/webpack` to treat raw `.svg` files as inline React components supporting dynamic
  `currentColor` inheritance.

### Styling & Theme Pipeline

- **Isolated Styles:** Component layouts use `.module.scss` sheets hashed down to `[hash:base64:8]` in production to
  eliminate global scope contamination.
- **Global Context Injection:** Shared theme tokens, variables, and media mixins (`@/shared/styles/_variables.scss`) are
  auto-injected into each style file via `sass-loader` configuration.
- **Theme Switcher:** Custom Light/Dark theme component. Syncs choices with `localStorage` and applies tokens via target
  `data-theme` selectors on the root document.

### Mobile UI & Responsiveness

- **Adaptive Layout:** Completely fluid grid designed with standard media queries nested inside SCSS modules.
- **Navigation Drawer:** Interactive slide-out burger menu for mobile. Implements body scroll-locking while the menu
  state is open to prevent double-scroll bugs.

### QA Gates & Automated Testing

- **Linters:** ESLint 9 flat configurations paired with Prettier check scripts and pre-build `tsc` validations.
- **Unit Testing:** Integrated `jest` + `ts-jest` and `@testing-library/react` with a `jsdom` environment.
- **E2E Testing:** Configured basic `playwright` frameworks for cross-browser integration smoke tests.

---

## 🚀 Available Scripts

Run these automation scripts in the project root directory:

| Script              | Purpose                                                                                          |
|:--------------------|:-------------------------------------------------------------------------------------------------|
| `npm run start`     | Boots up Webpack Dev Server on `http://localhost:3000` with active Hot Module Replacement (HMR). |
| `npm run build`     | Bundles the application into optimized, production-ready `/dist` assets.                         |
| `npm run lint`      | Runs automated ESLint 9 code style checking.                                                     |
| `npm run typecheck` | Triggers raw TypeScript compilation checks across the repository.                                |
| `npm run fix`       | Runs code styling auto-fixes via Prettier and lint engines.                                      |
| `npm run test`      | Executes Jest Unit-Testing suites.                                                               |
| `npm run test:e2e`  | Triggers active interaction checks via Playwright headless browser runners.                      |

---

## 🗺 Roadmap

- [x] **v1.0.0**: Custom Webpack pipeline, FSD architecture scaffolding, dark theme persistence, responsive landing
  page, mobile drawer UI, automated unit/e2e testing setup.
- [ ] **v2.0.0 (Next)**: Migration to **Next.js (App Router)**. Moving core data fetching to Server Components,
  adjusting FSD folder structure for Next.js routing requirements, replacing asset loaders with optimized `next/image`
  pipelines, and implementing multi-route caching mechanisms for the main Pokémon indexes.
