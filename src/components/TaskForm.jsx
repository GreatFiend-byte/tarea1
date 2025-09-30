import { useState } from 'react'
import './TaskForm.css'

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        priority,
        completed: false
      })
      
      setTitle('')
      setPriority('medium')
      setIsExpanded(false)
    }
  }

  const handleQuickAdd = (quickTask) => {
    onAddTask({
      title: quickTask,
      priority: 'medium',
      completed: false
    })
  }

  const quickTasks = [
    'Reunión diaria',
    'Revisar emails',
    'Planificar semana',
    'Estudiar React',
    'Hacer ejercicio'
  ]

  return (
    <div className="task-form">
      <div className="form-header">
        <h3>Agregar Nueva Tarea</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="expand-btn"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="form-content">
          <div className="input-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué necesitas hacer?"
              className="task-input"
              autoFocus
            />
            
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">🔵 Prioridad Baja</option>
              <option value="medium">🟡 Prioridad Media</option>
              <option value="high">🔴 Prioridad Alta</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="add-btn"
            disabled={!title.trim()}
          >
            ➕ Agregar Tarea
          </button>
        </form>
      )}

      <div className="quick-tasks">
        <p className="quick-tasks-label">Tareas rápidas:</p>
        <div className="quick-buttons">
          {quickTasks.map((task, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickAdd(task)}
              className="quick-btn"
            >
              {task}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskForm