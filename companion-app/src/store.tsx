import React, { createContext, useContext, useState, useEffect } from 'react';

// Simplified state interface based on README
export interface AppState {
  screen: string;
  selectedCount: number;
  heroHp: number[];
  heroMom: number[];
  heroStatuses: Record<string, number>[];
  crisisClock: number;
  clockTriggered: boolean;
  round: number;
  heroNames: string[];
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
  heroHp: [50],
  heroMom: [2],
  heroStatuses: [{}],
  crisisClock: 0,
  clockTriggered: false,
  round: 1,
  heroNames: ['Hero 1'],
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
  setScreen: (screen: string) => void;
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

  const setScreen = (screen: string) => {
    setState((prev) => ({ ...prev, screen }));
  };

  return (
    <StoreContext.Provider value={{ state, setState, setScreen }}>
      {children}
    </StoreContext.Provider>
  );
};
