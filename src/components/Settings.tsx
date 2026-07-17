import React, { useState } from 'react';
import { useStore } from '../store';

const SectionCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
    <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>{title}</h2>
    <p style={{ color: 'var(--ink2)', fontSize: '1rem', marginBottom: '24px' }}>{description}</p>
    {children}
  </div>
);

export const Settings: React.FC = () => {
  const { state, setTheme, resetSession, setScreen } = useStore();
  const [confirmingReset, setConfirmingReset] = useState(false);

  const handleReset = () => {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    resetSession();
    setConfirmingReset(false);
  };

  return (
    <div style={{ padding: '40px', height: '100%', overflowY: 'auto' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>Settings</h1>

        <SectionCard title="Appearance" description="Choose how the app looks.">
          <div style={{ display: 'flex', background: 'var(--paper2)', padding: '6px', borderRadius: '12px', gap: '4px', border: '1px solid var(--line)', width: 'fit-content' }}>
            {(['light', 'dark'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  padding: '10px 24px',
                  background: state.theme === t ? 'var(--card)' : 'transparent',
                  border: state.theme === t ? '1px solid var(--line)' : '1px solid transparent',
                  borderRadius: '8px',
                  fontWeight: state.theme === t ? 700 : 500,
                  color: state.theme === t ? 'var(--ink)' : 'var(--ink2)',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Session" description="Clear the current session (HP, CP, statuses, round, campaign progress) and start fresh from the Hub.">
          <button
            onClick={handleReset}
            onBlur={() => setConfirmingReset(false)}
            style={{
              background: confirmingReset ? 'var(--ember)' : 'transparent',
              color: confirmingReset ? 'white' : 'var(--ember)',
              border: '1px solid var(--ember)',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            {confirmingReset ? 'Click again to confirm reset' : 'Reset Session'}
          </button>
        </SectionCard>

        <SectionCard title="About" description="Dice Throne Companion — a live tracker for PVP, Missions, and Adventures play, replacing paper trackers for HP, Momentum, CP, status tokens, and campaign scoring.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <span className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--ink3)' }}>RULES REFERENCE</span>
              <div>
                <span onClick={() => setScreen('rules')} style={{ color: 'var(--ember)', fontWeight: 600, cursor: 'pointer' }}>
                  Browse All Rules →
                </span>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};
