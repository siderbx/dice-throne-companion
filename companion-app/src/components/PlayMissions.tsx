import React, { useState } from 'react';
import { useStore } from '../store';

const PHASES = [
  'Pass / Start',
  'Movement',
  'Hero Phase 1',
  'Target & Resolve',
  'Hero Phase 2',
  'Enemy Upkeep',
  'Enemy Roll',
  'Crisis Clock'
];

export const PlayMissions: React.FC = () => {
  const { state, setState, setScreen } = useStore();
  const [activePhaseIdx, setActivePhaseIdx] = useState(6); // Default to Enemy Roll for demo

  return (
    <div style={{ display: 'flex', height: '100%', borderTop: '1px solid var(--line)' }}>
      
      {/* Left Rail: Phases */}
      <div style={{ width: '250px', borderRight: '1px solid var(--line)', padding: '24px 0', background: 'var(--card)' }}>
        <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', padding: '0 24px', marginBottom: '16px' }}>ROUND {state.round} PHASES</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
          {PHASES.map((phase, idx) => {
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
      </div>

      {/* Center: Phase Detail (Mock Enemy Roll) */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{PHASES[activePhaseIdx]}</h2>
        <p style={{ color: 'var(--ink2)', marginBottom: '40px' }}>Resolve effects and roll the enemy dice pool.</p>

        {activePhaseIdx === 6 ? (
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              {/* Mock Dice Tiles */}
              {['1', '5', '3', 'Hench'].map((die, i) => (
                <div key={i} className="mono-text" style={{ 
                  width: '80px', height: '80px', borderRadius: '12px', background: 'var(--ember)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontWeight: 700, boxShadow: 'var(--shadow-dice)'
                }}>
                  {die}
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Pending Attacks</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontWeight: 600 }}>Minion Strike</span>
                  <span style={{ color: 'var(--ember)', marginLeft: '8px', fontWeight: 700 }}>4 DMG</span>
                </div>
                <button style={{ background: 'var(--card)', border: '1px solid var(--line)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Defends</button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: 'var(--ink3)' }}>Select 'Enemy Roll' to see details.</div>
        )}
      </div>

      {/* Right Rail: Crisis & Stats */}
      <div style={{ width: '300px', borderLeft: '1px solid var(--line)', padding: '24px', background: 'var(--card)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
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

        {/* Enemy Pool Summary */}
        <div>
          <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '12px' }}>ENEMY POOL</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--paper2)', padding: '4px 12px', borderRadius: '16px', border: '1px solid var(--line2)', fontSize: '0.9rem', fontWeight: 600 }}>3 Minion</span>
            <span style={{ background: 'var(--paper2)', padding: '4px 12px', borderRadius: '16px', border: '1px solid var(--line2)', fontSize: '0.9rem', fontWeight: 600 }}>1 Henchman</span>
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
