import React from 'react';
import { useStore } from '../store';
import { nextStatusValue, type StatusDefWithId } from '../lib/status';
import { BossHpTracker } from './BossHpTracker';
import { StatusChipList } from './StatusChip';
import { CrisisClockDial } from './CrisisClock';
import { enemyDicePool } from '../lib/mission';

export const Trackers: React.FC = () => {
  const { state, setState, setScreen } = useStore();

  const handleMomChange = (index: number, delta: number) => {
    const newMom = [...state.heroMom];
    newMom[index] = Math.max(0, Math.min(8, (newMom[index] || 0) + delta));
    setState(prev => ({ ...prev, heroMom: newMom }));
  };

  const handleStatusTap = (heroIndex: number, status: StatusDefWithId) => {
    const newStatuses = [...state.heroStatuses];
    if (!newStatuses[heroIndex]) newStatuses[heroIndex] = {};
    newStatuses[heroIndex][status.id] = nextStatusValue(newStatuses[heroIndex][status.id] || 0, status.limit);
    setState(prev => ({ ...prev, heroStatuses: newStatuses }));
  };

  const { red: redDice, black: blackDice } = enemyDicePool(state.selectedCount);

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
                <StatusChipList statuses={state.heroStatuses[i] || {}} onTap={(status) => handleStatusTap(i, status)} />
              </div>

            </div>
          ))}
        </div>

        {/* Right Rail: Boss HP, Crisis Clock & Enemy Pool */}
        <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <BossHpTracker />

          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', padding: '24px' }}>
            <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '12px' }}>CRISIS CLOCK</h3>
            <CrisisClockDial value={state.crisisClock} />
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
                  <span className="mono-text" style={{ background: 'var(--paper2)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--line)' }}>x{redDice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>Black</span>
                  <span className="mono-text" style={{ background: 'var(--paper2)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--line)' }}>x{blackDice}</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};
