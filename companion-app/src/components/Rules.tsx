import React, { useState } from 'react';
import { RULES_DATA } from '../data/constants';

interface Rule {
  id: string;
  cat: string;
  title: string;
  summary: string;
  body: string;
  callout: string | null;
  bullets: string[];
  seeAlso: { label: string; id: string }[];
}

const RULES = RULES_DATA as Rule[];
const CATEGORIES = ['All', 'Core', 'Missions', 'Adventures', 'PVP'];

export const Rules: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [selectedRule, setSelectedRule] = useState(RULES[0]);

  const matchesCategory = (rule: Rule, cat: string) =>
    cat === 'All' || rule.cat.toLowerCase() === cat.toLowerCase();

  const filteredRules = RULES.filter(r => matchesCategory(r, category));

  return (
    <div style={{ display: 'flex', height: '100%' }}>

      {/* Left Rail: Categories */}
      <div style={{ width: '220px', borderRight: '1px solid var(--line)', padding: '24px 0', background: 'var(--paper2)' }}>
        <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', padding: '0 24px', marginBottom: '16px' }}>CATEGORIES</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            const count = RULES.filter(r => matchesCategory(r, cat)).length;
            return (
              <li
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: '12px 24px',
                  cursor: 'pointer',
                  background: isActive ? 'var(--card)' : 'transparent',
                  color: isActive ? 'var(--ink)' : 'var(--ink2)',
                  fontWeight: isActive ? 700 : 500,
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderRight: isActive ? '4px solid var(--ember)' : '4px solid transparent'
                }}
              >
                {cat}
                <span style={{ color: 'var(--ink3)', fontWeight: 400 }}>{count}</span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Middle List: Rule Cards */}
      <div style={{ width: '380px', borderRight: '1px solid var(--line)', background: 'var(--card)', overflowY: 'auto' }}>
        {filteredRules.map(rule => {
          const isSelected = selectedRule.id === rule.id;
          return (
            <div
              key={rule.id}
              onClick={() => setSelectedRule(rule)}
              style={{
                padding: '24px',
                borderBottom: '1px solid var(--line)',
                background: isSelected ? 'var(--ember-soft)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              <div className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--ink3)', marginBottom: '8px', letterSpacing: '1px' }}>{rule.cat.toUpperCase()}</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: isSelected ? 'var(--ember)' : 'var(--ink)' }}>{rule.title}</h4>
              <p style={{ color: 'var(--ink2)', fontSize: '0.95rem' }}>{rule.summary}</p>
            </div>
          );
        })}
      </div>

      {/* Right Drawer: Detail */}
      <div style={{ flex: 1, padding: '60px', overflowY: 'auto' }}>
        <div className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--ember)', marginBottom: '16px', letterSpacing: '1px', fontWeight: 600 }}>{selectedRule.cat.toUpperCase()}</div>
        <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>{selectedRule.title}</h1>

        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--ink)', marginBottom: selectedRule.callout || selectedRule.bullets?.length ? '32px' : '40px' }}>
          {selectedRule.body}
        </p>

        {selectedRule.callout && (
          <div style={{ background: 'var(--ember-soft)', borderLeft: '4px solid var(--ember)', borderRadius: '8px', padding: '20px 24px', marginBottom: '32px', fontStyle: 'italic', color: 'var(--ink)', fontSize: '1.05rem' }}>
            {selectedRule.callout}
          </div>
        )}

        {selectedRule.bullets?.length > 0 && (
          <ul style={{ marginBottom: '40px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedRule.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: '1.05rem', color: 'var(--ink)', lineHeight: 1.5 }}>{b}</li>
            ))}
          </ul>
        )}

        {selectedRule.seeAlso?.length > 0 && (
          <div>
            <h4 className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--ink3)', marginBottom: '16px' }}>SEE ALSO</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedRule.seeAlso.map(link => {
                const target = RULES.find(r => r.id === link.id);
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      if (target) {
                        setCategory('All');
                        setSelectedRule(target);
                      }
                    }}
                    style={{ background: 'var(--paper2)', border: '1px solid var(--line)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, color: 'var(--ink)' }}
                  >
                    {target?.title || link.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
