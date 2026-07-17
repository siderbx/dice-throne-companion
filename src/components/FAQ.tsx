import React, { useState } from 'react';
import { FAQ_DATA } from '../data/constants';

interface FaqEntry {
  id: string;
  cat: 'general' | 'ultimate' | 'cards' | 'adventures';
  q: string;
  a: string;
}

const ENTRIES = FAQ_DATA as FaqEntry[];

const FILTERS = [
  { key: 'All', label: 'All' },
  { key: 'general', label: 'General' },
  { key: 'ultimate', label: 'Ultimate Ability' },
  { key: 'cards', label: 'Cards' },
  { key: 'adventures', label: 'Adventures' },
] as const;

const CAT_LABELS: Record<FaqEntry['cat'], string> = {
  general: 'GENERAL',
  ultimate: 'ULTIMATE ABILITY',
  cards: 'CARDS',
  adventures: 'ADVENTURES',
};

export const FAQ: React.FC = () => {
  const [filter, setFilter] = useState<'All' | FaqEntry['cat']>('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = ENTRIES.filter(e => filter === 'All' || e.cat === filter);

  return (
    <div style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>FAQ</h1>
          <p style={{ color: 'var(--ink2)', fontSize: '1.2rem' }}>Official rules clarifications and edge cases, from dice-throne.rulepop.com.</p>
        </div>

        <div style={{ display: 'flex', background: 'var(--paper2)', padding: '6px', borderRadius: '12px', gap: '4px', border: '1px solid var(--line)', flexWrap: 'wrap' }}>
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

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '8px' }}>
        {filtered.map(entry => {
          const isOpen = openId === entry.id;
          return (
            <div key={entry.id} style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
              <button
                onClick={() => setOpenId(isOpen ? null : entry.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '20px 24px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--ember)', letterSpacing: '1px' }}>{CAT_LABELS[entry.cat]}</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--ink)' }}>{entry.q}</span>
                </div>
                <span style={{ fontSize: '1.3rem', color: 'var(--ink3)', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.15s' }}>+</span>
              </button>

              {isOpen && (
                <div style={{ padding: '0 24px 24px', color: 'var(--ink2)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {entry.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
