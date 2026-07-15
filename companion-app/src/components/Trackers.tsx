import React from 'react';
import { useStore } from '../store';

// Mock list of 14 status effects for the UI
const MOCK_STATUSES = [
  { id: 'bleed', label: 'Bleed', type: 'neg' },
  { id: 'poison', label: 'Poison', type: 'neg' },
  { id: 'stun', label: 'Stun', type: 'neg' },
  { id: 'burn', label: 'Burn', type: 'neg' },
  { id: 'blind', label: 'Blind', type: 'neg' },
  { id: 'knockdown', label: 'Knockdown', type: 'neg' },
  { id: 'evasive', label: 'Evasive', type: 'pos' },
  { id: 'flight', label: 'Flight', type: 'pos' },
  { id: 'protect', label: 'Protect', type: 'pos' },
  { id: 'heal', label: 'Heal', type: 'pos' },
  { id: 'bounty', label: 'Bounty', type: 'unique' },
  { id: 'mark', label: 'Mark', type: 'unique' },
  { id: 'hex', label: 'Hex', type: 'unique' },
  { id: 'targeted', label: 'Targeted', type: 'unique' }
];

export const Trackers: React.FC = () => {
  const { state, setState, setScreen } = useStore();

  const handleHpChange = (index: number, delta: number) => {
    const newHp = [...state.heroHp];
    const maxHp = state.selectedCount === 1 ? 50 : state.selectedCount === 2 ? 40 : state.selectedCount === 3 ? 35 : 30;
    newHp[index] = Math.max(0, Math.min(maxHp, (newHp[index] || 50) + delta));
    setState(prev => ({ ...prev, heroHp: newHp }));
  };

  const handleMomChange = (index: number, delta: number) => {
    const newMom = [...state.heroMom];
    newMom[index] = Math.max(0, Math.min(8, (newMom[index] || 0) + delta));
    setState(prev => ({ ...prev, heroMom: newMom }));
  };

  const handleStatusTap = (heroIndex: number, statusId: string) => {
    const newStatuses = [...state.heroStatuses];
    if (!newStatuses[heroIndex]) newStatuses[heroIndex] = {};
    const current = newStatuses[heroIndex][statusId] || 0;
    // Assuming max stack is 3 for simplicity in the mockup
    newStatuses[heroIndex][statusId] = current >= 3 ? 0 : current + 1;
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
        <button 
          onClick={() => {
            if(confirm("Reset game?")) setScreen('setup');
          }}
          style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink2)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          Reset Game
        </button>
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

              {/* HP Tracker */}
              <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--line)' }}>
                <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', background: 'var(--paper2)', padding: '4px 12px', borderRadius: '12px' }}>HEALTH POINTS</div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => handleHpChange(i, -5)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ember)', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>-5</button>
                    <button onClick={() => handleHpChange(i, -1)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>-1</button>
                  </div>
                  
                  <div className="display-text" style={{ fontSize: '4.5rem', fontWeight: 700, color: 'var(--ember)', width: '100px', textAlign: 'center', lineHeight: 1 }}>
                    {state.heroHp[i] || 0}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => handleHpChange(i, +5)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--verd)', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>+5</button>
                    <button onClick={() => handleHpChange(i, +1)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>+1</button>
                  </div>
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
                {MOCK_STATUSES.map(status => {
                  const count = state.heroStatuses[i]?.[status.id] || 0;
                  const isActive = count > 0;
                  
                  // Map type to variables
                  let bgVar = 'transparent';
                  let borderVar = 'var(--line)';
                  let colorVar = 'var(--ink2)';
                  
                  if (isActive) {
                    if (status.type === 'neg') { bgVar = 'var(--status-neg-bg)'; borderVar = 'var(--status-neg-border)'; colorVar = 'var(--ember)'; }
                    if (status.type === 'pos') { bgVar = 'var(--status-pos-bg)'; borderVar = 'var(--status-pos-border)'; colorVar = 'var(--verd)'; }
                    if (status.type === 'unique') { bgVar = 'var(--status-unique-bg)'; borderVar = 'var(--status-unique-border)'; colorVar = 'var(--brass)'; }
                  }

                  return (
                    <div 
                      key={status.id}
                      onClick={() => handleStatusTap(i, status.id)}
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
                      {status.label} {isActive && <span style={{ background: 'rgba(0,0,0,0.1)', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.75rem' }}>{count}</span>}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Right Rail: Crisis Clock & Enemy Pool */}
        <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
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
             <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '16px' }}>ENEMY POOL</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--line)' }}>
                  <span style={{ fontWeight: 600 }}>Minion</span>
                  <span className="mono-text" style={{ background: 'var(--paper2)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--line)' }}>x3</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>Henchman</span>
                  <span className="mono-text" style={{ background: 'var(--paper2)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--line)' }}>x1</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};
