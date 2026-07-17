import React, { useState } from 'react';
import { DICE_SYMBOLS_DATA } from '../data/constants';
import { useStore } from '../store';

interface DiceEntry {
  id: string;
  cat: 'dice' | 'combo' | 'glossary';
  name: string;
  summary: string;
  detail: string;
  ruleId: string | null;
}

const ENTRIES = DICE_SYMBOLS_DATA as DiceEntry[];

const CAT_STYLES: Record<DiceEntry['cat'], { bg: string; border: string; color: string; label: string }> = {
  dice: { bg: 'var(--status-neg-bg)', border: 'var(--status-neg-border)', color: 'var(--ember)', label: 'DICE TYPE' },
  combo: { bg: 'var(--status-pos-bg)', border: 'var(--status-pos-border)', color: 'var(--verd)', label: 'ROLL COMBO' },
  glossary: { bg: 'var(--status-unique-bg)', border: 'var(--status-unique-border)', color: 'var(--brass)', label: 'GLOSSARY' },
};

const FILTERS = [
  { key: 'All', label: 'All' },
  { key: 'dice', label: 'Dice Types' },
  { key: 'combo', label: 'Roll Combos' },
  { key: 'glossary', label: 'Glossary' },
] as const;

export const DiceSymbols: React.FC = () => {
  const { setScreen } = useStore();
  const [filter, setFilter] = useState<'All' | DiceEntry['cat']>('All');

  const filtered = ENTRIES.filter(e => filter === 'All' || e.cat === filter);

  return (
    <div style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>Dice &amp; Symbols</h1>
          <p style={{ color: 'var(--ink2)', fontSize: '1.2rem' }}>Dice types, roll combinations, and roll-phase terminology.</p>
        </div>

        <div style={{ display: 'flex', background: 'var(--paper2)', padding: '6px', borderRadius: '12px', gap: '4px', border: '1px solid var(--line)' }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              style={{
                padding: '8px 16px',
                background: filter === f.key ? 'var(--card)' : 'transparent',
                border: filter === f.key ? '1px solid var(--line)' : '1px solid transparent',
                borderRadius: '8px',
                fontWeight: filter === f.key ? 700 : 500,
                color: filter === f.key ? 'var(--ink)' : 'var(--ink2)',
                cursor: 'pointer',
                boxShadow: filter === f.key ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', flex: 1, overflowY: 'auto', paddingBottom: '8px' }}>
        {filtered.map(entry => {
          const style = CAT_STYLES[entry.cat];
          return (
            <div key={entry.id} style={{ background: style.bg, border: `1px solid ${style.border}`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{entry.name}</div>
                <div className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700, color: style.color, border: `1px solid ${style.color}`, padding: '4px 8px', borderRadius: '16px' }}>
                  {style.label}
                </div>
              </div>

              <p className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--ink3)', marginBottom: '16px' }}>
                {entry.summary}
              </p>

              <p style={{ fontSize: '1.05rem', color: 'var(--ink)', flex: 1 }}>
                {entry.detail}
              </p>

              {entry.ruleId && (
                <button
                  onClick={() => setScreen('rules')}
                  style={{ marginTop: '20px', alignSelf: 'flex-start', background: 'transparent', border: 'none', color: style.color, fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: '0.95rem' }}
                >
                  Full rule →
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
