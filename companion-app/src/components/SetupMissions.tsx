import React from 'react';
import { useStore } from '../store';
import { enemyDicePool } from '../lib/mission';

export const SetupMissions: React.FC = () => {
  const { state, setState, setScreen } = useStore();

  const handleCountSelect = (count: number) => {
    const newNames = Array(count).fill('').map((_, i) => state.heroNames[i] || `Hero ${i + 1}`);

    setState(prev => ({
      ...prev,
      selectedCount: count,
      heroNames: newNames
    }));
  };

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...state.heroNames];
    newNames[index] = name;
    setState(prev => ({ ...prev, heroNames: newNames }));
  };

  // Starting Health by hero count, per DTM_Rulebook_master_current_2024.06.13, pg. 4 "Choosing a Mission"
  const startingHp = [45, 30, 25, 20][state.selectedCount - 1] || 20;
  const crisisRate = state.selectedCount;
  const { red: redDice, black: blackDice } = enemyDicePool(state.selectedCount);

  return (
    <div style={{ display: 'flex', height: '100%', padding: '40px', gap: '60px' }}>
      
      {/* Left Column: Wizard */}
      <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>Setup</h1>
          <p style={{ color: 'var(--ink2)', fontSize: '1.2rem' }}>Configure your heroes.</p>
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>1. Hero Count</h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[1, 2, 3, 4].map(num => (
              <button
                key={num}
                onClick={() => handleCountSelect(num)}
                className="display-text"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '16px',
                  fontSize: '2rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: state.selectedCount === num ? 'var(--ember)' : 'var(--card)',
                  color: state.selectedCount === num ? 'white' : 'var(--ink)',
                  border: state.selectedCount === num ? 'none' : '1px solid var(--line)',
                  boxShadow: state.selectedCount === num ? 'var(--shadow-featured)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>2. Hero Names</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {state.heroNames.map((name, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Initial Seal Placeholder */}
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--slate)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 700 }}>
                  {name.charAt(0).toUpperCase() || '?'}
                </div>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                  style={{
                    flex: 1,
                    maxWidth: '300px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--line)',
                    background: 'var(--card)',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--ink)'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Ledger */}
      <div style={{ flex: 1 }}>
        <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '16px', padding: '32px', position: 'sticky', top: '40px' }}>
          <h3 className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--ink3)', marginBottom: '24px', letterSpacing: '1px' }}>GAME LEDGER</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--line)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--ink2)' }}>Starting HP (set on your Health Dial)</span>
              <span style={{ fontWeight: 600 }}>{startingHp}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--line)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--ink2)' }}>Enemy Dice Pool</span>
              <span style={{ fontWeight: 600 }}>{redDice} Red, {blackDice} Black</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dotted var(--line)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--ink2)' }}>Crisis Advance Rate</span>
              <span style={{ fontWeight: 600 }}>+{crisisRate} / Round</span>
            </div>
          </div>

          <button 
            onClick={() => setScreen('play')}
            style={{ width: '100%', background: 'var(--ember)', color: 'white', border: 'none', padding: '16px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1.2rem' }}
          >
            Begin Round 1
          </button>
        </div>
      </div>

    </div>
  );
};
