import React from 'react';

interface WitchKeysProps {
  count: number;
  onToggle: (key: number) => void;
}

// Rating-control semantics: clicking key N sets the held count to N,
// or to N-1 if key N is already held (matches the visual "keys 1..count are filled").
export const toggleWitchKey = (current: number, key: number) => (current >= key ? key - 1 : key);

export const WitchKeys: React.FC<WitchKeysProps> = ({ count, onToggle }) => (
  <div style={{ display: 'flex', gap: '12px' }}>
    {[1, 2, 3].map((key) => {
      const hasKey = count >= key;
      return (
        <div
          key={key}
          onClick={() => onToggle(key)}
          style={{ flex: 1, height: '48px', borderRadius: '8px', border: hasKey ? 'none' : '2px dashed var(--line)', background: hasKey ? 'var(--brass)' : 'transparent', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s' }}
        >
          {hasKey && <span style={{ color: 'white', fontSize: '1.5rem' }}>★</span>}
        </div>
      );
    })}
  </div>
);
