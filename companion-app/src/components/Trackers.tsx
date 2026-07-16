import React from 'react';
import { useStore } from '../store';
import { STATUS_LIST, statusId, type StatusDef } from '../lib/status';
import { BossHpTracker } from './BossHpTracker';

export const Trackers: React.FC = () => {
  const { state, setState, setScreen } = useStore();

  const handleMomChange = (index: number, delta: number) => {
    const newMom = [...state.heroMom];
    newMom[index] = Math.max(0, Math.min(8, (newMom[index] || 0) + delta));
    setState(prev => ({ ...prev, heroMom: newMom }));
  };

  const handleStatusTap = (heroIndex: number, status: StatusDef) => {
    const id = statusId(status.name);
    const newStatuses = [...state.heroStatuses];
    if (!newStatuses[heroIndex]) newStatuses[heroIndex] = {};
    const current = newStatuses[heroIndex][id] || 0;
    newStatuses[heroIndex][id] = current >= status.limit ? 0 : current + 1;
    setState(prev => ({ ...prev, heroStatuses: newStatuses }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--line)', background: 'var(--paper2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--ink3)' }}>ROUND</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card)', borderRadius: '8px', border: '1px solid var(--line)', padding: '4px' }}>
            <button onClick={() => setState(p => ({ ...p, round: Math.max(1, p.round - 1) }))} style={{ width: '32px', height: '32px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>-</button>
            <span style={{ width: '32px', textAlign: 'center', fontWeight: 700, fontSize: '1.2rem' }}>{state.round}</span>
            <button onClick={() => setState(p => ({ ...p, round: p.round + 1 }))} style={{ width: '32px', height: '32px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>+</button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)' }}>Track Hero HP on your Health Dial — this app tracks Momentum, Status Effects, and the Boss.</span>
          <button
            onClick={() => {
              if(confirm("Reset game?")) setScreen('setup');
            }}
            style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink2)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
          >
            Reset Game
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px', gap: '24px', overflowX: 'auto' }}>
        
        {/* Hero Cards Area */}
        <div style={{ flex: 1, display: 'flex', gap: '24px' }}>
          {Array(state.selectedCount).fill(0).map((_, i) => (
            <div key={i} style={{ flex: 1, minWidth: '300px', maxWidth: '400px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              {/* Header */}
              <div style={{ padding: '16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--slate)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                  {(state.heroNames[i] || 'H').charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{state.heroNames[i] || `Hero ${i+1}`}</div>
                  <div style={{ color: 'var(--ink3)', fontSize: '0.8rem' }} className="mono-text">CLASS UNKNOWN</div>
                </div>
              </div>

              {/* Momentum Tracker */}
              <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)' }}>MOMENTUM</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button onClick={() => handleMomChange(i, -1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>-</button>
                    <button onClick={() => handleMomChange(i, +1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>+</button>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1,2,3,4,5,6,7,8].map(pip => (
                    <div key={pip} style={{ flex: 1, height: '12px', borderRadius: '2px', background: pip <= (state.heroMom[i] || 0) ? 'var(--brass)' : 'var(--line2)' }} />
                  ))}
                </div>
              </div>

              {/* Status Effects */}
              <div style={{ padding: '16px', flex: 1, display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: '8px', background: 'var(--paper2)' }}>
                {STATUS_LIST.map(status => {
                  const id = statusId(status.name);
                  const count = state.heroStatuses[i]?.[id] || 0;
                  const isActive = count > 0;

                  // Map type to variables
                  let bgVar = 'transparent';
                  let borderVar = 'var(--line)';
                  let colorVar = 'var(--ink2)';

                  if (isActive) {
                    if (status.type === 'neg') { bgVar = 'var(--status-neg-bg)'; borderVar = 'var(--status-neg-border)'; colorVar = 'var(--ember)'; }
                    if (status.type === 'pos') { bgVar = 'var(--status-pos-bg)'; borderVar = 'var(--status-pos-border)'; colorVar = 'var(--verd)'; }
                    if (status.type === 'uniq') { bgVar = 'var(--status-unique-bg)'; borderVar = 'var(--status-unique-border)'; colorVar = 'var(--brass)'; }
                  }

                  return (
                    <div
                      key={id}
                      title={status.desc}
                      onClick={() => handleStatusTap(i, status)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        border: `1px solid ${borderVar}`,
                        background: bgVar,
                        color: colorVar,
                        fontSize: '0.85rem',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        userSelect: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {status.name} {isActive && <span style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem' }}>{count}</span>}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Right Rail: Boss HP, Crisis Clock & Enemy Pool */}
        <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <BossHpTracker />

          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', padding: '24px' }}>
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
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button 
                onClick={() => setState(prev => ({ ...prev, crisisClock: 0 }))}
                style={{ flex: 1, background: 'var(--paper2)', border: '1px solid var(--line)', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
              >
                Reset
              </button>
              <button 
                onClick={() => setState(prev => ({ ...prev, crisisClock: Math.min(8, prev.crisisClock + state.selectedCount) }))}
                style={{ flex: 2, background: 'var(--ember)', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
              >
                Advance (+{state.selectedCount})
              </button>
            </div>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', padding: '24px' }}>
             <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '16px' }}>ENEMY DICE POOL</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--line)' }}>
                  <span style={{ fontWeight: 600 }}>Red</span>
                  <span className="mono-text" style={{ background: 'var(--paper2)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--line)' }}>x2</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>Black</span>
                  <span className="mono-text" style={{ background: 'var(--paper2)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--line)' }}>x{1 + state.selectedCount}</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};
