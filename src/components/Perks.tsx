import React from 'react';
import { useStore, type PlayerPerks } from '../store';
import { PERK_DEFS } from '../data/constants';

interface PerkDef {
  id: string;
  name: string;
  section: string; // 'combat' | 'momentum'
  desc: string;
  cols: number[];
  requires: string | null;
}

const PERKS = PERK_DEFS as PerkDef[];
const DIFF_COLS = ['Intro', 'Moderate', 'Hard', 'Brutal', 'Ruthless'];

export const Perks: React.FC = () => {
  const { state, setState } = useStore();
  const activePlayer = state.activePerkPlayer || 0;

  const players: PlayerPerks[] = state.heroNames.map((name, i) => state.perkPlayers?.[i] || { name, circles: {} });
  const current = players[activePlayer] || { name: '', circles: {} };

  const setActivePlayer = (i: number) => setState(prev => ({ ...prev, activePerkPlayer: i }));
  const adjustPP = (delta: number) => setState(prev => ({ ...prev, sessionPP: Math.max(0, (prev.sessionPP || 0) + delta) }));

  const filledCount = (perkId: string, colIndex: number) => current.circles[perkId]?.[colIndex] || 0;

  const isPerkUnlocked = (perk: PerkDef) => perk.cols.every((need, colIndex) => filledCount(perk.id, colIndex) >= need);

  const isLockedByReq = (perk: PerkDef) => {
    if (!perk.requires) return false;
    const reqPerk = PERKS.find(p => p.id === perk.requires);
    return reqPerk ? !isPerkUnlocked(reqPerk) : false;
  };

  const setCircle = (perkId: string, colIndex: number, filled: number) => {
    const newPlayers = players.map((p, i) => {
      if (i !== activePlayer) return p;
      const cols = [...(p.circles[perkId] || [])];
      cols[colIndex] = filled;
      return { ...p, circles: { ...p.circles, [perkId]: cols } };
    });
    setState(prev => ({ ...prev, perkPlayers: newPlayers }));
  };

  const renderSection = (sectionKey: string, title: string) => {
    const rows = PERKS.filter(p => p.section === sectionKey);
    if (rows.length === 0) return null;

    return (
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{title}</h2>

        {/* Grid Header */}
        <div style={{ display: 'flex', marginBottom: '16px', paddingLeft: '300px' }}>
          {DIFF_COLS.map(diff => (
            <div key={diff} className="mono-text" style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', color: 'var(--ink3)' }}>{diff.toUpperCase()}</div>
          ))}
          <div style={{ width: '120px' }} />
        </div>

        {/* Grid Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {rows.map(perk => {
            const unlocked = isPerkUnlocked(perk);
            const lockedByReq = isLockedByReq(perk);

            return (
              <div key={perk.id} style={{ display: 'flex', alignItems: 'center', background: 'var(--card)', padding: '16px', borderRadius: '12px', border: '1px solid var(--line)', opacity: lockedByReq ? 0.5 : 1, pointerEvents: lockedByReq ? 'none' : 'auto' }}>
                <div style={{ width: '284px' }}>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{perk.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink2)' }}>{perk.desc}</div>
                </div>

                {perk.cols.map((need, colIndex) => {
                  const filled = filledCount(perk.id, colIndex);
                  return (
                    <div key={colIndex} style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '4px' }}>
                      {need === 0
                        ? <span style={{ color: 'var(--ink3)' }}>—</span>
                        : Array(need).fill(0).map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={() => setCircle(perk.id, colIndex, dotIndex + 1 === filled ? dotIndex : dotIndex + 1)}
                            style={{ width: '20px', height: '20px', borderRadius: '50%', border: dotIndex < filled ? 'none' : '2px solid var(--line2)', background: dotIndex < filled ? 'var(--ember)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s', padding: 0 }}
                          />
                        ))
                      }
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
    );
  };

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
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="mono-text" style={{ color: 'var(--ink3)' }}>AVAILABLE PP</span>
            <button onClick={() => adjustPP(-1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>-</button>
            <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ember)', minWidth: '32px', textAlign: 'center' }}>{state.sessionPP || 0}</span>
            <button onClick={() => adjustPP(1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>+</button>
          </div>
        </div>

        {renderSection('combat', 'Combat Perks')}
        {renderSection('momentum', 'Momentum Perks')}
      </div>
    </div>
  );
};
