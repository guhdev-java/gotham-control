# Gotham Control Center

A fan-made Batman-inspired tactical control interface built with React, TypeScript and Vite.

The project simulates a WayneTech/Batcomputer-style dashboard with Gotham surveillance, Arkham records, active missions, tactical equipment, a custom interactive city map and an interactive terminal.

## Fan Project Disclaimer

This is a personal, non-commercial fan project made for study, practice and portfolio purposes.

Batman, Gotham, Arkham, WayneTech and related names, characters and visual references belong to their respective rights holders, including DC Comics and Warner Bros. This project is not official, not licensed, not endorsed and not affiliated with DC Comics, Warner Bros. or any related company.

Images and references used here are for fan-made educational experimentation only. If you own any asset used in this project and want it removed, please open an issue or contact the repository owner.

## Screenshots

![Dashboard](images/Captura_de_tela_20260707_193513.png)
![Arkham and Missions](images/Captura_de_tela_20260707_193530.png)
![WayneTech and Terminal](images/Captura_de_tela_20260707_193544.png)
![Gotham Map and Profile](images/Captura_de_tela_20260707_193554.png)
![Logs and Villain Detail](images/Captura_de_tela_20260707_193600.png)

## Features

- Noir Gotham visual theme with rain, scanlines and cinematic background.
- URL-based navigation for Dashboard, Arkham, Missions, WayneTech, Terminal, Map, Profile and Logs.
- Tactical dashboard with radar, threat index, incident feed and priority operation.
- Villain, mission and gadget cards using local images and typed data.
- Interactive Bat Terminal with commands backed by real project data.
- Local in-memory state with persistence via localStorage.
- Leaflet-powered custom Gotham district map with local SVG cartography, tactical markers and district intel.
- Batman profile file.
- Smooth page transitions, animated HUD effects, interactive card tilt and responsive controls.
- Responsive layout for desktop and mobile.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Terminal Commands

Inside the app terminal, try:

```text
help
status city
list villains
list missions
list gadgets
open joker
open batmobile
deploy grapple
capture joker
resolve joker
scan arkham
signal on
reset state
clear
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Leaflet
- ESLint
- CSS modules by feature/style file

## Project Structure

```text
src/components  Shared UI components
src/data        Static Gotham domain data
src/pages       Main app screens
src/styles      Theme and page/component CSS
src/types       Domain TypeScript models
public/cards    Local card images
public/backgrounds Local background images
public/maps     Custom Gotham map overlays
public/profile  Local profile images
```

## Map System

The Gotham map uses Leaflet with `CRS.Simple` and a local SVG overlay at:

```text
public/maps/gotham-custom-map.svg
```

No Google Maps API key or external map service is required. Large generated 3D model exports should stay out of git; see `.gitignore`.

## License / Usage

This repository is intended as a personal fan project. Do not use it commercially or present it as an official Batman/DC product.
