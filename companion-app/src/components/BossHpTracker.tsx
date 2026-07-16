import React from 'react';
import { useStore } from '../store';

export const BossHpTracker: React.FC = () => {
  const { state, setState } = useStore();

  const adjustHp = (delta: number) => setState(p => ({ ...p, bossHp: Math.max(0, Math.min(p.bossMaxHp, p.bossHp + delta)) }));
  const setMaxHp = (value: number) => {
    const max = Math.max(1, value || 1);
    setState(p => ({ ...p, bossMaxHp: max, bossHp: Math.min(p.bossHp, max) }));
  };

  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)' }}>BOSS HEALTH</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--ink3)' }}>MAX</span>
          <input
            type="number"
            value={state.bossMaxHp}
            onChange={(e) => setMaxHp(parseInt(e.target.value))}
            style={{ width: '50px', padding: '4px', borderRadius: '6px', border: '1px solid var(--line)', textAlign: 'center', background: 'var(--paper2)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => adjustHp(-5)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ember)', fontWeight: 700, cursor: 'pointer' }}>-5</button>
          <button onClick={() => adjustHp(-1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer' }}>-1</button>
        </div>
        <div className="display-text" style={{ fontSize: '3rem', fontWeight: 700, color: state.bossHp === 0 ? 'var(--ember)' : 'var(--ink)', minWidth: '90px', textAlign: 'center' }}>
          {state.bossHp}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={() => adjustHp(5)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--verd)', fontWeight: 700, cursor: 'pointer' }}>+5</button>
          <button onClick={() => adjustHp(1)} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer' }}>+1</button>
        </div>
      </div>

      {state.bossHp === 0 && (
        <div className="mono-text" style={{ textAlign: 'center', marginTop: '12px', color: 'var(--ember)', fontWeight: 700, fontSize: '0.85rem' }}>BOSS DEFEATED</div>
      )}
    </div>
  );
};
