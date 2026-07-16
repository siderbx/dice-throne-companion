import { useStore } from './store'
import { Hub } from './components/Hub'
import { Adventures } from './components/Adventures'
import { AdventuresSetup } from './components/AdventuresSetup'
import { AdventuresPlay } from './components/AdventuresPlay'
import { PvP } from './components/PvP'
import { Rules } from './components/Rules'
import { StatusEffects } from './components/StatusEffects'
import { MissionsDashboard } from './components/MissionsDashboard'
import { SetupMissions } from './components/SetupMissions'
import { PlayMissions } from './components/PlayMissions'
import { Trackers } from './components/Trackers'
import { Perks } from './components/Perks'
import './App.css'

function App() {
  const { state } = useStore()

  return (
    <div className="app-container">
      {state.screen === 'hub' && <Hub />}
      {state.screen === 'adventures' && <Adventures />}
      {state.screen === 'advSetup' && <AdventuresSetup />}
      {state.screen === 'advPlay' && <AdventuresPlay />}
      {state.screen === 'pvp' && <PvP />}
      {state.screen === 'missions' && <MissionsDashboard />}
      {state.screen === 'setup' && <SetupMissions />}
      {state.screen === 'play' && <PlayMissions />}
      {state.screen === 'rules' && <Rules />}
      {state.screen === 'status-effects' && <StatusEffects />}
      {state.screen === 'trackers' && <Trackers />}
      {state.screen === 'perks' && <Perks />}
    </div>
  )
}

export default App
