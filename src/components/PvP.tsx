import React from 'react';
import { useStore, type PvpPlayer, type PvpState } from '../store';
import { nextStatusValue, type StatusDefWithId } from '../lib/status';
import { StatusChipList } from './StatusChip';

export const PvP: React.FC = () => {
  const { state, setState } = useStore();

  // Initialize default state if missing
  const pvp = state.pvp || {};
  const isSetup = pvp.isSetup === undefined ? true : pvp.isSetup;
  const playerCount = pvp.playerCount || 2;
  const startingHp = pvp.startingHp || 50;
  const players = pvp.players || [];

  const updatePvP = (updates: Partial<PvpState>) => {
    setState(prev => ({ ...prev, pvp: { ...prev.pvp, ...updates } }));
  };

  const startMatch = () => {
    const newPlayers: PvpPlayer[] = Array(playerCount).fill(0).map((_, i) => ({
      name: `Player ${i + 1}`,
      hp: startingHp,
      cp: 2,
      statuses: {}
    }));
    updatePvP({ isSetup: false, players: newPlayers, round: 1 });
  };

  const handleHpChange = (index: number, delta: number) => {
    const newPlayers = [...players];
    newPlayers[index].hp = Math.max(0, newPlayers[index].hp + delta);
    updatePvP({ players: newPlayers });
  };

  const handleCpChange = (index: number, delta: number) => {
    const newPlayers = [...players];
    newPlayers[index].cp = Math.max(0, Math.min(15, newPlayers[index].cp + delta));
    updatePvP({ players: newPlayers });
  };

  const handleStatusTap = (index: number, status: StatusDefWithId) => {
    const newPlayers = [...players];
    newPlayers[index].statuses[status.id] = nextStatusValue(newPlayers[index].statuses[status.id] || 0, status.limit);
    updatePvP({ players: newPlayers });
  };

  const handleNameChange = (index: number, name: string) => {
    const newPlayers = [...players];
    newPlayers[index].name = name;
    updatePvP({ players: newPlayers });
  };

  if (isSetup) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px', gap: '40px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>PvP Mode</h1>
          <p style={{ color: 'var(--ink2)', fontSize: '1.2rem' }}>Configure your battle.</p>
        </div>

        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Number of Players</h2>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => updatePvP({ playerCount: num })}
                  className="display-text"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    fontSize: '2rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: playerCount === num ? 'var(--ember)' : 'var(--card)',
                    color: playerCount === num ? 'white' : 'var(--ink)',
                    border: playerCount === num ? 'none' : '1px solid var(--line)',
                    boxShadow: playerCount === num ? 'var(--shadow-featured)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Starting Health</h2>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {[50, 40, 35, 30].map(hp => (
                <button
                  key={hp}
                  onClick={() => updatePvP({ startingHp: hp })}
                  className="display-text"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: startingHp === hp ? 'var(--verd)' : 'var(--card)',
                    color: startingHp === hp ? 'white' : 'var(--ink)',
                    border: startingHp === hp ? 'none' : '1px solid var(--line)',
                    boxShadow: startingHp === hp ? 'var(--shadow-featured)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  {hp}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={startMatch}
          style={{ 
            marginTop: 'auto',
            background: 'var(--ember)', 
            color: 'white', 
            border: 'none', 
            padding: '20px', 
            borderRadius: '12px', 
            fontWeight: 700, 
            cursor: 'pointer', 
            fontSize: '1.5rem',
            boxShadow: 'var(--shadow-featured)'
          }}
        >
          Begin Battle
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--line)', background: 'var(--paper2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--ink3)' }}>ROUND</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--card)', borderRadius: '8px', border: '1px solid var(--line)', padding: '4px' }}>
            <button onClick={() => updatePvP({ round: Math.max(1, (pvp.round || 1) - 1) })} style={{ width: '32px', height: '32px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>-</button>
            <span style={{ width: '32px', textAlign: 'center', fontWeight: 700, fontSize: '1.2rem' }}>{pvp.round || 1}</span>
            <button onClick={() => updatePvP({ round: (pvp.round || 1) + 1 })} style={{ width: '32px', height: '32px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>+</button>
          </div>
        </div>
        <button 
          onClick={() => {
            if (confirm("Reset game and return to setup?")) {
              updatePvP({ isSetup: true });
            }
          }}
          style={{ background: 'transparent', border: '1px solid var(--line)', color: 'var(--ink2)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          End Game
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, padding: '24px', gap: '24px', overflowX: 'auto' }}>
        {players.map((player: PvpPlayer, i: number) => (
          <div key={i} style={{ flex: '0 0 auto', minWidth: '320px', maxWidth: '400px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--slate)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                {(player.name || 'P').charAt(0).toUpperCase()}
              </div>
              <input 
                type="text"
                value={player.name}
                onChange={(e) => handleNameChange(i, e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--ink)',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* HP Tracker */}
            <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', borderBottom: '1px solid var(--line)' }}>
              <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', background: 'var(--paper2)', padding: '4px 12px', borderRadius: '12px' }}>HEALTH POINTS</div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => handleHpChange(i, -5)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ember)', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>-5</button>
                  <button onClick={() => handleHpChange(i, -1)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>-1</button>
                </div>
                
                <div className="display-text" style={{ fontSize: '4.5rem', fontWeight: 700, color: 'var(--ember)', width: '100px', textAlign: 'center', lineHeight: 1 }}>
                  {player.hp}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => handleHpChange(i, +5)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--verd)', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>+5</button>
                  <button onClick={() => handleHpChange(i, +1)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', background: 'var(--paper2)', color: 'var(--ink)', fontWeight: 700, cursor: 'pointer', fontSize: '1.1rem' }}>+1</button>
                </div>
              </div>
            </div>

            {/* CP Tracker */}
            <div style={{ padding: '20px 16px', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)' }}>COMBAT POINTS (CP)</div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => handleCpChange(i, -1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>-</button>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', width: '32px', textAlign: 'center' }}>{player.cp}</div>
                  <button onClick={() => handleCpChange(i, +1)} style={{ width: '28px', height: '28px', borderRadius: '4px', border: 'none', background: 'var(--paper2)', cursor: 'pointer', fontWeight: 700 }}>+</button>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {Array(15).fill(0).map((_, cpIndex) => (
                  <div key={cpIndex} style={{ width: 'calc(20% - 4px)', height: '8px', borderRadius: '2px', background: cpIndex < player.cp ? 'var(--brass)' : 'var(--line2)' }} />
                ))}
              </div>
            </div>

            {/* Status Effects */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: '8px', background: 'var(--paper2)' }}>
              <StatusChipList statuses={player.statuses} onTap={(status) => handleStatusTap(i, status)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
