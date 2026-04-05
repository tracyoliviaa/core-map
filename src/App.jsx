import { AppProvider } from './Context/AppContext'
import { Dashboard } from './components/Dashboard'

export default function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  )
}