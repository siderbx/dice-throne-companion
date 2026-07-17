# Dice Throne Companion

A companion app for Dice Throne tabletop play, covering four modes: PVP (1v1/FFA/team duels), Missions (co-op vs Henchmen/Boss with a Crisis Clock), Adventures (8-scenario campaign with scoring), plus a shared Rules/Status-Effects reference and a Perk Sheet. It replaces paper trackers (HP, Momentum, CP, status tokens, campaign scoring) with live, tappable UI.

The app lives in [`companion-app/`](companion-app) — a React + TypeScript + Vite single-page app. There is no separate design prototype anymore; `companion-app` is the product. See [`companion-app/README.md`](companion-app/README.md) for dev commands and [`DEVLOG.md`](DEVLOG.md) for a running log of work.

## Screens

Routed via a `screen` string in app state ([`store.tsx`](companion-app/src/store.tsx)) — no URL routing, just in-memory navigation plus a global nav bar (`TopNav`) for Home/Back.

1. **Hub** ([`Hub.tsx`](companion-app/src/components/Hub.tsx)) — Launcher with three mode tiles (PVP / Missions / Adventures) and a Resume bar for the in-progress session.
2. **Missions Dashboard** ([`MissionsDashboard.tsx`](companion-app/src/components/MissionsDashboard.tsx)) — New Game entry point, tools list (Turn Guide, Crisis Clock, Trackers, Status Effects, Rules), hero roster strip.
3. **Setup (Missions)** ([`SetupMissions.tsx`](companion-app/src/components/SetupMissions.tsx)) — Hero count/name setup; computes Starting/Max HP, enemy dice pool, and Crisis Clock advance rate from rulebook tables.
4. **Play (Phase Rail)** ([`PlayMissions.tsx`](companion-app/src/components/PlayMissions.tsx)) — Round phases for Henchmen Side / Boss Side, dice results, pending attacks, Crisis Clock.
5. **Trackers** ([`Trackers.tsx`](companion-app/src/components/Trackers.tsx)) — Per-hero HP/Momentum/status-effect tracking (up to 4 heroes), plus Crisis Clock and enemy pool.
6. **Perks** ([`Perks.tsx`](companion-app/src/components/Perks.tsx)) — Per-player Combat/Momentum perk unlock grid across 5 difficulties, New Game+ tracker, session Perk Points.
7. **Status Effects Reference** ([`StatusEffects.tsx`](companion-app/src/components/StatusEffects.tsx)) — Filterable card grid of all 22 status effects.
8. **Rules & Reference** ([`Rules.tsx`](companion-app/src/components/Rules.tsx)) — Category-filtered rule browser, 71 entries across Core/Missions/Adventures/PVP, with See Also cross-links.
9. **Adventures (Scoring Sheet)** ([`Adventures.tsx`](companion-app/src/components/Adventures.tsx)) — 8-scenario campaign scoring, Salves chain, Witch Keys.
10. **Adventures Setup** ([`AdventuresSetup.tsx`](companion-app/src/components/AdventuresSetup.tsx)) — Difficulty/hero-count picker, campaign outline.
11. **Adventures Play** ([`AdventuresPlay.tsx`](companion-app/src/components/AdventuresPlay.tsx)) — Phase rail for the current scenario type (Portal Crawl vs Boss Battle).
12. **PVP** ([`PvP.tsx`](companion-app/src/components/PvP.tsx)) — Player setup (2–6 players, hero picker) and turn-based play (HP/CP/status tracking, turn order).

Shared UI: [`PhaseRail.tsx`](companion-app/src/components/PhaseRail.tsx), [`StatusChip.tsx`](companion-app/src/components/StatusChip.tsx), [`CrisisClock.tsx`](companion-app/src/components/CrisisClock.tsx), [`WitchKeys.tsx`](companion-app/src/components/WitchKeys.tsx), [`BossHpTracker.tsx`](companion-app/src/components/BossHpTracker.tsx).

## State & Persistence

Single flat state tree ([`store.tsx`](companion-app/src/store.tsx)), persisted to `localStorage` under one key (`dt-state`) and rehydrated on load — the app always lands on the Hub after reload regardless of the last-visited screen (use the Resume bar to jump back in). No backend; local-only, single-device state. Navigation history for the Back button is kept in memory only, not persisted.

## Content Data

All rules, status-effect descriptions, perk definitions, hero roster, and mission/adventure phase copy are real Dice Throne content (sourced from the official rulebooks and cross-checked against dice-throne.rulepop.com), hand-authored and checked in as TypeScript:

- [`src/data/constants.ts`](companion-app/src/data/constants.ts) — `RULES_DATA`, `STATUS_DEFS`, `PERK_DEFS`, `HERO_LIST`
- [`src/data/missionPhases.ts`](companion-app/src/data/missionPhases.ts) — `MISSION_HENCHMEN_PHASES`, `MISSION_BOSS_PHASES`, `CRAWL_PHASES`, `BOSS_PHASES`

These are edited directly — there is no generation step. (Earlier in development this data was scraped out of a standalone HTML prototype via a regex-based build script; that prototype and the script have since been removed in favor of hand-authored data as the single source of truth.)

## Design Tokens

- **Colors**: `--paper #F2ECE0` (base bg), `--ink #23201A` (primary text), `--ember #B23A2E` (primary accent — CTAs, damage), `--verd #3C6E5C` (positive — heal, win), `--brass #A87E33` (secondary accent), `--slate #4D6373` (tertiary accent).
- **Typography**: `Newsreader` (headings/serif numerals), `Hanken Grotesk` (UI/body), `Spline Sans Mono` (labels/data), all via Google Fonts.
- **Glyphs**: no icon assets — all glyphs are Unicode characters (◆ ▲ ■ ★ ✦ ⚙ ⌕) styled via font-size/color.

See [`src/index.css`](companion-app/src/index.css) for the full token set.
