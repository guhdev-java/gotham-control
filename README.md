# Nocturne Control Center

Original noir tactical control interface built with React, TypeScript, Vite and Leaflet.

Nocturne Control Center is a fictional city operations console for Nocturne City. It combines a live dashboard, mission control, target files, Aegis equipment, a local SVG district map, logs, profile state and an interactive terminal into one connected simulation.

All names, districts, dossiers, missions, gadgets and map artwork are original fictional material. The app does not use external map APIs, backend services or private API keys.

## Highlights

- Connected local simulation for missions, villains, gadgets, logs and operator identity.
- Tactical dashboard with radar, priority mission, priority target, incident feed and threat breakdown.
- Leaflet-powered custom city map using `CRS.Simple` and a local SVG overlay.
- District intel panel, compact tactical map markers and direct links into missions or target files.
- Mission, villain and gadget collections with search, filters, empty states and responsive cards.
- Sentinel Terminal with commands backed by the same application state.
- Persistent operator onboarding, editable profile, JSON import/export and reset flow.
- Global command palette with `Ctrl/Cmd + K`.
- Optional interface effects, sound toggle, high-contrast mode and reduced-motion support.
- Responsive sidebar/drawer navigation for desktop and mobile.
- Toast feedback, confirmation dialogs, route skeletons and typed reducer tests.

## Tech Stack

- React 19
- TypeScript
- Vite
- Leaflet
- ESLint
- Vitest
- Testing Library
- CSS organized by page/component

## Getting Started

```bash
npm ci
npm run dev
```

The development server uses the Vite base path configured for the GitHub Pages repository:

```text
/nocturne-control/
```

Use `npm install` only when intentionally changing dependencies. For normal development and CI, `npm ci` installs the exact dependency tree from `package-lock.json`.

## Scripts

```bash
npm run dev       # start local Vite server
npm run lint      # run ESLint
npm run test      # run Vitest tests once
npm run build     # typecheck and build production assets
npm run preview   # preview the production build
```

## Quality Checks

Before pushing changes, run:

```bash
npm run lint
npm run test
npm run build
```

The test suite covers state migration, operator identity preservation, connected mission actions and boot screen behavior.

## App Routes

| Route | Purpose |
| --- | --- |
| `/dashboard` | Tactical overview, threat breakdown and priority signals |
| `/gravemere` | Villain archive and target dossiers |
| `/missions` | Mission queue, status filters and resolve actions |
| `/aegis` | Gadget inventory and deployment controls |
| `/terminal` | Command-line interface into the app state |
| `/map` | Local Leaflet district map and signal intel |
| `/profile` | Operator profile and save import/export |
| `/logs` | Operational event history |

## Terminal Commands

Inside the app terminal, try:

```text
help
status city
list villains
list missions
list gadgets
open vesper
open night rover
deploy linecaster
capture vesper
resolve vesper
scan gravemere
signal on
whoami
go map
reset state
clear
```

## Map System

The map uses Leaflet with a simple coordinate system and a local SVG overlay:

```text
public/maps/nocturne-custom-map.svg
```

There is no Google Maps, Mapbox, tile server or external cartography dependency. District selection uses local bounds and markers from `src/pages/NocturneMap.tsx`.

## Project Structure

```text
public/maps     Custom Nocturne map overlay
src/components  Shared UI components
src/data        Static fictional domain data
src/hooks       UI interaction hooks
src/pages       Main app screens
src/state       Reducer, context, persistence and tests
src/styles      Global, page and component CSS
src/types       Domain TypeScript models
src/utils       Asset, audio, slug and UI event helpers
```

Additional project context lives in:

```text
DESIGN.md       Visual system, interaction rules and UI constraints
PRODUCT.md      Product purpose, audience and design principles
```

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`.

The workflow installs dependencies, runs lint, tests, production build, uploads `dist/` and deploys to GitHub Pages.

## Git Hygiene

The repository ignores:

- dependency and build output (`node_modules/`, `dist/`)
- local env files while keeping `.env.example`
- coverage, reports, generated screenshots and cache folders
- local agent/session metadata (`.agents/`, `.codex/`)
- private key/certificate formats
- local raster asset folders that are not cleared for repository use

Keep committed assets original, lightweight and cleared for public use.

## License / Usage

Nocturne Control Center is an original fictional portfolio/study project. Do not add real agencies, real dossiers, real people, real brands, real maps or recognizable franchise material.
