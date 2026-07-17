import React from 'react';
import { useStore } from '../store';

export const Hub: React.FC = () => {
  const { state, setScreen } = useStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--ember)', fontSize: '1.5rem' }}>◆</span> DICE THRONE
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>⌕</button>
          <button onClick={() => setScreen('settings')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>⚙</button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '40px', color: 'var(--ink)' }}>What are you playing tonight?</h1>

        {/* Mode Tiles */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '60px', width: '100%', maxWidth: '900px' }}>
          
          <button 
            onClick={() => setScreen('pvp')}
            style={{ flex: 1, padding: '32px', borderRadius: '16px', background: 'var(--card)', border: '1px solid var(--line)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'transform 0.2s, box-shadow 0.2s' }}
          >
            <h2 style={{ fontSize: '2rem' }}>PVP</h2>
            <p style={{ color: 'var(--ink2)', fontFamily: 'var(--font-ui)', fontSize: '1.1rem' }}>Classic 1v1, Team, or FFA battles.</p>
          </button>

          <button
            onClick={() => setScreen('missions')}
            style={{ flex: 1, padding: '32px', borderRadius: '16px', background: 'var(--card)', border: '1px solid var(--line)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <h2 style={{ fontSize: '2rem' }}>Missions</h2>
            <p style={{ color: 'var(--ink2)', fontFamily: 'var(--font-ui)', fontSize: '1.1rem' }}>Co-op battles against Henchmen and Bosses.</p>
          </button>

          <button 
            onClick={() => setScreen('advSetup')}
            style={{ flex: 1, padding: '32px', borderRadius: '16px', background: 'var(--card)', border: '1px solid var(--line)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <h2 style={{ fontSize: '2rem' }}>Adventures</h2>
            <p style={{ color: 'var(--ink2)', fontFamily: 'var(--font-ui)', fontSize: '1.1rem' }}>8-scenario cooperative campaign.</p>
          </button>

        </div>

        {/* Resume Bar */}
        <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px 32px', width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            <div>
              <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '4px' }}>CURRENT SESSION</div>
              <div style={{ fontWeight: 600 }}>Missions • Round {state.round}</div>
            </div>
            <div>
              <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '4px' }}>HEROES</div>
              <div style={{ fontWeight: 600 }}>{state.selectedCount}</div>
            </div>
            <div>
              <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '4px' }}>CRISIS CLOCK</div>
              <div style={{ fontWeight: 600 }}>{state.crisisClock} / 8</div>
            </div>
          </div>
          <button 
            onClick={() => setScreen('missions')} // Could be dynamic based on last played
            style={{ background: 'var(--ember)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
          >
            Continue Session
          </button>
        </div>
      </div>

      {/* Footer Strip */}
      <footer style={{ display: 'flex', justifyContent: 'center', gap: '32px', padding: '20px', borderTop: '1px solid var(--line)', color: 'var(--ink2)', fontSize: '0.9rem', fontWeight: 500 }}>
        <span style={{ cursor: 'pointer' }} onClick={() => setScreen('status-effects')}>Status Effects</span>
        <span style={{ cursor: 'pointer' }} onClick={() => setScreen('rules')}>All Rules</span>
        <span style={{ cursor: 'pointer' }} onClick={() => setScreen('tokens')}>Tokens</span>
        <span style={{ cursor: 'pointer' }} onClick={() => setScreen('dice-symbols')}>Dice & Symbols</span>
        <span style={{ cursor: 'pointer' }}>FAQ</span>
      </footer>

    </div>
  );
};
