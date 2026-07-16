// Hand-authored (not machine-extracted) — sourced from DTM_Rulebook_master_current_2024.06.13,
// pg. 6 "Round Phases" and pg. 10 "Boss Fights". Side 1 (Henchmen) and Side 2 (Boss) share the
// same 8 round phases; only the Enemy Roll Phase (and, on Side 2, Boss Defense during Target &
// Resolve) actually differs between the two.

export interface MissionPhase {
  name: string;
  subtitle: string;
  body: string;
  callout: string | null;
  bullets: string[];
}

export const MISSION_SIDE1_PHASES: MissionPhase[] = [
  {
    name: 'Pass Phase',
    subtitle: 'Pass the Start Player Token clockwise at the start of every round.',
    body: 'Pass the Start Player Token clockwise to the next Hero. This player becomes the new Start Player until the end of the round. Whenever you resolve something "in turn order," begin with the Start Player and continue clockwise. This phase is skipped on the very first round of Side 1.',
    callout: 'This is the only phase skipped on Round 1 of Side 1 — every other round runs the full 8-phase sequence.',
    bullets: ['Token passes clockwise every round.', 'Skipped only on Round 1 of Side 1.', 'Turn order for the rest of the round starts with the new Start Player.'],
  },
  {
    name: 'Movement Phase',
    subtitle: 'All Heroes move simultaneously and collect Boost Tiles.',
    body: 'All Hero pawns move at the same time. You may move any number of spaces, including zero. You cannot move onto or through a space with a dark inset background unless it is covered by a Defeat Tile. You can move through (or swap with) other Heroes, but two Heroes cannot end the phase on the same space — if there is a dispute, the Hero earlier in turn order chooses. Collect any Boost Tiles on the space where you end your move.',
    callout: 'You most often want to end movement adjacent to an enemy, since Attacks and Defensive Abilities are Melee by default.',
    bullets: ['Move 0+ spaces; movement is optional.', 'Cannot move onto/through dark-background spaces unless covered by a Defeat Tile.', 'Collect all Boost Tiles on your ending space.'],
  },
  {
    name: 'Hero Phase Part 1',
    subtitle: 'Every Hero completes Upkeep, Income, Main Phase 1, and their Offensive Roll Phase — simultaneously.',
    body: 'Each Hero completes their Upkeep Phase (resolve status effects), Income Phase (gain CP, draw a card — skipped by everyone on Round 1), Main Phase (1), and then all of their Roll Attempts, at their own pace. When you finish rolling, say "Ready to attack!" Heroes cannot interact with teammates who are in a different phase of their turn (e.g. you can\'t play a Main Phase card on a teammate who\'s already rolling).',
    callout: 'Income Phase is skipped by every Hero on the very first round — not just the Start Player.',
    bullets: ['Proceed at your own pace through Upkeep → Income → Main Phase 1 → Roll Attempts.', 'Income Phase is skipped by all Heroes on Round 1.', 'Say "Ready to attack!" when you finish your last Roll Attempt.', "You can't target a teammate in a different phase of their turn."],
  },
  {
    name: 'Target & Resolve Phase',
    subtitle: 'In turn order, each Hero picks a target and resolves their Offensive Ability.',
    body: 'Once every Hero has said "Ready to attack!", resolve Offensive Abilities one at a time in turn order, starting with the Start Player. Attacks are Melee by default, meaning you can only target an adjacent enemy — you must gain Range (by spending Momentum or through an Ally/card) before resolving the Attack if you want to hit a non-adjacent enemy. A Range Attack can be resolved without choosing a target at all if that\'s useful.',
    callout: "You can't resolve any part of a Melee Attack unless an adjacent enemy exists to target.",
    bullets: ['Resolve in turn order, Start Player first.', 'Melee = adjacent only; Range = anyone on the map (must be gained first).', 'Ultimate Abilities and pure-collateral Abilities can target anyone without Range.'],
  },
  {
    name: 'Hero Phase Part 2',
    subtitle: 'Every Hero completes Main Phase 2, then their Discard Phase — simultaneously.',
    body: 'After Target & Resolve, all Heroes simultaneously play any remaining Main Phase cards, then sell cards from their hand down to 5 or fewer (gaining +1 CP per card sold).',
    callout: null,
    bullets: ['Main Phase 2 and Discard Phase happen for everyone at once.', 'Sell down to 5 or fewer cards; each sold card = +1 CP.'],
  },
  {
    name: 'Enemy Upkeep Phase',
    subtitle: 'Resolve status effects on the Henchmen and Unstoppable Threat.',
    body: 'Resolve any Upkeep-Phase status effects on the enemies, in whatever order the players choose.',
    callout: null,
    bullets: ['Same status-effect rules as Hero Upkeep, applied to enemies.', 'Players choose the resolution order.'],
  },
  {
    name: 'Enemy Roll Phase',
    subtitle: 'Roll the Enemy Dice once — every Henchman type whose roll objective matches activates, not just one.',
    body: 'Gather the Enemy Dice pool (2 red + 1 black die base, plus 1 black die per Hero) and roll it exactly once, no matter how many enemies are on the map. Then, for each Henchman info panel — left to right along the map\'s bottom edge — check whether the rolled dice match that panel\'s roll objective. Every panel that matches activates its Offensive Ability, resolved in that same left-to-right order (each Henchman with an activated Ability triggers it in map reading-order: left to right, then top to bottom). Most Henchman Abilities are Multi-Strike: they hit every adjacent Hero (Melee) or every Hero on the map (Range) — not just one target. Finally, if the roll also matches the Unstoppable Threat\'s roll objective, it activates too. Heroes may then take a Defense Roll against each defendable Attack.',
    callout: 'A single dice roll can match multiple Henchman types at once — all of them activate off that one roll, not just the first match. (This is the opposite of how the Boss works on Side 2 — see that phase for the difference.)',
    bullets: ['Roll the dice exactly once regardless of enemy count.', 'ALL Henchman panels matching the roll activate, left to right.', 'Multi-Strike Attacks hit every adjacent Hero (Melee) or every Hero on the map (Range).', 'Henchmen have no Defensive Ability — Shield tokens are their main defense.', "Unstoppable Threat activates last, if its own roll objective also matches."],
  },
  {
    name: 'Crisis Clock Phase',
    subtitle: 'Advance the Crisis Clock Hand and resolve every segment it passes through.',
    body: 'Rotate the Crisis Clock Hand clockwise a number of segments equal to the number of Heroes. Every segment the Hand passes through or lands on (but not the one it started on) activates its Crisis Ability. Damage effects accumulate against each target and resolve together at the end of the phase; all other effects resolve in clockwise order.',
    callout: "This is the same Crisis Clock mechanic on both sides of a Mission — it doesn't reset between Side 1 and Side 2 unless a specific Mission says otherwise.",
    bullets: ['Advances by 1 segment per Hero, every round.', 'Every passed-through or landed-on segment activates (not the starting segment).', 'Damage accumulates and resolves together at the end of the phase.'],
  },
];

export const MISSION_SIDE2_PHASES: MissionPhase[] = [
  {
    name: 'Pass Phase',
    subtitle: 'Pass the Start Player Token clockwise at the start of every round.',
    body: 'Pass the Start Player Token clockwise to the next Hero. This player becomes the new Start Player until the end of the round. Whenever you resolve something "in turn order," begin with the Start Player and continue clockwise.',
    callout: "Unlike Side 1, this phase is NOT skipped on the first round of Side 2 — the Pass Phase skip only ever applies to Side 1's very first round.",
    bullets: ["Token passes clockwise every round, including Side 2's first round.", 'Turn order for the rest of the round starts with the new Start Player.'],
  },
  {
    name: 'Movement Phase',
    subtitle: 'All Heroes move simultaneously and collect Boost Tiles.',
    body: 'All Hero pawns move at the same time. You may move any number of spaces, including zero. You cannot move onto or through a space with a dark inset background unless it is covered by a Defeat Tile. You can move through (or swap with) other Heroes, but two Heroes cannot end the phase on the same space — if there is a dispute, the Hero earlier in turn order chooses. Collect any Boost Tiles on the space where you end your move.',
    callout: 'On Side 2, some Boost Tiles you collect will be face-down — these come from the Boss\'s Enemy Roll Phase and stay on your Health Dial until after the Boss\'s next Attack.',
    bullets: ['Move 0+ spaces; movement is optional.', 'Cannot move onto/through dark-background spaces unless covered by a Defeat Tile.', 'Face-up tiles resolve immediately; face-down tiles go on your Health Dial.'],
  },
  {
    name: 'Hero Phase Part 1',
    subtitle: 'Every Hero completes Upkeep, Income, Main Phase 1, and their Offensive Roll Phase — simultaneously.',
    body: 'Each Hero completes their Upkeep Phase (resolve status effects), Income Phase (gain CP, draw a card — skipped by everyone on Round 1), Main Phase (1), and then all of their Roll Attempts, at their own pace. When you finish rolling, say "Ready to attack!" Heroes cannot interact with teammates who are in a different phase of their turn.',
    callout: 'Income Phase is skipped by every Hero on the very first round of Side 2 too, not just Side 1.',
    bullets: ['Proceed at your own pace through Upkeep → Income → Main Phase 1 → Roll Attempts.', 'Income Phase is skipped by all Heroes on Round 1.', 'Say "Ready to attack!" when you finish your last Roll Attempt.'],
  },
  {
    name: 'Target & Resolve Phase',
    subtitle: 'Resolve Offensive Abilities in turn order — attacking the Boss also triggers its automatic Boss Defense.',
    body: 'Resolve Offensive Abilities one at a time in turn order, starting with the Start Player, same as Side 1. When your target is the Boss, also resolve the Boss\'s Defensive Ability for the Attack: Bosses automatically activate "Boss Defense" when hit by a defendable Attack — no roll is required. Resolve the defense, then apply any other effects (like Shield). Some Bosses have a "Unique Defense" that resolves last instead of first — read the Boss card carefully.',
    callout: 'Unlike Henchmen (who have no Defensive Ability and lean on Shield tokens instead), the Boss always defends automatically against defendable Attacks — that defense is not optional and needs no roll.',
    bullets: ['Resolve in turn order, Start Player first.', 'Melee = adjacent only; Range = anyone on the map (must be gained first).', 'Boss Defense activates automatically on any defendable Attack — no roll needed.', "Some Bosses' Unique Defense resolves last instead of first — check the Boss card."],
  },
  {
    name: 'Hero Phase Part 2',
    subtitle: 'Every Hero completes Main Phase 2, then their Discard Phase — simultaneously.',
    body: 'After Target & Resolve, all Heroes simultaneously play any remaining Main Phase cards, then sell cards from their hand down to 5 or fewer (gaining +1 CP per card sold).',
    callout: null,
    bullets: ['Main Phase 2 and Discard Phase happen for everyone at once.', 'Sell down to 5 or fewer cards; each sold card = +1 CP.'],
  },
  {
    name: 'Enemy Upkeep Phase',
    subtitle: "Resolve status effects on the Boss.",
    body: 'Resolve any Upkeep-Phase status effects on the Boss, in whatever order the players choose.',
    callout: null,
    bullets: ['Same status-effect rules as Hero Upkeep, applied to the Boss.', 'Players choose the resolution order.'],
  },
  {
    name: 'Enemy Roll Phase',
    subtitle: 'Roll the Enemy Dice once — only the FIRST matching Boss Ability (left to right) activates.',
    body: "Gather the same Enemy Dice pool used on Side 1 and roll it once. Heroes may alter the dice with cards or effects before it's compared. Compare the roll to the Boss's Attacks, left to right on the Boss card, and activate ONLY the first Offensive Ability whose roll objective matches — if nothing matches, the Boss doesn't attack this round. For each Red Die in the roll, place a face-down Boost Tile on the map space matching its value (a Hero standing there does NOT collect it immediately). Then resolve the activated Ability: Multi-Strike Attacks still hit every adjacent Hero (Melee) or every Hero on the map (Range). Any Hero standing on a face-down Boost Tile, or holding one or more on their Health Dial, suffers the Attack's CRIT effect once (no matter how many tiles they have). After the Attack, Heroes reveal and resolve any face-down Boost Tiles they collected while moving this round.",
    callout: 'This is the opposite of Side 1: only the FIRST matching Ability activates for the Boss, never multiple. Heroes can use cards to change a rolled die specifically to dodge a worse Attack in favor of a milder one that matches instead.',
    bullets: ['Only the first (left-to-right) matching Boss Ability activates — never more than one.', "If no Ability matches the roll, the Boss doesn't attack that round.", 'Each Red Die places a face-down Boost Tile on the map — not collected immediately.', 'Standing on / holding a face-down Boost Tile adds the Attack\'s CRIT effect once.', 'Boss Defense (Phase 4) is separate — this phase is the Boss attacking, not defending.'],
  },
  {
    name: 'Crisis Clock Phase',
    subtitle: 'Advance the Crisis Clock Hand and resolve every segment it passes through.',
    body: 'Rotate the Crisis Clock Hand clockwise a number of segments equal to the number of Heroes. Every segment the Hand passes through or lands on (but not the one it started on) activates its Crisis Ability. Some Crisis Clock segments show Boss Crisis Abilities specifically — these are printed above the Crisis Clock and activate on top of the normal segment effect. Damage effects accumulate against each target and resolve together at the end of the phase; all other effects resolve in clockwise order.',
    callout: 'The Crisis Clock carries over from Side 1 — it does not reset when you flip to Side 2 unless a specific Mission says otherwise.',
    bullets: ['Advances by 1 segment per Hero, every round.', 'Every passed-through or landed-on segment activates (not the starting segment).', 'Some segments trigger Boss-specific Crisis Abilities in addition to the normal effect.', 'Damage accumulates and resolves together at the end of the phase.'],
  },
];
