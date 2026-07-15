import React from 'react';
import { useStore } from './store';
import './index.css';

function App() {
  const { state, setScreen } = useStore();

  return (
    <div className="tablet-frame">
      <div className="tablet-screen">
        <div className="noise-overlay">
          {/* SVG filter for noise */}
          <svg style={{ display: 'none' }}>
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            </filter>
          </svg>
        </div>
        
        <header style={{ padding: '20px', borderBottom: '1px solid var(--line)', display: 'flex', gap: '10px' }}>
          {['hub', 'missions', 'setup', 'play', 'trackers', 'perks', 'status', 'rules', 'adventures', 'pvp'].map((screenName) => (
            <button 
              key={screenName}
              onClick={() => setScreen(screenName)}
              style={{
                padding: '8px 16px',
                background: state.screen === screenName ? 'var(--ember)' : 'var(--paper2)',
                color: state.screen === screenName ? 'white' : 'var(--ink)',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontFamily: 'var(--font-ui)',
                fontWeight: 600
              }}
            >
              {screenName.toUpperCase()}
            </button>
          ))}
        </header>

        <main style={{ padding: '40px', flex: 1, overflowY: 'auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Current Screen: {state.screen}</h1>
          <p>This is a placeholder for the <b>{state.screen}</b> screen.</p>
        </main>
      </div>
    </div>
  );
}

export default App;
