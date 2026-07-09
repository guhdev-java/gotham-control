---
name: Nocturne Control Center
description: Original noir tactical control interface for a fictional city simulation.
colors:
  bg: "#050505"
  bg-deep: "#020203"
  panel: "#0c0e11e0"
  panel-soft: "#12151ac7"
  panel-border: "#d6b35a29"
  text: "#e6e0d3"
  muted: "#85817a"
  muted-strong: "#aaa394"
  signal: "#d6b35a"
  signal-dim: "#8f7332"
  danger: "#a33a32"
  success: "#668a5b"
  tech: "#5f7f92"
typography:
  display:
    fontFamily: '"IBM Plex Mono", "Cascadia Code", "Courier New", monospace'
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "3px to 5px"
  headline:
    fontFamily: '"IBM Plex Mono", "Cascadia Code", "Courier New", monospace'
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "2px to 3px"
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"IBM Plex Mono", "Cascadia Code", "Courier New", monospace'
    fontSize: "0.65rem to 0.75rem"
    fontWeight: 700
    letterSpacing: "1.5px to 3px"
rounded:
  keycap: "3px"
  circular: "50%"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "46px"
components:
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
  button-signal:
    backgroundColor: "#d6b35a0f"
    textColor: "{colors.signal}"
    padding: "10px 14px"
  input-command:
    backgroundColor: "#080a0cd6"
    textColor: "{colors.muted-strong}"
    padding: "10px 12px"
---

# Design System: Nocturne Control Center

## 1. Overview

**Creative North Star: "The Rain-Slick Operations Desk"**

The system is a dense fictional command interface viewed after midnight: black metal surfaces, amber signal light, radar green system states, blue technical hardware, and red risk warnings. It should feel like a working local console, not a landing page, not a replica of any real agency, and not a familiar franchise skin.

Density is part of the identity. Panels, maps, terminal output, cards, logs, and navigation should present information with confidence, using atmosphere as a layer over structure rather than a substitute for structure.

**Key Characteristics:**
- Dark, nearly black base surfaces with amber as the primary tactical signal.
- Mono headings and labels paired with readable sans-serif body text.
- Thin borders, scanlines, radar marks, corner brackets, and restrained glows.
- Rectangular operational surfaces; circular forms are reserved for radar, markers, and pulses.
- Optional atmospheric effects with high-contrast and reduced-motion support.

## 2. Colors

The palette is noir-first: deep blacks carry the interface, amber marks command signal, green marks live status, blue marks technical equipment, and red marks danger.

### Primary
- **Signal Amber** (#d6b35a): Primary action, active signal, focus outline, command accents, skeleton shimmer, and tactical highlights. It should stay rare enough to feel important.
- **Dim Signal Bronze** (#8f7332): Secondary amber tone for subdued tactical marks and inactive signal echoes.

### Secondary
- **Radar Green** (#668a5b): Online state, radar panels, system health, and resolved or stable statuses.
- **Aegis Blue** (#5f7f92): Equipment, map intelligence, hardware systems, and technical overlays.

### Tertiary
- **Threat Red** (#a33a32): Reset, warning, mission risk, unresolved incidents, and destructive actions.

### Neutral
- **Blackout Field** (#020203): Root background and deepest page base.
- **Console Black** (#050505): Default body ground.
- **Panel Alloy** (#0c0e11e0): Main panel surface.
- **Soft Panel Alloy** (#12151ac7): Secondary control and toolbar surface.
- **Warm Bone Text** (#e6e0d3): Primary text.
- **Muted File Gray** (#85817a): Secondary text.
- **Strong Muted File Gray** (#aaa394): Form text, explanatory copy, and stronger metadata.

### Named Rules

**The Fictional Signal Rule.** Color may suggest tactical function, but it must not invoke real agencies, real map products, or recognizable franchise palettes.

**The Amber Budget Rule.** Amber is for command, focus, active state, and signal. Avoid coating whole screens in amber glow.

## 3. Typography

**Display Font:** IBM Plex Mono with Cascadia Code and Courier New fallbacks.
**Body Font:** Inter with system sans fallbacks.
**Label/Mono Font:** IBM Plex Mono.

**Character:** The type system reads like filed intelligence: mono for labels, headings, badges, keycaps, and terminal surfaces; sans for readable operational copy.

### Hierarchy
- **Display** (bold, uppercase, 3px to 5px letter spacing): Page titles and major system headings.
- **Headline** (bold, uppercase, 2px to 3px letter spacing): Panel headings, module names, and dossier titles.
- **Title** (bold mono or semibold sans): Card titles, dialog headings, and command results.
- **Body** (regular sans, 1.45 to 1.7 line-height): Explanatory copy, logs, mission descriptions, and profile text.
- **Label** (0.65rem to 0.75rem mono, uppercase, 1.5px to 3px letter spacing): Status badges, metadata, nav state, radar readouts, and toolbar labels.

### Named Rules

**The Filed, Not Posterized Rule.** Do not use oversized display typography inside compact tools, sidebars, dialogs, cards, or command results. The product is a console first.

## 4. Elevation

Depth is a hybrid of tonal layering, thin borders, inset darkness, and heavy black shadows. Surfaces should feel embedded in the console until interaction lifts or illuminates them.

### Shadow Vocabulary
- **Heavy Console Shadow** (`0 28px 90px rgba(0, 0, 0, 0.62)`): Main panels and framed page modules.
- **Raised Card Shadow** (`0 18px 54px rgba(0, 0, 0, 0.42)`): Cards at rest.
- **Active Card Shadow** (`0 22px 62px rgba(0, 0, 0, 0.54), 0 0 20px rgba(214, 179, 90, 0.055)`): Hovered or focused amber-signaled cards.
- **Modal Blackout Shadow** (`0 35px 140px #000`): Command palette and critical dialogs.
- **Inset Radar Depth** (`inset 0 0 40px rgba(0, 0, 0, 0.32)`): Radar frames, terminal panes, and embedded readouts.

### Named Rules

**The Console Depth Rule.** Shadows deepen the tool; they do not create glass cards. Blur is allowed for modal backdrops, not as the default surface material.

## 5. Components

### Buttons

- **Shape:** Rectangular, sharp, bordered controls; keycaps may use a small 3px radius.
- **Primary:** Amber text on a low-alpha amber surface with a thin amber border and compact tactical padding.
- **Hover / Focus:** Border brightens, surface gains a subtle amber fill, and `:focus-visible` uses a 2px amber outline with 3px offset.
- **Danger:** Red border and red-tinted text, used only for reset or destructive flows.

### Chips

- **Style:** Mono labels, thin borders, low-alpha tinted backgrounds, and concise status text.
- **State:** Active and selected states earn brighter border contrast; inactive states stay muted.

### Cards / Containers

- **Corner Style:** Mostly square corners; avoid decorative rounding except circular radar and marker elements.
- **Background:** `var(--panel)` or `var(--panel-soft)` over deep black.
- **Shadow Strategy:** Resting cards use black depth; active cards add a faint amber or blue glow.
- **Border:** Thin amber, green, blue, or red borders with low alpha based on semantic role.
- **Internal Padding:** 16px to 24px for cards, 28px to 46px for page-level modules.

### Inputs / Fields

- **Style:** Dark embedded fields with thin amber-tinted borders and muted-strong text.
- **Focus:** Border shifts toward amber; browser outline is replaced only when the custom focus state remains visible.
- **Error / Disabled:** Disabled controls reduce opacity and keep cursor semantics; destructive confirmations use explicit dialog copy.

### Navigation

The sidebar is the operating rail: dense, icon-led, mono-labeled, and stateful. Active routes show both color and text state. Mobile collapses to a drawer with a backdrop rather than turning the whole app into a landing-page stack.

### Signature Component

Radar, map signals, terminal output, boot initialization, and command palette form the signature interaction set. They should remain fictional, data-backed where possible, and restrained enough that user control stays ahead of spectacle.

## 6. Do's and Don'ts

### Do:

- **Do** keep every dossier, place, operator artifact, route, and map element original to Nocturne.
- **Do** use amber (#d6b35a) for command and focus, green (#668a5b) for online or stable state, blue (#5f7f92) for equipment and intelligence, and red (#a33a32) for danger.
- **Do** preserve keyboard access, focus visibility, high-contrast mode, and reduced-motion behavior whenever adding effects.
- **Do** prefer dense, readable product UI over marketing hero composition.
- **Do** let actions echo across state, logs, terminal feedback, missions, and map signals when the feature implies connected simulation.

### Don't:

- **Don't** use real agencies, real cities, real maps, real villains, real corporate brands, real logos, or real dossiers.
- **Don't** imitate Gotham, Batman-adjacent interfaces, Marvel/DC command centers, CIA/FBI/police dashboards, Google Maps, military targeting software, Bloomberg terminals, cyberpunk neon templates, generic SaaS admin dashboards, glassmorphism-heavy AI mockups, or purple-gradient dark-mode products.
- **Don't** use gradient text, nested cards, decorative glass surfaces, or colored side-stripe borders greater than 1px.
- **Don't** make amber a background theme; it is a signal, not the room.
- **Don't** add atmospheric motion without a reduced-motion path and a user-facing way to calm the interface when appropriate.
