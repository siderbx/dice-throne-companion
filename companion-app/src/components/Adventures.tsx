import React from 'react';
import { useStore, type AdvSession } from '../store';

const emptySession = (): AdvSession => ({ result: null, remainingSalves: 0, goldUnspent: 0, exploredAll: false, bossLoot: 0, score: 0 });

export const Adventures: React.FC = () => {
  const { state, setState, setScreen } = useStore();

  const sessions: AdvSession[] = Array.from({ length: 8 }, (_, i) => ({ ...emptySession(), ...(state.adv?.sessions?.[i] || {}) }));

  const updateSession = (i: number, updates: Partial<AdvSession>) => {
    const newSessions = sessions.map((s, idx) => idx === i ? { ...s, ...updates } : s);
    setState(prev => ({ ...prev, adv: { ...prev.adv, sessions: newSessions } }));
  };

  // Rules: win = -10 flat is NOT the rule for a win, only for a loss. On loss, seed the
  // rulebook's flat -10 penalty as a starting point; it stays editable per-card.
  const setResult = (i: number, result: 'win' | 'loss') => {
    const session = sessions[i];
    const nextResult = session.result === result ? null : result;
    const updates: Partial<AdvSession> = { result: nextResult };
    if (nextResult === 'loss') updates.score = -10;
    if (nextResult === null) updates.score = 0;
    updateSession(i, updates);
  };

  const campaignTotal = sessions.reduce((sum, s) => sum + (s.result ? s.score : 0), 0);

  // Salves chain forward: win carries the remaining count, loss adds +3 (per RULES_DATA "salves").
  const nextStartingSalves = (i: number) => {
    const s = sessions[i];
    if (!s.result) return null;
    return s.result === 'win' ? s.remainingSalves : s.remainingSalves + 3;
  };

  const witchKeys = state.adv?.witchKeys || 0;
  const toggleWitchKey = (key: number) => {
    const hasKey = witchKeys >= key;
    setState(p => ({ ...p, adv: { ...p.adv, witchKeys: hasKey ? key - 1 : key } }));
  };

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
             <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ember)' }}>{campaignTotal}</span>
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
              {sessions.map((sess, i) => {
                const isBoss = (i + 1) % 2 === 0;
                const next = nextStartingSalves(i);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                    <td style={{ padding: '24px', fontWeight: 600 }}>{i + 1}. {isBoss ? 'Boss Battle' : 'Portal Crawl'}</td>
                    <td style={{ padding: '24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => setResult(i, 'win')}
                          style={{ padding: '6px 12px', borderRadius: '16px', border: sess.result === 'win' ? 'none' : '1px solid var(--line)', background: sess.result === 'win' ? 'var(--verd)' : 'transparent', color: sess.result === 'win' ? 'white' : 'var(--ink)', cursor: 'pointer', fontWeight: 600 }}
                        >Win</button>
                        <button
                          onClick={() => setResult(i, 'loss')}
                          style={{ padding: '6px 12px', borderRadius: '16px', border: sess.result === 'loss' ? 'none' : '1px solid var(--line)', background: sess.result === 'loss' ? 'var(--ember)' : 'transparent', color: sess.result === 'loss' ? 'white' : 'var(--ink)', cursor: 'pointer', fontWeight: 600 }}
                        >Loss</button>
                      </div>
                    </td>
                    <td style={{ padding: '24px' }}>
                      <input
                        type="number"
                        value={sess.remainingSalves}
                        onChange={(e) => updateSession(i, { remainingSalves: Math.max(0, Math.min(15, parseInt(e.target.value) || 0)) })}
                        style={{ width: '60px', padding: '8px', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'center', background: 'var(--paper2)', fontFamily: 'var(--font-mono)' }}
                      />
                      {next !== null && (
                        <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--ink3)', marginTop: '6px' }}>→ next: {next}</div>
                      )}
                    </td>
                    <td style={{ padding: '24px', color: 'var(--ink3)' }}>
                      {isBoss ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>Loot</span>
                          <input type="number" value={sess.bossLoot} onChange={(e) => updateSession(i, { bossLoot: Math.max(0, parseInt(e.target.value) || 0) })} style={{ width: '50px', padding: '6px', borderRadius: '6px', border: '1px solid var(--line)', textAlign: 'center' }} />
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span>Gold</span>
                          <input type="number" value={sess.goldUnspent} onChange={(e) => updateSession(i, { goldUnspent: Math.max(0, parseInt(e.target.value) || 0) })} style={{ width: '50px', padding: '6px', borderRadius: '6px', border: '1px solid var(--line)', textAlign: 'center' }} />
                          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--ink2)' }}>
                            <input type="checkbox" checked={sess.exploredAll} onChange={(e) => updateSession(i, { exploredAll: e.target.checked })} />
                            Explored All
                          </label>
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '24px', textAlign: 'right' }}>
                      <input
                        type="number"
                        value={sess.score}
                        disabled={!sess.result}
                        onChange={(e) => updateSession(i, { score: parseInt(e.target.value) || 0 })}
                        style={{ width: '70px', padding: '8px', borderRadius: '8px', border: '1px solid var(--line)', textAlign: 'right', fontWeight: 700, fontSize: '1.1rem', background: sess.result ? 'var(--paper2)' : 'var(--line2)', opacity: sess.result ? 1 : 0.5, fontFamily: 'var(--font-mono)' }}
                      />
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
                const hasKey = witchKeys >= key;
                return (
                  <div
                    key={key}
                    onClick={() => toggleWitchKey(key)}
                    style={{ flex: 1, height: '48px', borderRadius: '8px', border: hasKey ? 'none' : '2px dashed var(--line)', background: hasKey ? 'var(--brass)' : 'transparent', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s' }}
                  >
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
