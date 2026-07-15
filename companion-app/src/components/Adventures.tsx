import React from 'react';
import { useStore } from '../store';

export const Adventures: React.FC = () => {
  const { state, setState, setScreen } = useStore();

  const sessions = state.adv?.sessions || Array(8).fill({ result: null, remainingSalves: 0, score: 0 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px' }}>
      
      {/* Top Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2.5rem' }}>Campaign Score</h1>
          <span className="mono-text" style={{ background: 'var(--paper2)', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--ink2)' }}>{state.adv?.difficulty?.toUpperCase() || 'MODERATE'}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)' }}>INITIAL SALVES</span>
             <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--verd)' }}>{state.adv?.initialSalves || 0}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
             <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)' }}>CAMPAIGN TOTAL</span>
             <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ember)' }}>0</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '40px', flex: 1, overflow: 'hidden' }}>
        
        {/* Scenario Table */}
        <div style={{ flex: 1, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--paper2)', position: 'sticky', top: 0, zIndex: 10 }}>
              <tr>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', fontWeight: 600, color: 'var(--ink2)' }} className="mono-text">SCENARIO</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', fontWeight: 600, color: 'var(--ink2)' }} className="mono-text">RESULT</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', fontWeight: 600, color: 'var(--ink2)' }} className="mono-text">SALVES REMAINING</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', fontWeight: 600, color: 'var(--ink2)' }} className="mono-text">BONUSES</th>
                <th style={{ padding: '16px 24px', borderBottom: '1px solid var(--line)', fontWeight: 600, color: 'var(--ink2)', textAlign: 'right' }} className="mono-text">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((sess: any, i: number) => {
                const isBoss = (i + 1) % 2 === 0;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '24px', fontWeight: 600 }}>{i + 1}. {isBoss ? 'Boss Battle' : 'Portal Crawl'}</td>
                    <td style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Win</button>
                        <button style={{ padding: '6px 12px', borderRadius: '16px', border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Loss</button>
                      </div>
                    </td>
                    <td style={{ padding: '24px' }}>
                      <input type="number" defaultValue="0" style={{ width: '60px', padding: '8px', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'center', background: 'var(--paper2)', fontFamily: 'var(--font-mono)' }} />
                    </td>
                    <td style={{ padding: '24px', color: 'var(--ink3)' }}>
                      {isBoss ? 'Loot Value' : 'Gold / Explored'}
                    </td>
                    <td style={{ padding: '24px', textAlign: 'right', fontWeight: 700, fontSize: '1.2rem' }}>
                      -
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Panel: Side Tools */}
        <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <button 
            onClick={() => setScreen('advPlay')}
            style={{ padding: '20px', background: 'var(--ember)', color: 'white', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, boxShadow: 'var(--shadow-featured)' }}
          >
            Play Scenario Phase Rail →
          </button>

          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '12px', padding: '24px' }}>
             <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', marginBottom: '16px' }}>WITCH KEYS</h3>
             <div style={{ display: 'flex', gap: '12px' }}>
              {[1,2,3].map(key => {
                const hasKey = (state.adv?.witchKeys || 0) >= key;
                return (
                  <div key={key} style={{ flex: 1, height: '48px', borderRadius: '8px', border: hasKey ? 'none' : '2px dashed var(--line)', background: hasKey ? 'var(--brass)' : 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {hasKey && <span style={{ color: 'white', fontSize: '1.5rem' }}>★</span>}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
