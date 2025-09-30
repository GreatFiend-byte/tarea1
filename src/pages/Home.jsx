import { useState, useEffect } from 'react'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import DeviceInfo from '../components/DeviceInfo'
import NotificationButton from '../components/NotificationButton'
import { useTaskManager } from '../hooks/useTaskManager'
import './Home.css'

const Home = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    syncTasks,
    isOnline,
    syncStatus
  } = useTaskManager()

  const [showDeviceInfo, setShowDeviceInfo] = useState(false)

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>📝 Mi Gestor de Tareas</h1>
        <div className="status-indicator">
          <span className={`status ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '🟢 En línea' : '🔴 Sin conexión'}
          </span>
          <span className="sync-status">{syncStatus}</span>
        </div>
      </header>

      <main className="home-main">
        <div className="controls">
          <NotificationButton />
          <button 
            className="device-info-btn"
            onClick={() => setShowDeviceInfo(!showDeviceInfo)}
          >
            📱 Info del Dispositivo
          </button>
          {isOnline && (
            <button className="sync-btn" onClick={syncTasks}>
              🔄 Sincronizar
            </button>
          )}
        </div>

        {showDeviceInfo && <DeviceInfo />}

        <section className="task-section">
          <TaskForm onAddTask={addTask} />
          <TaskList 
            tasks={tasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </section>
      </main>
    </div>
  )
}

export default Home