import { useStore } from './store'
import { Hub } from './components/Hub'
import { Adventures } from './components/Adventures'
import { PvP } from './components/PvP'
import { Rules } from './components/Rules'
import { StatusEffects } from './components/StatusEffects'
import { MissionsDashboard } from './components/MissionsDashboard'
import { Trackers } from './components/Trackers'
import { Perks } from './components/Perks'
import './App.css'

function App() {
  const { state } = useStore()

  return (
    <div className="app-container">
      {state.screen === 'hub' && <Hub />}
      {state.screen === 'adventures' && <Adventures />}
      {state.screen === 'pvp' && <PvP />}
      {state.screen === 'missions' && <MissionsDashboard />}
      {state.screen === 'rules' && <Rules />}
      {(state.screen === 'status-effects' || state.screen === 'statuses') && <StatusEffects />}
      {state.screen === 'trackers' && <Trackers />}
      {state.screen === 'perks' && <Perks />}
    </div>
  )
}

export default App