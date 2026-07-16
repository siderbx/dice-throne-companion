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

export interface PlayerPerks {
  name: string;
  circles: Record<string, number[]>; // perkId -> filled count per difficulty column
}

export interface PvpPlayer {
  name: string;
  hp: number;
  cp: number;
  statuses: Record<string, number>;
}

export interface PvpState {
  isSetup?: boolean;
  playerCount?: number;
  startingHp?: number;
  players?: PvpPlayer[];
  round?: number;
}

export interface AdvSession {
  result: 'win' | 'loss' | null;
  remainingSalves: number;
  goldUnspent: number;
  exploredAll: boolean;
  bossLoot: number;
  score: number;
}

export interface AdvState {
  difficulty?: string;
  initialSalves?: number;
  currentSalves?: number;
  witchKeys?: number;
  sessions?: AdvSession[];
}

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
  perkPlayers: PlayerPerks[];
  sessionPP: number;
  statusFilter: string;
  rulesCategory: string;
  rulesQuery: string;
  rulesSelected: string | null;
  pvp: PvpState;
  adv: AdvState;
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
        // Always land on the Hub on load — the resume bar's "Continue Session"
        // button is the intended way back into an in-progress screen, not a
        // persisted raw screen value that skips the Hub entirely.
        return { ...JSON.parse(saved), screen: 'hub' };
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
