import { useStore } from './store'
import Hub from './components/Hub'
import Adventures from './components/Adventures'
import PvP from './components/PvP'
import Rules from './components/Rules'
import StatusEffects from './components/StatusEffects'
import MissionsDashboard from './components/MissionsDashboard'
import './App.css'

function App() {
  const currentView = useStore((state) => state.currentView)

  return (
    <div className="app-container">
      {currentView === 'hub' && <Hub />}
      {currentView === 'adventures' && <Adventures />}
      {currentView === 'pvp' && <PvP />}
      {currentView === 'missions' && <MissionsDashboard />}
      {currentView === 'rules' && <Rules />}
      {currentView === 'status-effects' && <StatusEffects />}
    </div>
  )
}

export default App