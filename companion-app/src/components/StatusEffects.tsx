import React, { useState } from 'react';
import { useStore } from '../store';

// Mock data (would come from STATUS_DEFS)
const ALL_STATUSES = [
  { id: 'bleed', label: 'Bleed', type: 'neg', maxStack: 3, desc: 'Take 1 damage per stack during Upkeep.', timing: 'Upkeep Phase' },
  { id: 'poison', label: 'Poison', type: 'neg', maxStack: 3, desc: 'Take 1 damage per stack at the end of turn.', timing: 'End of Turn' },
  { id: 'stun', label: 'Stun', type: 'neg', maxStack: 1, desc: 'Skip your next turn.', timing: 'Start of Turn' },
  { id: 'evasive', label: 'Evasive', type: 'pos', maxStack: 3, desc: 'On taking damage, roll 1 die. On 1-3, avoid all damage.', timing: 'When Attacked' },
  { id: 'flight', label: 'Flight', type: 'pos', maxStack: 3, desc: 'Prevent half of incoming damage (rounded up).', timing: 'When Attacked' },
  { id: 'bounty', label: 'Bounty', type: 'unique', maxStack: 1, desc: 'If defeated, the attacker gains 1 CP.', timing: 'On Defeat' }
];

export const StatusEffects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Negative' | 'Positive' | 'Unique'>('All');

  const filtered = ALL_STATUSES.filter(s => {
    if (filter === 'All') return true;
    if (filter === 'Negative') return s.type === 'neg';
    if (filter === 'Positive') return s.type === 'pos';
    if (filter === 'Unique') return s.type === 'unique';
    return true;
  });

  return (
    <div style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>Status Effects</h1>
          <p style={{ color: 'var(--ink2)', fontSize: '1.2rem' }}>Comprehensive reference for all conditions.</p>
        </div>
        
        <div style={{ display: 'flex', background: 'var(--paper2)', padding: '6px', borderRadius: '12px', gap: '4px', border: '1px solid var(--line)' }}>
          {['All', 'Negative', 'Positive', 'Unique'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              style={{
                padding: '8px 16px',
                background: filter === f ? 'var(--card)' : 'transparent',
                border: filter === f ? '1px solid var(--line)' : '1px solid transparent',
                borderRadius: '8px',
                fontWeight: filter === f ? 700 : 500,
                color: filter === f ? 'var(--ink)' : 'var(--ink2)',
                cursor: 'pointer',
                boxShadow: filter === f ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', flex: 1, overflowY: 'auto' }}>
        {filtered.map(status => {
          let bgVar = 'var(--card)';
          let borderVar = 'var(--line)';
          let badgeColor = 'var(--ink)';
          let label = 'UNIQUE';
          
          if (status.type === 'neg') { bgVar = 'var(--status-neg-bg)'; borderVar = 'var(--status-neg-border)'; badgeColor = 'var(--ember)'; label = 'NEGATIVE'; }
          if (status.type === 'pos') { bgVar = 'var(--status-pos-bg)'; borderVar = 'var(--status-pos-border)'; badgeColor = 'var(--verd)'; label = 'POSITIVE'; }
          if (status.type === 'unique') { bgVar = 'var(--status-unique-bg)'; borderVar = 'var(--status-unique-border)'; badgeColor = 'var(--brass)'; }

          return (
            <div key={status.id} style={{ background: bgVar, border: `1px solid ${borderVar}`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{status.label}</div>
                <div className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700, color: badgeColor, border: `1px solid ${badgeColor}`, padding: '4px 8px', borderRadius: '16px' }}>
                  {label}
                </div>
              </div>
              
              <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '16px' }}>
                STACK LIMIT: {status.maxStack}
              </div>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '32px', flex: 1 }}>
                {status.desc}
              </p>
              
              <div style={{ borderTop: `1px solid ${borderVar}`, paddingTop: '16px', fontSize: '0.9rem', color: badgeColor, fontWeight: 600 }}>
                {status.timing}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
