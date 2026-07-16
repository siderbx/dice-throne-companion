import React from 'react';
import { useStore, type Screen } from '../store';

export const MissionsDashboard: React.FC = () => {
  const { state, setScreen } = useStore();

  return (
    <div style={{ display: 'flex', height: '100%', padding: '40px', gap: '40px' }}>
      
      {/* Left Column: New Game & Resume */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Missions</h1>
        
        {/* New Game Hero Card */}
        <div style={{ 
          background: 'linear-gradient(135deg, var(--card) 0%, var(--paper2) 100%)', 
          border: '2px solid var(--ember)', 
          borderRadius: '16px', 
          padding: '40px', 
          position: 'relative', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px'
        }}>
          <div style={{ position: 'absolute', right: '-40px', bottom: '-80px', fontSize: '300px', color: 'var(--ember-soft)', opacity: 0.3, userSelect: 'none', lineHeight: 1 }}>◆</div>
          
          <div className="mono-text" style={{ background: 'var(--ember-soft)', color: 'var(--ember)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '1px' }}>START FRESH</div>
          
          <h2 style={{ fontSize: '2.5rem', position: 'relative', zIndex: 1 }}>Start a New Game</h2>
          <p style={{ color: 'var(--ink2)', fontSize: '1.1rem', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
            Team up against Henchmen and Bosses. Gather your heroes and prepare for battle.
          </p>
          
          <button 
            onClick={() => setScreen('setup')}
            style={{ background: 'var(--ember)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1.2rem', position: 'relative', zIndex: 1, marginTop: '16px' }}
          >
            Setup New Game
          </button>
        </div>

        {/* Resume Bar */}
        <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Resume Session</h3>
            <div style={{ display: 'flex', gap: '24px', color: 'var(--ink2)' }}>
              <span>Round: <b>{state.round}</b></span>
              <span>Crisis Clock: <b>{state.crisisClock}</b></span>
              <span>Heroes: <b>{state.selectedCount}</b></span>
            </div>
          </div>
          <button 
            onClick={() => setScreen('play')}
            style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '1rem' }}
          >
            Continue
          </button>
        </div>
      </div>

      {/* Right Column: Tools & Roster */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Tools List */}
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', borderBottom: '2px solid var(--line)', paddingBottom: '8px' }}>Tools</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {([
              { label: 'Turn Guide', screen: 'play' },
              { label: 'Crisis Clock', screen: 'trackers' },
              { label: 'Trackers', screen: 'trackers' },
              { label: 'Status Effects', screen: 'status-effects' },
              { label: 'Rules Lookup', screen: 'rules' },
            ] satisfies { label: string; screen: Screen }[]).map(tool => (
              <button 
                key={tool.label}
                onClick={() => setScreen(tool.screen)}
                style={{ background: 'var(--card)', border: '1px solid var(--line)', padding: '16px 20px', borderRadius: '12px', textAlign: 'left', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {tool.label}
                <span style={{ color: 'var(--ink3)' }}>→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Hero Roster Strip (Placeholder for now) */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '12px', padding: '20px' }}>
          <h4 className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--ink3)', marginBottom: '16px' }}>CURRENT HEROES</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {state.heroNames.map((name, i) => (
              <div key={i} style={{ background: 'var(--paper2)', border: '1px solid var(--line2)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
                {name}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
