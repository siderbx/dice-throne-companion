# Dice Throne Companion

A companion app for Dice Throne tabletop play, covering four modes: PVP (1v1/FFA/team duels), Missions (co-op vs Henchmen/Boss with a Crisis Clock), Adventures (8-scenario campaign with scoring), plus a shared Rules/Status-Effects/Tokens/Dice & Symbols/FAQ reference and a Perk Sheet. It replaces paper trackers (HP, Momentum, CP, status tokens, campaign scoring) with live, tappable UI.

React + TypeScript + Vite single-page app, no backend. See [`DEVLOG.md`](DEVLOG.md) for a running log of work.

## Development

```
npm run dev     # starts Vite
npm run build   # type-checks, then builds
npm run lint    # oxlint
```

## Screens

Routed via a `screen` string in app state ([`store.tsx`](src/store.tsx)) — no URL routing, just in-memory navigation plus a global nav bar (`TopNav`) for Home/Back.

1. **Hub** ([`Hub.tsx`](src/components/Hub.tsx)) — Launcher with three mode tiles (PVP / Missions / Adventures) and a Resume bar for the in-progress session.
2. **Missions Dashboard** ([`MissionsDashboard.tsx`](src/components/MissionsDashboard.tsx)) — New Game entry point, tools list (Turn Guide, Crisis Clock, Trackers, Status Effects, Rules), hero roster strip.
3. **Setup (Missions)** ([`SetupMissions.tsx`](src/components/SetupMissions.tsx)) — Hero count/name setup; computes Starting/Max HP, enemy dice pool, and Crisis Clock advance rate from rulebook tables.
4. **Play (Phase Rail)** ([`PlayMissions.tsx`](src/components/PlayMissions.tsx)) — Round phases for Henchmen Side / Boss Side, dice results, pending attacks, Crisis Clock.
5. **Trackers** ([`Trackers.tsx`](src/components/Trackers.tsx)) — Per-hero HP/Momentum/status-effect tracking (up to 4 heroes), plus Crisis Clock and enemy pool.
6. **Perks** ([`Perks.tsx`](src/components/Perks.tsx)) — Per-player Combat/Momentum perk unlock grid across 5 difficulties, New Game+ tracker, session Perk Points.
7. **Status Effects Reference** ([`StatusEffects.tsx`](src/components/StatusEffects.tsx)) — Filterable card grid of all 22 status effects.
8. **Rules & Reference** ([`Rules.tsx`](src/components/Rules.tsx)) — Category-filtered rule browser, 71 entries across Core/Missions/Adventures/PVP, with See Also cross-links.
9. **Tokens** ([`Tokens.tsx`](src/components/Tokens.tsx)) — Filterable card grid of the 10 non-status-effect tokens/tiles (Start Player Token, Boost Tiles, Salves, Gold, King's Hand, etc.); status-effect tokens live on the Status Effects screen instead.
10. **Dice & Symbols** ([`DiceSymbols.tsx`](src/components/DiceSymbols.tsx)) — Filterable card grid covering dice types (Hero/Red/Black/Chaos/Loot), roll combinations (X-of-a-Kind, Straights, "On [Symbol]"), and roll-phase glossary terms.
11. **FAQ** ([`FAQ.tsx`](src/components/FAQ.tsx)) — Category-filtered, click-to-expand accordion of all 54 official FAQ entries (General/Ultimate Ability/Cards/Adventures), sourced from dice-throne.rulepop.com.
12. **Settings** ([`Settings.tsx`](src/components/Settings.tsx)) — Light/dark theme toggle, session reset, and an About panel linking into Rules.
13. **Adventures (Scoring Sheet)** ([`Adventures.tsx`](src/components/Adventures.tsx)) — 8-scenario campaign scoring, Salves chain, Witch Keys.
14. **Adventures Setup** ([`AdventuresSetup.tsx`](src/components/AdventuresSetup.tsx)) — Difficulty/hero-count picker, campaign outline.
15. **Adventures Play** ([`AdventuresPlay.tsx`](src/components/AdventuresPlay.tsx)) — Phase rail for the current scenario type (Portal Crawl vs Boss Battle).
16. **PVP** ([`PvP.tsx`](src/components/PvP.tsx)) — Player setup (2–6 players, hero picker) and turn-based play (HP/CP/status tracking, turn order).

Shared UI: [`PhaseRail.tsx`](src/components/PhaseRail.tsx), [`StatusChip.tsx`](src/components/StatusChip.tsx), [`CrisisClock.tsx`](src/components/CrisisClock.tsx), [`WitchKeys.tsx`](src/components/WitchKeys.tsx), [`BossHpTracker.tsx`](src/components/BossHpTracker.tsx).

## State & Persistence

Single flat state tree ([`store.tsx`](src/store.tsx)), persisted to `localStorage` under one key (`dt-state`) and rehydrated on load — the app always lands on the Hub after reload regardless of the last-visited screen (use the Resume bar to jump back in). No backend; local-only, single-device state. Navigation history for the Back button is kept in memory only, not persisted. The `theme` field (`light`/`dark`, set from Settings) persists the same way and is applied via a `data-theme` attribute on `<html>`. Settings' "Reset Session" clears everything back to defaults except the theme choice.

## Content Data

All rules, status-effect descriptions, perk definitions, hero roster, and mission/adventure phase copy are real Dice Throne content (sourced from the official rulebooks and cross-checked against dice-throne.rulepop.com), hand-authored and checked in as TypeScript:

- [`src/data/constants.ts`](src/data/constants.ts) — `RULES_DATA` (71 entries), `TOKENS_DATA` (10), `DICE_SYMBOLS_DATA` (11), `FAQ_DATA` (54, sourced from dice-throne.rulepop.com's official FAQ), `STATUS_DEFS` (22), `PERK_DEFS`, `HERO_LIST`, `CRAWL_PHASES`, `BOSS_PHASES`
- [`src/data/missionPhases.ts`](src/data/missionPhases.ts) — `MISSION_HENCHMEN_PHASES`, `MISSION_BOSS_PHASES`

These are edited directly — there is no generation step. (Earlier in development this data was scraped out of a standalone HTML prototype via a regex-based build script; that prototype and the script have since been removed in favor of hand-authored data as the single source of truth.)

## Design Tokens

- **Colors**: `--paper #F2ECE0` (base bg), `--ink #23201A` (primary text), `--ember #B23A2E` (primary accent — CTAs, damage), `--verd #3C6E5C` (positive — heal, win), `--brass #A87E33` (secondary accent), `--slate #4D6373` (tertiary accent).
- **Dark theme**: same variable names, overridden under `:root[data-theme="dark"]` (toggled from Settings) — every screen reads the same `var(--...)` tokens, so no per-screen dark-mode logic is needed.
- **Typography**: `Newsreader` (headings/serif numerals), `Hanken Grotesk` (UI/body), `Spline Sans Mono` (labels/data), all via Google Fonts.
- **Glyphs**: no icon assets — all glyphs are Unicode characters (◆ ▲ ■ ★ ✦ ⚙ ⌕) styled via font-size/color.

See [`src/index.css`](src/index.css) for the full token set.
