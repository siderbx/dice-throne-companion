export interface EnemyDicePool {
  red: number;
  black: number;
}

// Enemy Dice Pool: 2 red + 1 black die base, plus 1 black die per hero.
export const enemyDicePool = (heroCount: number): EnemyDicePool => ({ red: 2, black: 1 + heroCount });
