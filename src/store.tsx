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
  | 'perks'
  | 'settings'
  | 'tokens'
  | 'dice-symbols'
  | 'faq';

export type Theme = 'light' | 'dark';

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
  theme: Theme;
  selectedCount: number;
  heroMom: number[];
  heroStatuses: Record<string, number>[];
  crisisClock: number;
  round: number;
  heroNames: string[];
  bossHp: number;
  bossMaxHp: number;
  activePerkPlayer: number;
  perkPlayers: PlayerPerks[];
  sessionPP: number;
  pvp: PvpState;
  adv: AdvState;
}

const defaultState: AppState = {
  screen: 'hub',
  theme: 'light',
  selectedCount: 1,
  heroMom: [2],
  heroStatuses: [{}],
  crisisClock: 0,
  round: 1,
  heroNames: ['Hero 1'],
  bossHp: 50,
  bossMaxHp: 50,
  activePerkPlayer: 0,
  perkPlayers: [],
  sessionPP: 0,
  pvp: {},
  adv: {}
};

interface StoreContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  setScreen: (screen: Screen) => void;
  setTheme: (theme: Theme) => void;
  resetSession: () => void;
  goBack: () => void;
  canGoBack: boolean;
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

  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
  }, [state.theme]);

  // Not persisted — always starts empty since load always lands on the Hub.
  const [history, setHistory] = useState<Screen[]>([]);

  const setScreen = (screen: Screen) => {
    if (screen === state.screen) return;
    setHistory((h) => [...h, state.screen]);
    setState((prev) => ({ ...prev, screen }));
  };

  const setTheme = (theme: Theme) => {
    setState((prev) => ({ ...prev, theme }));
  };

  const resetSession = () => {
    setState((prev) => ({ ...defaultState, theme: prev.theme, screen: 'hub' }));
    setHistory([]);
  };

  const goBack = () => {
    setHistory((h) => {
      const prevScreen = h[h.length - 1] ?? 'hub';
      setState((prev) => ({ ...prev, screen: prevScreen }));
      return h.slice(0, -1);
    });
  };

  return (
    <StoreContext.Provider value={{ state, setState, setScreen, setTheme, resetSession, goBack, canGoBack: history.length > 0 }}>
      {children}
    </StoreContext.Provider>
  );
};
