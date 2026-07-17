import React from 'react';

interface CrisisClockDialProps {
  value: number;
  segments?: number;
}

export const CrisisClockDial: React.FC<CrisisClockDialProps> = ({ value, segments = 8 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ flex: 1, display: 'flex', gap: '4px' }}>
      {Array.from({ length: segments }, (_, i) => i + 1).map((i) => (
        <div key={i} style={{ flex: 1, height: '8px', background: i <= value ? 'var(--ember)' : 'var(--line)', borderRadius: '4px' }} />
      ))}
    </div>
    <div className="display-text" style={{ fontSize: '2rem', fontWeight: 700 }}>
      {value}
    </div>
  </div>
);
