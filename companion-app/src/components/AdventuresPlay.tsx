import React, { useState } from 'react';
import { useStore } from '../store';

const CRAWL_PHASES = ['Exploration', 'Minion Combat', 'Looting', 'Camping', 'Shopping', 'Upkeep'];
const BOSS_PHASES = ['Pre-game', 'Boss Turns', 'Hero Turns', 'Minion Interactions', 'King\'s Hand', 'Scoring'];

export const AdventuresPlay: React.FC = () => {
  const { state, setState } = useStore();
  const [mode, setMode] = useState<'Crawl' | 'Boss'>('Crawl');
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);

  const phases = mode === 'Crawl' ? CRAWL_PHASES : BOSS_PHASES;

  return (
    <div style={{ display: 'flex', height: '100%', borderTop: '1px solid var(--line)' }}>
      
      {/* Left Rail: Phases */}
      <div style={{ width: '250px', borderRight: '1px solid var(--line)', padding: '24px 0', background: 'var(--card)', display: 'flex', flexDirection: 'column' }}>
        <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', padding: '0 24px', marginBottom: '16px' }}>{mode.toUpperCase()} PHASES</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {phases.map((phase, idx) => {
            const isActive = idx === activePhaseIdx;
            return (
              <li 
                key={phase}
                onClick={() => setActivePhaseIdx(idx)}
                style={{
                  padding: '12px 24px',
                  cursor: 'pointer',
                  background: isActive ? 'var(--ember-soft)' : 'transparent',
                  color: isActive ? 'var(--ember)' : 'var(--ink2)',
                  fontWeight: isActive ? 700 : 500,
                  borderRight: isActive ? '4px solid var(--ember)' : '4px solid transparent',
                  transition: 'background 0.2s, color 0.2s'
                }}
              >
                {phase}
              </li>
            );
          })}
        </ul>
        <div style={{ padding: '0 24px' }}>
          <button 
            onClick={() => { setMode(mode === 'Crawl' ? 'Boss' : 'Crawl'); setActivePhaseIdx(0); }}
            style={{ width: '100%', padding: '12px', background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
          >
            Switch: {mode === 'Crawl' ? 'Boss' : 'Crawl'}
          </button>
        </div>
      </div>

      {/* Center: Phase Detail */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{phases[activePhaseIdx]}</h2>
        <p style={{ color: 'var(--ink2)', fontSize: '1.1rem', marginBottom: '40px' }}>Read the rulebook section for details on this phase.</p>

        <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', marginBottom: '40px', flex: 1 }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--ink)' }}>
            This is where the detailed body copy from the `CRAWL_PHASES` or `BOSS_PHASES` data arrays would be injected.
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            disabled={activePhaseIdx === 0}
            onClick={() => setActivePhaseIdx(p => p - 1)}
            style={{ padding: '12px 24px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '8px', cursor: activePhaseIdx === 0 ? 'not-allowed' : 'pointer', opacity: activePhaseIdx === 0 ? 0.5 : 1, fontWeight: 600 }}
          >
            ← Previous
          </button>
          <button 
            disabled={activePhaseIdx === phases.length - 1}
            onClick={() => setActivePhaseIdx(p => p + 1)}
            style={{ padding: '12px 24px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '8px', cursor: activePhaseIdx === phases.length - 1 ? 'not-allowed' : 'pointer', opacity: activePhaseIdx === phases.length - 1 ? 0.5 : 1, fontWeight: 600 }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Right Rail: Salves & Witch Keys */}
      <div style={{ width: '300px', borderLeft: '1px solid var(--line)', padding: '24px', background: 'var(--card)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
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
          <div style={{ display: 'flex', gap: '12px' }}>
            {[1,2,3].map(key => {
              const hasKey = (state.adv?.witchKeys || 0) >= key;
              return (
                <div 
                  key={key}
                  onClick={() => {
                     const current = state.adv?.witchKeys || 0;
                     setState(p => ({ ...p, adv: { ...p.adv, witchKeys: hasKey ? current - 1 : current + 1 } }));
                  }}
                  style={{ flex: 1, height: '48px', borderRadius: '8px', border: hasKey ? 'none' : '2px dashed var(--line)', background: hasKey ? 'var(--brass)' : 'transparent', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s' }}
                >
                  {hasKey && <span style={{ color: 'white', fontSize: '1.5rem' }}>★</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Salve Rules Card */}
        <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', marginTop: 'auto' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>Using a Salve</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink2)', lineHeight: 1.5 }}>
            A player may spend a Salve at any time to instantly Heal 5. Salves persist across scenarios. Max 15.
          </p>
        </div>
        
      </div>

    </div>
  );
};
