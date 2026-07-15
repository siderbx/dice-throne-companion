import React, { useState } from 'react';
import { useStore } from '../store';

const ALL_RULES = [
  { id: 'r1', cat: 'Core', title: 'Targeting', summary: 'How to pick targets in multiplayer.', body: 'When selecting a target for an attack, if multiple opponents are eligible, you must choose one before resolving damage. You cannot split damage unless specifically stated.', seeAlso: ['r2'] },
  { id: 'r2', cat: 'Core', title: 'Defensive Roll', summary: 'Rolling defense dice.', body: 'You may roll defense dice when attacked. This is done after the offensive roll is finalized but before damage is applied.' },
  { id: 'm1', cat: 'Missions', title: 'Crisis Clock', summary: 'The ticking timer of doom.', body: 'The crisis clock advances every round by the number of active heroes. If it reaches 8, it triggers a crisis event.' },
  { id: 'a1', cat: 'Adventures', title: 'Witch Keys', summary: 'Opening locked doors.', body: 'You can hold up to 3 Witch Keys. They persist between scenarios and are used to unlock loot chests.' },
];

export const Rules: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [selectedRule, setSelectedRule] = useState(ALL_RULES[0]);

  const filteredRules = ALL_RULES.filter(r => category === 'All' || r.cat === category);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      
      {/* Left Rail: Categories */}
      <div style={{ width: '220px', borderRight: '1px solid var(--line)', padding: '24px 0', background: 'var(--paper2)' }}>
        <h3 className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--ink3)', padding: '0 24px', marginBottom: '16px' }}>CATEGORIES</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
          {['All', 'Core', 'Missions', 'Adventures', 'PVP'].map((cat) => {
            const isActive = category === cat;
            const count = cat === 'All' ? ALL_RULES.length : ALL_RULES.filter(r => r.cat === cat).length;
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
        
        <p style={{ fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--ink)', marginBottom: '40px' }}>
          {selectedRule.body}
        </p>

        {selectedRule.seeAlso && (
          <div>
            <h4 className="mono-text" style={{ fontSize: '0.9rem', color: 'var(--ink3)', marginBottom: '16px' }}>SEE ALSO</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedRule.seeAlso.map(id => {
                const target = ALL_RULES.find(r => r.id === id);
                return (
                  <button 
                    key={id}
                    onClick={() => {
                       if(target) {
                         setCategory('All');
                         setSelectedRule(target);
                       }
                    }}
                    style={{ background: 'var(--paper2)', border: '1px solid var(--line)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600, color: 'var(--ink)' }}
                  >
                    {target?.title}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
