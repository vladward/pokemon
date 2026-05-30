# PokeWiki (v1.0.0)

A modular web portal dedicated to the Pokémon universe. The primary milestone (`v1.0.0`) focuses on building a highly
scalable client-side architecture from scratch using **React 19** and **TypeScript**, driven by a custom **Webpack 5**
pipeline and strict architectural boundaries without pre-built boilerplate.

## 🛠 Project Architecture & Specs

### Feature-Sliced Design (FSD)

The repository strictly follows the FSD methodology to isolate business logic, features, and UI components:

- `app/` — Global setup, configuration types, and core providers (e.g., `ThemeProvider`).
- `pages/` — Main view layers (`Home` component) containing localized page sub-sections (`AbilitiesSection`,
  `EvolutionSection`, `LeagueSection`) and standalone UI models.
- `widgets/` — Structural layout units (`Header`, `Footer`, global `Layout` wrapper).
- `features/` — Independent user actions, including the persistent `ThemeSwitcher` and the reactive `ToTopButton`.
- `entities/` — Core business units and contextual components like `NavLinks`.
- `shared/` — Reusable infrastructure: asset catalogues (SVG icons/images), layout primitives (`Button`, `Container`,
  `InfiniteSlider`), custom reactive hooks (`useBreakpoints`), and low-level theme configurations.

### Custom Webpack 5 Pipeline

- **Decoupled Environments:** Configurations split cleanly across `webpack.common.js`, `webpack.dev.js`, and
  `webpack.prod.js`.
- **Bundle Splitting:** Active chunk isolation targeting `node_modules` into distinct vendor scripts to leverage browser
  caching.
- **Cache Control:** Bundled files are generated using explicit dynamic hash tags (`[contenthash:8]`) for reliable build
  invalidation upon production deployments.
- **Vector Handling:** Vector assets are compiled down into customizable React UI components through native
  `@svgr/webpack` hook-ins.

### Styling & Design Tokens

- **Scoped SCSS Modules:** Complete namespace isolation using encapsulated CSS modules hashed down to unique strings in
  production environments.
- **Automated Mixin Pipelines:** Global styles, custom tokens, and media breakpoints (`_variables.scss`, `_mixins.scss`)
  are automatically injected into child modules at compilation time using `sass-loader`.
- **Adaptive Breakpoints:** Layout transformations managed through a responsive fluid grid system and unified through
  the `useBreakpoints` execution state.

### Automated Testing & QA Gates

- **Unit & Integration:** Configured `jest` + `ts-jest` environments alongside `@testing-library/react` to test hook
  states, UI controls (`BurgerButton`), and theme context rules.
- **End-to-End (E2E):** Integrated `@playwright/test` matrix running isolated smoke tests covering client theme
  synchronization, infinite scrolling, and mobile drawer accessibility states.
- **CI Pipelines:** Automated GitHub Actions build validations (`ci.yml`) triggering code linting (`eslint 9`),
  formatting setups (`prettier`), and test suites on remote runners upon every push.

---

## 🚀 Available Scripts

Manage the local application environment through the following terminal controls:

| Command             | Action                                                                                           |
|:--------------------|:-------------------------------------------------------------------------------------------------|
| `npm run start`     | Fires up Webpack Dev Server on `http://localhost:3000` with active Hot Module Replacement (HMR). |
| `npm run build`     | Compiles and shrinks production-ready distribution assets directly into the `/dist` path.        |
| `npm run lint`      | Inspects syntax and formatting using ESLint 9 rules.                                             |
| `npm run typecheck` | Triggers a static compilation validation across the TS codebase (`tsc --noEmit`).                |
| `npm run fix`       | Automatically patches format style inconsistencies via Prettier and lint configurations.         |
| `npm run test`      | Launches the complete Jest unit and integration test runners.                                    |
| `npm run test:e2e`  | Executes headful or headless web interactions inside Playwright test sandboxes.                  |

---

## 🗺 System Evolution Roadmap

- [x] **v1.0.0**: Custom Webpack multi-stage compiler setup, strict Feature-Sliced Design structuring, dark mode
  synchronization layer, automated multi-tier QA test suites (Jest/Playwright/CI).
- [ ] **v2.0.0 (Next Release)**: Migrating the application workspace over to **Next.js (App Router)**. Moving core
  Pokédex indices to Server-Side Component rendering, adapting FSD layers into Next.js workspace folders, swapping
  generic file loaders for `next/image` compression networks, and adding server data caching to handle the public
  PokeAPI integrations.
