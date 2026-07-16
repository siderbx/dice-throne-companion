import React, { useState } from 'react';
import { useStore } from '../store';
import { CRAWL_PHASES, BOSS_PHASES } from '../data/constants';
import { BossHpTracker } from './BossHpTracker';

interface Phase {
  name: string;
  subtitle: string;
  body: string;
  callout: string | null;
  bullets: string[];
}

const CRAWL = CRAWL_PHASES as Phase[];
const BOSS = BOSS_PHASES as Phase[];

export const AdventuresPlay: React.FC = () => {
  const { state, setState } = useStore();
  const [mode, setMode] = useState<'Crawl' | 'Boss'>('Crawl');
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);

  const phases = mode === 'Crawl' ? CRAWL : BOSS;
  const activePhase = phases[activePhaseIdx];

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
                key={phase.name}
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
                {phase.name}
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
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{activePhase.name}</h2>
        <p style={{ color: 'var(--ink2)', fontSize: '1.1rem', marginBottom: '32px' }}>{activePhase.subtitle}</p>

        <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--ink)' }}>
            {activePhase.body}
          </p>
        </div>

        {activePhase.callout && (
          <div style={{ background: 'var(--ember-soft)', borderLeft: '4px solid var(--ember)', borderRadius: '8px', padding: '20px 24px', marginBottom: '24px', fontStyle: 'italic', color: 'var(--ink)', fontSize: '1.05rem' }}>
            {activePhase.callout}
          </div>
        )}

        {activePhase.bullets?.length > 0 && (
          <ul style={{ marginBottom: '24px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activePhase.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.5 }}>{b}</li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '24px' }}>
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
            Spend a Salve before your move, before a battle, or before Upkeep to revive a fallen teammate at starting HP + 2 CP. You cannot revive yourself.
          </p>
        </div>

      </div>

    </div>
  );
};
