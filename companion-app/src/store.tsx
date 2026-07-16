import React, { createContext, useContext, useState, useEffect } from 'react';

export type Screen =
  | 'hub'
  | 'pvp'
  | 'missions'
  | 'setup'
  | 'play'
  | 'adventures'
  | 'advSetup'
  | 'advPlay'
  | 'rules'
  | 'status-effects'
  | 'trackers'
  | 'perks';

// Simplified state interface based on README
export interface AppState {
  screen: Screen;
  selectedCount: number;
  heroMom: number[];
  heroStatuses: Record<string, number>[];
  crisisClock: number;
  clockTriggered: boolean;
  round: number;
  heroNames: string[];
  bossHp: number;
  bossMaxHp: number;
  activePerkPlayer: number;
  perkPlayers: any[];
  sessionPP: number;
  statusFilter: string;
  rulesCategory: string;
  rulesQuery: string;
  rulesSelected: string | null;
  pvp: any;
  adv: any;
}

const defaultState: AppState = {
  screen: 'hub',
  selectedCount: 1,
  heroMom: [2],
  heroStatuses: [{}],
  crisisClock: 0,
  clockTriggered: false,
  round: 1,
  heroNames: ['Hero 1'],
  bossHp: 50,
  bossMaxHp: 50,
  activePerkPlayer: 0,
  perkPlayers: [],
  sessionPP: 0,
  statusFilter: 'All',
  rulesCategory: 'All',
  rulesQuery: '',
  rulesSelected: null,
  pvp: {},
  adv: {}
};

interface StoreContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  setScreen: (screen: Screen) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('dt-state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse state from localStorage', e);
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('dt-state', JSON.stringify(state));
  }, [state]);

  const setScreen = (screen: Screen) => {
    setState((prev) => ({ ...prev, screen }));
  };

  return (
    <StoreContext.Provider value={{ state, setState, setScreen }}>
      {children}
    </StoreContext.Provider>
  );
};
