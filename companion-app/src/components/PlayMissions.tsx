import React, { useState } from 'react';
import { useStore } from '../store';
import { MISSION_HENCHMEN_PHASES, MISSION_BOSS_PHASES } from '../data/missionPhases';
import { BossHpTracker } from './BossHpTracker';
import { PhaseRail } from './PhaseRail';
import { CrisisClockDial } from './CrisisClock';
import { enemyDicePool } from '../lib/mission';

export const PlayMissions: React.FC = () => {
  const { state, setState, setScreen } = useStore();
  const [side, setSide] = useState<1 | 2>(1);
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);

  const phases = side === 1 ? MISSION_HENCHMEN_PHASES : MISSION_BOSS_PHASES;
  const { red: redDice, black: blackDice } = enemyDicePool(state.selectedCount);

  return (
    <PhaseRail
      railHeader={`ROUND ${state.round} · ${side === 1 ? 'HENCHMEN' : 'BOSS'} SIDE PHASES`}
      phases={phases}
      activeIdx={activePhaseIdx}
      onSelect={setActivePhaseIdx}
      numbered
      switchLabel={`Switch: ${side === 1 ? 'Boss' : 'Henchmen'} Side`}
      onSwitch={() => { setSide(side === 1 ? 2 : 1); setActivePhaseIdx(0); }}
      rightRail={
        <>
          {side === 2 && <BossHpTracker />}

          {/* Crisis Clock Module */}
          <div>
            <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '12px' }}>CRISIS CLOCK</h3>
            <CrisisClockDial value={state.crisisClock} />
            <button
              onClick={() => setState(prev => ({ ...prev, crisisClock: Math.min(8, prev.crisisClock + state.selectedCount) }))}
              style={{ width: '100%', background: 'transparent', border: '1px solid var(--line)', padding: '12px', borderRadius: '8px', marginTop: '16px', cursor: 'pointer', fontWeight: 600 }}
            >
              Advance (+{state.selectedCount})
            </button>
          </div>

          {/* Enemy Dice Pool */}
          <div>
            <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '12px' }}>ENEMY DICE POOL</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--status-neg-bg)', padding: '4px 12px', borderRadius: '16px', border: '1px solid var(--status-neg-border)', fontSize: '0.9rem', fontWeight: 600 }}>{redDice} Red</span>
              <span style={{ background: 'var(--paper2)', padding: '4px 12px', borderRadius: '16px', border: '1px solid var(--line2)', fontSize: '0.9rem', fontWeight: 600 }}>{blackDice} Black</span>
            </div>
          </div>

          <button
            onClick={() => setScreen('trackers')}
            style={{ width: '100%', background: 'var(--card)', border: '1px solid var(--line)', padding: '12px', borderRadius: '8px', marginTop: 'auto', cursor: 'pointer', fontWeight: 600 }}
          >
            View Full Trackers →
          </button>
        </>
      }
    />
  );
};
