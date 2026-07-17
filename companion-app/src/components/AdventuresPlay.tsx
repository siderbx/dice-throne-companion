import React, { useState } from 'react';
import { useStore } from '../store';
import { CRAWL_PHASES, BOSS_PHASES } from '../data/constants';
import type { MissionPhase } from '../data/missionPhases';
import { BossHpTracker } from './BossHpTracker';
import { PhaseRail } from './PhaseRail';
import { WitchKeys, toggleWitchKey } from './WitchKeys';

const CRAWL = CRAWL_PHASES as MissionPhase[];
const BOSS = BOSS_PHASES as MissionPhase[];

export const AdventuresPlay: React.FC = () => {
  const { state, setState } = useStore();
  const [mode, setMode] = useState<'Crawl' | 'Boss'>('Crawl');
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);

  const phases = mode === 'Crawl' ? CRAWL : BOSS;
  const witchKeys = state.adv?.witchKeys || 0;
  const handleWitchKeyToggle = (key: number) => setState(p => ({ ...p, adv: { ...p.adv, witchKeys: toggleWitchKey(witchKeys, key) } }));

  return (
    <PhaseRail
      railHeader={`${mode.toUpperCase()} PHASES`}
      phases={phases}
      activeIdx={activePhaseIdx}
      onSelect={setActivePhaseIdx}
      switchLabel={`Switch: ${mode === 'Crawl' ? 'Boss' : 'Crawl'}`}
      onSwitch={() => { setMode(mode === 'Crawl' ? 'Boss' : 'Crawl'); setActivePhaseIdx(0); }}
      rightRail={
        <>
          {mode === 'Boss' && <BossHpTracker />}

          {/* Salves Stepper */}
          <div>
            <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '12px' }}>CURRENT SALVES</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--paper2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--line)' }}>
              <button onClick={() => setState(p => ({ ...p, adv: { ...p.adv, currentSalves: Math.max(0, (p.adv?.currentSalves || 0) - 1) } }))} style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', background: 'var(--card)', cursor: 'pointer', fontWeight: 700, fontSize: '1.2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>-</button>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--verd)' }}>{state.adv?.currentSalves || 0}</span>
              <button onClick={() => setState(p => ({ ...p, adv: { ...p.adv, currentSalves: Math.min(15, (p.adv?.currentSalves || 0) + 1) } }))} style={{ width: '40px', height: '40px', borderRadius: '8px', border: 'none', background: 'var(--card)', cursor: 'pointer', fontWeight: 700, fontSize: '1.2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>+</button>
            </div>
          </div>

          {/* Witch Keys */}
          <div>
            <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '12px' }}>WITCH KEYS</h3>
            <WitchKeys count={witchKeys} onToggle={handleWitchKeyToggle} />
          </div>

          {/* Salve Rules Card */}
          <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', marginTop: 'auto' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Using a Salve</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink2)', lineHeight: 1.5 }}>
              Spend a Salve before your move, before a battle, or before Upkeep to revive a fallen teammate at starting HP + 2 CP. You cannot revive yourself.
            </p>
          </div>
        </>
      }
    />
  );
};
