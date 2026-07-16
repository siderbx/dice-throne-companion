import React from 'react';
import { useStore, type AdvSession } from '../store';

const DIFFICULTIES = [
  { level: 'Intro', defaultSalves: 15 },
  { level: 'Moderate', defaultSalves: 12 },
  { level: 'Hard', defaultSalves: 9 },
  { level: 'Brutal', defaultSalves: 6 },
  { level: 'Ruthless', defaultSalves: 3 }
];

export const AdventuresSetup: React.FC = () => {
  const { state, setState, setScreen } = useStore();
  
  // Default values for local setup state
  const difficulty = state.adv?.difficulty || 'Moderate';
  const initialSalves = state.adv?.initialSalves || 12;

  const handleDifficulty = (level: string, salves: number) => {
    setState(prev => ({
      ...prev,
      adv: {
        ...prev.adv,
        difficulty: level,
        initialSalves: salves,
        currentSalves: salves
      }
    }));
  };

  return (
    <div style={{ display: 'flex', height: '100%', padding: '40px', gap: '60px' }}>
      
      {/* Left Column: Wizard */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>Adventures Setup</h1>
          <p style={{ color: 'var(--ink2)', fontSize: '1.2rem' }}>Configure your 8-scenario campaign.</p>
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>1. Difficulty</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {DIFFICULTIES.map(diff => (
              <button
                key={diff.level}
                onClick={() => handleDifficulty(diff.level, diff.defaultSalves)}
                style={{
                  padding: '16px 24px',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: difficulty === diff.level ? 'var(--ember)' : 'var(--card)',
                  color: difficulty === diff.level ? 'white' : 'var(--ink)',
                  border: difficulty === diff.level ? 'none' : '1px solid var(--line)',
                  boxShadow: difficulty === diff.level ? 'var(--shadow-featured)' : 'none',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{diff.level}</span>
                <span className="mono-text" style={{ fontSize: '0.8rem', color: difficulty === diff.level ? 'var(--ember-soft)' : 'var(--ink3)' }}>{diff.defaultSalves} SALVES</span>
              </button>
            ))}
          </div>
        </div>

        <div>
           <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>2. Campaign Outline</h2>
           <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[1,2,3,4,5,6,7,8].map(scenario => {
                  const isBoss = scenario % 2 === 0;
                  return (
                    <div key={scenario} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div className="mono-text" style={{ width: '24px', height: '24px', background: 'var(--paper2)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', fontWeight: 700 }}>{scenario}</div>
                      <div style={{ fontWeight: 600, color: isBoss ? 'var(--ember)' : 'var(--ink)' }}>{isBoss ? 'Boss Battle' : 'Portal Crawl'}</div>
                    </div>
                  )
                })}
              </div>
           </div>
        </div>
      </div>

      {/* Right Column: Ledger */}
      <div style={{ flex: 1 }}>
        <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', position: 'sticky', top: '40px' }}>
          <h3 className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--ink3)', marginBottom: '24px', letterSpacing: '1px' }}>CAMPAIGN LEDGER</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--line)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--ink2)' }}>Difficulty</span>
              <span style={{ fontWeight: 600 }}>{difficulty}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--line)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--ink2)' }}>Starting Salves</span>
              <span style={{ fontWeight: 600, color: 'var(--verd)' }}>{initialSalves}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--line)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--ink2)' }}>Heroes</span>
              <span style={{ fontWeight: 600 }}>{state.selectedCount}</span>
            </div>
          </div>

          <button 
            onClick={() => {
              // Ensure we have some default structure in adv
              if(!state.adv || !state.adv.sessions) {
                 const sessions: AdvSession[] = Array.from({ length: 8 }, () => ({ result: null, remainingSalves: 0, goldUnspent: 0, exploredAll: false, bossLoot: 0, score: 0 }));
                 setState(p => ({ ...p, adv: { ...p.adv, sessions, currentSalves: initialSalves } }));
              }
              setScreen('adventures'); // Adventures Scoring Sheet
            }}
            style={{ width: '100%', background: 'var(--ember)', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1.2rem' }}
          >
            Begin Campaign
          </button>
        </div>
      </div>

    </div>
  );
};
