import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Splash.css'

const Splash = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="logo">
          <h1>📝 TaskManager</h1>
        </div>
        <div className="loading-spinner"></div>
        <p>Cargando tu gestor de tareas...</p>
      </div>
    </div>
  )
}

export default Splash