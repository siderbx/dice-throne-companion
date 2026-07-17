import React, { useState } from 'react';
import { TOKENS_DATA } from '../data/constants';
import { useStore } from '../store';

interface TokenDef {
  id: string;
  cat: 'core' | 'missions' | 'adventures';
  name: string;
  summary: string;
  detail: string;
  ruleId: string | null;
}

const TOKENS = TOKENS_DATA as TokenDef[];

const CAT_STYLES: Record<TokenDef['cat'], { bg: string; border: string; color: string; label: string }> = {
  core: { bg: 'var(--status-unique-bg)', border: 'var(--status-unique-border)', color: 'var(--brass)', label: 'CORE' },
  missions: { bg: 'var(--status-neg-bg)', border: 'var(--status-neg-border)', color: 'var(--ember)', label: 'MISSIONS' },
  adventures: { bg: 'var(--status-pos-bg)', border: 'var(--status-pos-border)', color: 'var(--verd)', label: 'ADVENTURES' },
};

export const Tokens: React.FC = () => {
  const { setScreen } = useStore();
  const [filter, setFilter] = useState<'All' | TokenDef['cat']>('All');

  const filtered = TOKENS.filter(t => filter === 'All' || t.cat === filter);

  return (
    <div style={{ padding: '40px', height: '100%', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>Tokens</h1>
          <p style={{ color: 'var(--ink2)', fontSize: '1.2rem' }}>Physical tokens and tiles used to track game state.</p>
        </div>

        <div style={{ display: 'flex', background: 'var(--paper2)', padding: '6px', borderRadius: '12px', gap: '4px', border: '1px solid var(--line)' }}>
          {(['All', 'core', 'missions', 'adventures'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                background: filter === f ? 'var(--card)' : 'transparent',
                border: filter === f ? '1px solid var(--line)' : '1px solid transparent',
                borderRadius: '8px',
                fontWeight: filter === f ? 700 : 500,
                color: filter === f ? 'var(--ink)' : 'var(--ink2)',
                cursor: 'pointer',
                textTransform: 'capitalize',
                boxShadow: filter === f ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--paper2)', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px 24px', marginBottom: '32px', color: 'var(--ink2)', fontSize: '1rem' }}>
        Looking for Burn, Poison, Shield, Evasive, or another status-effect token? Those live on the{' '}
        <span onClick={() => setScreen('status-effects')} style={{ color: 'var(--ember)', fontWeight: 600, cursor: 'pointer' }}>
          Status Effects
        </span>{' '}
        screen instead.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', flex: 1, overflowY: 'auto', paddingBottom: '8px' }}>
        {filtered.map(token => {
          const style = CAT_STYLES[token.cat];
          return (
            <div key={token.id} style={{ background: style.bg, border: `1px solid ${style.border}`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 700 }}>{token.name}</div>
                <div className="mono-text" style={{ fontSize: '0.75rem', fontWeight: 700, color: style.color, border: `1px solid ${style.color}`, padding: '4px 8px', borderRadius: '16px' }}>
                  {style.label}
                </div>
              </div>

              <p className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--ink3)', marginBottom: '16px' }}>
                {token.summary}
              </p>

              <p style={{ fontSize: '1.05rem', color: 'var(--ink)', flex: 1 }}>
                {token.detail}
              </p>

              {token.ruleId && (
                <button
                  onClick={() => setScreen('rules')}
                  style={{ marginTop: '20px', alignSelf: 'flex-start', background: 'transparent', border: 'none', color: style.color, fontWeight: 600, cursor: 'pointer', padding: 0, fontSize: '0.95rem' }}
                >
                  Full rule →
                </button>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
