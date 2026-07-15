import React, { useState } from 'react';
import { useStore } from '../store';

const DIFF_COLS = ['Intro', 'Moderate', 'Hard', 'Brutal', 'Ruthless'];

export const Perks: React.FC = () => {
  const { state } = useStore();
  const [activePlayer, setActivePlayer] = useState(0);

  // Simplified perks state just for UI mockup visualization
  const [perksGrid, setPerksGrid] = useState<Record<string, Record<string, boolean>>>({});
  
  const togglePerk = (rowId: string, diff: string) => {
    setPerksGrid(prev => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [diff]: !prev[rowId]?.[diff]
      }
    }));
  };

  const isRowUnlocked = (rowId: string) => {
    return DIFF_COLS.every(diff => perksGrid[rowId]?.[diff]);
  };

  const perkRows = [
    { id: 'c1', title: 'Combat Perk I', requires: null },
    { id: 'c2', title: 'Combat Perk II', requires: 'c1' },
    { id: 'm1', title: 'Momentum I', requires: null },
    { id: 'm2', title: 'Momentum II', requires: 'm1' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Player Tabs */}
      <div style={{ display: 'flex', background: 'var(--paper2)', borderBottom: '1px solid var(--line)' }}>
        {state.heroNames.map((name, i) => (
          <button 
            key={i}
            onClick={() => setActivePlayer(i)}
            style={{ 
              padding: '16px 32px', 
              background: activePlayer === i ? 'var(--card)' : 'transparent', 
              border: 'none', 
              borderBottom: activePlayer === i ? '3px solid var(--ember)' : '3px solid transparent',
              fontWeight: 700,
              fontSize: '1.1rem',
              cursor: 'pointer',
              color: activePlayer === i ? 'var(--ink)' : 'var(--ink2)'
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <div style={{ padding: '40px', flex: 1, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>Perks</h1>
            <p style={{ color: 'var(--ink2)', fontSize: '1.2rem' }}>Spend PP to unlock permanent upgrades.</p>
          </div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span className="mono-text" style={{ color: 'var(--ink3)' }}>AVAILABLE PP</span>
            <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ember)' }}>14</span>
          </div>
        </div>

        {/* Grid Header */}
        <div style={{ display: 'flex', marginBottom: '16px', paddingLeft: '300px' }}>
          {DIFF_COLS.map(diff => (
            <div key={diff} className="mono-text" style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink3)' }}>{diff.toUpperCase()}</div>
          ))}
          <div style={{ width: '120px' }}></div> {/* Status column */}
        </div>

        {/* Grid Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {perkRows.map(row => {
            const unlocked = isRowUnlocked(row.id);
            const lockedByReq = row.requires && !isRowUnlocked(row.requires);
            
            return (
              <div key={row.id} style={{ display: 'flex', alignItems: 'center', background: 'var(--card)', padding: '16px', borderRadius: '12px', border: '1px solid var(--line)', opacity: lockedByReq ? 0.5 : 1, pointerEvents: lockedByReq ? 'none' : 'auto' }}>
                <div style={{ width: '284px', fontWeight: 600, fontSize: '1.1rem' }}>{row.title}</div>
                
                {DIFF_COLS.map(diff => {
                  const filled = perksGrid[row.id]?.[diff];
                  return (
                    <div key={diff} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <button 
                        onClick={() => togglePerk(row.id, diff)}
                        style={{ width: '32px', height: '32px', borderRadius: '50%', border: filled ? 'none' : '2px solid var(--line2)', background: filled ? 'var(--ember)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
                      />
                    </div>
                  );
                })}

                <div style={{ width: '120px', display: 'flex', justifyContent: 'center' }}>
                  {unlocked ? (
                    <span className="mono-text" style={{ background: 'var(--status-pos-bg)', color: 'var(--verd)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 700 }}>UNLOCKED</span>
                  ) : (
                    <span className="mono-text" style={{ color: 'var(--ink3)', fontSize: '0.8rem' }}>LOCKED</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
