import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Splash from './pages/Splash'
import Home from './pages/Home'
import { useEffect } from 'react'
import { useNetworkStatus } from './hooks/useNetworkStatus'
import './App.css'

function App() {
  const { isOnline } = useNetworkStatus()

  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  return (
    <div className="App">
      <div className={`connection-banner ${!isOnline ? 'show' : ''}`}>
        ⚠️ Estás trabajando sin conexión
      </div>
      
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App