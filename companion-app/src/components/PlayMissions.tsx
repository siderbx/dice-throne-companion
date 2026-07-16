import React, { useState } from 'react';
import { useStore } from '../store';
import { MISSION_SIDE1_PHASES, MISSION_SIDE2_PHASES } from '../data/missionPhases';
import { BossHpTracker } from './BossHpTracker';

export const PlayMissions: React.FC = () => {
  const { state, setState, setScreen } = useStore();
  const [side, setSide] = useState<1 | 2>(1);
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);

  const phases = side === 1 ? MISSION_SIDE1_PHASES : MISSION_SIDE2_PHASES;
  const activePhase = phases[activePhaseIdx];

  const redDice = 2;
  const blackDice = 1 + state.selectedCount;

  return (
    <div style={{ display: 'flex', height: '100%', borderTop: '1px solid var(--line)' }}>

      {/* Left Rail: Phases */}
      <div style={{ width: '250px', borderRight: '1px solid var(--line)', padding: '24px 0', background: 'var(--card)', display: 'flex', flexDirection: 'column' }}>
        <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', padding: '0 24px', marginBottom: '16px' }}>ROUND {state.round} · SIDE {side} PHASES</h3>
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
                {idx + 1}. {phase.name}
              </li>
            );
          })}
        </ul>
        <div style={{ padding: '0 24px' }}>
          <button
            onClick={() => { setSide(side === 1 ? 2 : 1); setActivePhaseIdx(0); }}
            style={{ width: '100%', padding: '12px', background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
          >
            Switch: Side {side === 1 ? 2 : 1}
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

      {/* Right Rail: Crisis & Stats */}
      <div style={{ width: '300px', borderLeft: '1px solid var(--line)', padding: '24px', background: 'var(--card)', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {side === 2 && <BossHpTracker />}

        {/* Crisis Clock Module */}
        <div>
          <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '12px' }}>CRISIS CLOCK</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} style={{ flex: 1, height: '8px', background: i <= state.crisisClock ? 'var(--ember)' : 'var(--line)', borderRadius: '4px' }} />
              ))}
            </div>
            <div className="display-text" style={{ fontSize: '2rem', fontWeight: 700 }}>
              {state.crisisClock}
            </div>
          </div>
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
      </div>

    </div>
  );
};
