# Handoff: Dice Throne Companion App

## Overview
A companion app for Dice Throne tabletop play, covering four modes: PVP (1v1/FFA/team duels), Missions (co-op vs Henchmen/Boss with a Crisis Clock), Adventures (8-scenario campaign with scoring), plus a shared Rules/Status-Effects reference and a Perk Sheet. It replaces paper trackers (HP, Momentum, CP, status tokens, campaign scoring) with live, tappable UI.

## About the Design Files
The bundled file (`Dice Throne Companion - Hi-Fi.dc.html`) is a **design reference built in an internal HTML prototyping tool** — it renders live in a browser via a small runtime shim (`support.js`), but it is not production code. Do not import it into a real app as-is. Recreate the screens, layout, styling, and interactions in the target codebase's actual stack (React/Vue/native/etc.), using its existing component library, state management, and persistence patterns. If no stack exists yet, React is a natural fit given the component-per-screen structure already used here.

## Fidelity
**High-fidelity.** Colors, type, spacing, and all interactive states (hover/active via inline logic, disabled/locked states, selected states) are final. Recreate pixel-for-pixel where the target design system allows; adapt only where the codebase's component primitives differ.

## Screens / Views
All screens live inside a fixed "tablet" frame, 1194×834px content area (1222px outer frame), with a top tab bar (10 tabs: Hub, Missions, Setup, Play, Track, Perks, Status, PVP, Rules, Advntr) that jumps directly between screens/modes (not a strict linear flow).

1. **Hub** — Launcher. Header with app wordmark + search + settings icon. Large H1 ("What are you playing tonight?"), three mode tiles (PVP / Missions / Adventures, Missions marked "Featured" with ember top-border accent), and a "Resume" bar showing current Round/Crisis Clock/hero count with a Continue button. Footer strip links to Status Effects / All Rules / Tokens / Dice & Symbols / FAQ.
2. **Missions Dashboard** — "New Game" hero card (ember-bordered, gradient background, oversized ghost diamond glyph) + Resume bar. Right column: 5-item Tools list (Turn Guide, Crisis Clock, Trackers, Status Effects, Rules Lookup) and a 4-up hero roster strip.
3. **Setup (Missions)** — Step 1 wizard: pick hero count (1–4, big serif buttons), editable hero name inputs with colored initial seals, right-side "ledger" card auto-computing Starting/Max HP, enemy dice pool, and Crisis advance rate from a rulebook lookup table. "Begin Round 1" CTA.
4. **Play (Phase Rail)** — Left rail: 8 Missions round phases (Pass, Movement, Hero Pt1, Target & Resolve, Hero Pt2, Enemy Upkeep, Enemy Roll, Crisis Clock) with the active phase highlighted in ember. Center: current phase detail (e.g. Enemy Roll — dice results as colored square tiles, a list of pending attacks with damage and a "defends" button). Right rail: Crisis Clock module (segmented bar, big number, advance button), Enemy Pool dice-count summary, Active Status list.
5. **Trackers** — Per-hero cards (up to 4 side by side): seal+name+class, HP tag, HP progress bar, ±1/±5 HP buttons, big HP number, Momentum pip track (8 segments) with ± controls, and a wrapping grid of status-effect chips (14 types) that cycle through stack counts on tap (color-coded pos/neg/neutral, filled vs outline). Right panel: Crisis Clock module (same as Play), Enemy Pool dice viz, Quick Phases mini-list. Top bar has round ± steppers and a Reset Game button.
6. **Perks** — Per-player tabs. A difficulty-column grid (Intro/Moderate/Hard/Brutal/Ruthless, 5 icons) crossed with two perk sections (Combat Perks, Momentum Perks — sequential unlock via a `requires` chain). Each cell is a set of filled/open circle toggles (●/○) that unlock a row once all its circles across columns are filled (green "unlocked" badge; locked rows dim + block interaction until their prerequisite unlocks). Below: a New Game+ tracker (5 toggle boxes, one per difficulty) unlocking a "Mythic" badge at 5/5, and a Session PP (Perk Points) stepper with contextual hint text.
7. **Status Effects Reference** — Filterable (All 22 / Negative / Positive / Unique) 3-column card grid. Each card: type badge, name, max-stack limit, description, timing footer (color keyed to type).
8. **Rules & Reference** — Left category rail (All/Core/Missions/Adventures/PVP with per-category counts) → middle scrollable list of rule cards (title + one-line summary, category badge) → right detail drawer (title, full body copy, optional ember-accented italic callout box, optional bullet list, "See Also" cross-link chips that jump to other rules). 60 rules total across 4 categories, all real Dice Throne rules content (not placeholder).
9. **Adventures (Scoring Sheet)** — Top strip: team name, editable Scenario Score and Initial Salves steppers, difficulty badge, running Campaign Total. An 8-row scenario table (odd rows = Crawl, even = Boss): Win/Loss toggle, chained starting→remaining Salves stepper, mode-specific bonus columns (Gold+Explored-all for Crawl, Boss Loot for Boss), computed per-scenario score, computed next session's starting Salves. Right panel: Witch Keys (3 toggle slots), Current Salves big stepper, Salve Rules reference card.
10. **Adventures Setup** — Difficulty picker (5 options, each sets default Salves), hero-count picker (1–4), a right-side ledger card mirroring the chosen settings, and a static 8-scenario campaign outline list. "Begin Campaign" routes into the Scoring Sheet.
11. **Adventures Play** — Left rail: phase list for the current scenario type (6 phases each for Portal Crawl vs Boss Battle — different content), click any phase to jump. Center: phase title/subtitle/body copy, optional callout, bullet list, Prev/Next phase navigation. A "Switch: [other type]" toggle swaps between Crawl/Boss phase sets. Right panel: Salves stepper, Witch Keys, Salve Rules card.
12. **PVP Setup** — Player-count picker (2–6), then N hero-select cards (prev/next arrows cycle through a 16-hero roster, each with a color + 2-letter seal) with a starting-HP stepper (default per-hero HP from the roster, adjustable ±5). "Begin" CTA.
13. **PVP Play** — Per-player cards (badge shows "YOUR TURN" / "ELIMINATED"), HP bar + ±1/±5 controls, CP stepper (max 10, brass-colored), status chips (same 14-chip set as Trackers). Right panel: Turn Order list (active/eliminated states) and Turn Phases reference (Income → Offensive Roll → Target & Resolve → Upkeep). "End Turn" advances turn order and increments round when it wraps.

## Interactions & Behavior
- **Navigation**: tab bar and most nav buttons call a single `set(screen)` state setter — no URL routing, just a `screen` string in state (`hub`, `missions`, `setup`, `play`, `trackers`, `perks`, `status`, `rules`, `adventures`, `advSetup`, `advPlay`, `pvp`). PVP and Adventures each have an internal `subscreen`/`advPhaseIdx` for their setup↔play sub-navigation.
- **HP/Momentum/CP/Salves/Gold steppers**: all clamp between rulebook-accurate min/max (e.g. HP clamps to the max HP for the current hero count, CP maxes at 10, Momentum at 8, Salves at 15, Witch Keys at 3).
- **Status chips**: tapping cycles a per-hero-per-effect counter 0 → 1 → 2 → … → limit → back to 0; visual state (filled/outline, color) reflects count > 0.
- **Crisis Clock**: advances by the hero count each round (button click), individual ±1 and reset controls also available; segmented bar fills left-to-right; hitting 8 sets a "triggered" flag showing a pulsing warning label.
- **Perk unlock logic**: each perk row needs all its column circles filled to flip to "unlocked" (green badge); rows with a `requires` dependency (e.g. Momentum Lv.3 requires Lv.2) are disabled/dimmed until the prerequisite unlocks.
- **Rules search/filter**: category tabs filter the rule list; clicking a rule opens/replaces the detail drawer; "See Also" chips in the drawer jump to another rule by id.
- **Adventures scoring**: remaining Salves chain forward automatically session-to-session (win → carry over; loss → +3); per-scenario score is computed live from salves + bonuses (gold/explored-all for Crawl, loot for Boss) + base scenario score; loss scores a flat −10. Campaign Total sums all scored sessions.
- **PVP turn order**: "End Turn" cycles to the next non-eliminated player and increments the round counter when it wraps back to the first player.
- **Animations**: screens fade/rise in on mount (CSS `scrFade`/`riseIn` keyframes, ~0.35–0.45s ease). A subtle full-page noise-grain overlay (5% opacity, SVG turbulence filter, toggleable) sits above everything.
- **Persistence**: Perk state, Adventures state, PVP state, and hero names/count are persisted to `localStorage` (keys: `dt-perk-state`, `dt-adv-state`, `dt-pvp-state`, `dt-setup-state`) and rehydrated on load. No backend — this is local-only, single-device state.

## State Management
Reference implementation keeps one flat state tree (see the `Component` class `state` object in the source) with these top-level slices:
- `screen`: current top-level view id.
- `selectedCount` (1–4), `heroHp[]`, `heroMom[]`, `heroStatuses[]` (per-hero status-count maps), `crisisClock`, `clockTriggered`, `round` — Missions/Trackers state.
- `heroNames[]` — editable hero display names, shared across Missions screens.
- `activePerkPlayer`, `perkPlayers[]` (each: `name`, `circles` map of perkId→per-column fill counts, `ngPlus[5]`), `sessionPP` — Perks state.
- `statusFilter`, `rulesCategory`, `rulesQuery`, `rulesSelected` — reference-screen UI filters.
- `pvp: { subscreen, playerCount, players[] (heroIdx, startHp, hp, cp, statuses), activePlayer, round }`.
- `adv: { advPhaseIdx, scenarioType, teamName, difficulty, scenarioScore, initialSalves, sessions[8] (result, remainingSalves, goldUnspent, exploredAll, bossLoot), witchKeys, currentSalves }`.

Derived/computed (not stored, recalculated from state + constants each render): starting/max HP per hero count, enemy dice pool composition, perk unlock booleans, Adventures per-session scores and the salves chain, filtered rule/status lists.

## Design Tokens
**Colors** (CSS custom properties in the source):
- `--paper: #F2ECE0` (base bg), `--paper2: #F8F3E9` (secondary panel bg), `--card: #FCF9F2` (card surface)
- `--ink: #23201A` (primary text), `--ink2: #6C6458` (secondary text), `--ink3: #9C9485` (tertiary/muted)
- `--line: #E2DACA` (default border), `--line2: #ECE5D6` (lighter border)
- `--ember: #B23A2E` (primary accent — CTAs, active tab, negative/damage), `--ember-soft: #F4E5DF`
- `--verd: #3C6E5C` (positive/success — heal, win, positive status)
- `--brass: #A87E33` (secondary accent — CP, witch keys, some hero seals)
- `--slate: #4D6373` (tertiary accent — some statuses/hero seals)
- Outer tablet-frame bezel: `linear-gradient(160deg,#2a261f,#17150f)`
- Positive/negative/unique status backgrounds: `#EAF1ED` / `#FAF0EC` / `#F5EEE0` respectively, each with a matching border tint.

**Typography**:
- Display/headings/serif numerals: `Newsreader` (weights 400/500/600/700), used for H1s, screen titles, hero names, big HP/Crisis numbers.
- UI/body: `Hanken Grotesk` (400/500/600/700/800), used for buttons, labels, descriptions.
- Monospace/data: `Spline Sans Mono` (400/500/600), used for all-caps eyebrow labels, dice values, stat numbers, badges.
- Google Fonts import; all three loaded via `<link>` in `<head>`.

**Spacing/Radius**: cards typically 12–18px border-radius; buttons 7–14px; pill badges/chips 20px (full pill). Card padding commonly 14–26px depending on density. Gaps between sibling elements 4–20px depending on grouping tightness.

**Shadows**: outer tablet frame `0 50px 90px -40px rgba(40,32,20,.7), 0 8px 24px -12px rgba(0,0,0,.4)`; featured tile `0 26px 50px -30px rgba(178,58,46,.5)`; dice tiles `0 8px 16px -8px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.18)`.

## Assets
No external images/icons — all glyphs are Unicode characters (◆ ▲ ■ ★ ✦ ⚙ ⌕ etc.) styled via font-size/color, not icon fonts or SVGs. No logo asset beyond the ◆ diamond glyph used as a wordmark accent.

## Content Data
All rules, status-effect descriptions, perk definitions, hero rosters, campaign scenario names, and Adventures phase copy are real (sourced from the Dice Throne Missions/Adventures rulebooks and the base game), not lorem/placeholder text — safe to use verbatim or adapt in the production build. The full text lives in the `RULES_DATA`, `STATUS_DEFS`, `PERK_DEFS`, `HERO_LIST`, `CRAWL_PHASES`, and `BOSS_PHASES` arrays inside the component logic.

## Files
- `Dice Throne Companion - Hi-Fi.dc.html` — the full design reference (markup + logic + inline styles for all 13 screens).
- `support.js` — runtime shim required only to preview the `.dc.html` file in a browser; not relevant to the production rebuild.
