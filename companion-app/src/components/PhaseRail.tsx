import React from 'react';
import type { MissionPhase } from '../data/missionPhases';

interface PhaseRailProps {
  railHeader: React.ReactNode;
  phases: MissionPhase[];
  activeIdx: number;
  onSelect: (idx: number) => void;
  numbered?: boolean;
  switchLabel: string;
  onSwitch: () => void;
  rightRail: React.ReactNode;
}

export const PhaseRail: React.FC<PhaseRailProps> = ({ railHeader, phases, activeIdx, onSelect, numbered, switchLabel, onSwitch, rightRail }) => {
  const activePhase = phases[activeIdx];

  return (
    <div style={{ display: 'flex', height: '100%', borderTop: '1px solid var(--line)' }}>

      {/* Left Rail: Phases */}
      <div style={{ width: '250px', borderRight: '1px solid var(--line)', padding: '24px 0', background: 'var(--card)', display: 'flex', flexDirection: 'column' }}>
        <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', padding: '0 24px', marginBottom: '16px' }}>{railHeader}</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {phases.map((phase, idx) => {
            const isActive = idx === activeIdx;
            return (
              <li
                key={phase.name}
                onClick={() => onSelect(idx)}
                style={{
                  padding: '12px 24px',
                  cursor: 'pointer',
                  background: isActive ? 'var(--ember-soft)' : 'transparent',
                  color: isActive ? 'var(--ember)' : 'var(--ink2)',
                  fontWeight: isActive ? 700 : 500,
                  borderRight: isActive ? '4px solid var(--ember)' : '4px solid transparent',
                  transition: 'background 0.2s, color 0.2s'
                }}
              >
                {numbered ? `${idx + 1}. ${phase.name}` : phase.name}
              </li>
            );
          })}
        </ul>
        <div style={{ padding: '0 24px' }}>
          <button
            onClick={onSwitch}
            style={{ width: '100%', padding: '12px', background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
          >
            {switchLabel}
          </button>
        </div>
      </div>

      {/* Center: Phase Detail */}
      <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{activePhase.name}</h2>
        <p style={{ color: 'var(--ink2)', fontSize: '1.1rem', marginBottom: '32px' }}>{activePhase.subtitle}</p>

        <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--ink)' }}>
            {activePhase.body}
          </p>
        </div>

        {activePhase.callout && (
          <div style={{ background: 'var(--ember-soft)', borderLeft: '4px solid var(--ember)', borderRadius: '8px', padding: '20px 24px', marginBottom: '24px', fontStyle: 'italic', color: 'var(--ink)', fontSize: '1.05rem' }}>
            {activePhase.callout}
          </div>
        )}

        {activePhase.bullets?.length > 0 && (
          <ul style={{ marginBottom: '24px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activePhase.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.5 }}>{b}</li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '24px' }}>
          <button
            disabled={activeIdx === 0}
            onClick={() => onSelect(activeIdx - 1)}
            style={{ padding: '12px 24px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '8px', cursor: activeIdx === 0 ? 'not-allowed' : 'pointer', opacity: activeIdx === 0 ? 0.5 : 1, fontWeight: 600 }}
          >
            ← Previous
          </button>
          <button
            disabled={activeIdx === phases.length - 1}
            onClick={() => onSelect(activeIdx + 1)}
            style={{ padding: '12px 24px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '8px', cursor: activeIdx === phases.length - 1 ? 'not-allowed' : 'pointer', opacity: activeIdx === phases.length - 1 ? 0.5 : 1, fontWeight: 600 }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Right Rail */}
      <div style={{ width: '300px', borderLeft: '1px solid var(--line)', padding: '24px', background: 'var(--card)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {rightRail}
      </div>

    </div>
  );
};
