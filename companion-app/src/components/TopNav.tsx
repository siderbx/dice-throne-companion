import React from 'react';
import { useStore, type Screen } from '../store';

const SCREEN_LABELS: Partial<Record<Screen, string>> = {
  pvp: 'PVP',
  missions: 'Missions',
  setup: 'Missions · Setup',
  play: 'Missions · Play',
  adventures: 'Adventures',
  advSetup: 'Adventures · Setup',
  advPlay: 'Adventures · Play',
  rules: 'Rules',
  'status-effects': 'Status Effects',
  trackers: 'Trackers',
  perks: 'Perks',
};

export const TopNav: React.FC = () => {
  const { state, setScreen, goBack, canGoBack } = useStore();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        borderBottom: '1px solid var(--line)',
        background: 'var(--paper2)',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={() => setScreen('hub')}
          className="mono-text"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--ink)',
            padding: 0,
          }}
        >
          <span style={{ color: 'var(--ember)', fontSize: '1.3rem' }}>◆</span> DICE THRONE
        </button>

        {canGoBack && (
          <button
            onClick={goBack}
            style={{
              background: 'transparent',
              border: '1px solid var(--line)',
              color: 'var(--ink2)',
              padding: '6px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            ← Back
          </button>
        )}
      </div>

      <div className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--ink3)', letterSpacing: '0.5px' }}>
        {SCREEN_LABELS[state.screen] ?? ''}
      </div>
    </div>
  );
};
