import { useState } from 'react'
import './TaskList.css'

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleEdit = (task) => {
    setEditingId(task.id)
    setEditText(task.title)
  }

  const handleSave = (taskId) => {
    if (editText.trim()) {
      onUpdateTask(taskId, { title: editText.trim() })
    }
    setEditingId(null)
    setEditText('')
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditText('')
  }

  const handleToggleComplete = (taskId, completed) => {
    onUpdateTask(taskId, { completed: !completed })
  }

  const handlePriorityChange = (taskId, priority) => {
    onUpdateTask(taskId, { priority })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff6b6b'
      case 'medium': return '#ffd93d'
      case 'low': return '#6bcf7f'
      default: return '#e0e0e0'
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="task-list">
      <h3>Mis Tareas ({tasks.length})</h3>
      
      {sortedTasks.length === 0 ? (
        <div className="empty-state">
          <p>🎉 No hay tareas pendientes</p>
          <small>Agrega una nueva tarea para comenzar</small>
        </div>
      ) : (
        <div className="tasks-container">
          {sortedTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-item ${task.completed ? 'completed' : ''} ${!task.synced ? 'unsynced' : ''}`}
            >
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id, task.completed)}
                  className="checkbox"
                />
              </div>

              <div className="task-content">
                {editingId === task.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="edit-input"
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button 
                        onClick={() => handleSave(task.id)}
                        className="save-btn"
                      >
                        ✓
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="cancel-btn"
                      >
                        ✗
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="task-title">{task.title}</span>
                    <div className="task-meta">
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      >
                        {task.priority}
                      </span>
                      <span className="task-date">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="task-actions">
                {!task.completed && editingId !== task.id && (
                  <>
                    <button 
                      onClick={() => handleEdit(task)}
                      className="action-btn edit"
                      title="Editar tarea"
                    >
                      ✏️
                    </button>
                    
                    <select
                      value={task.priority}
                      onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                      className="priority-select"
                    >
                      <option value="low">🔵 Baja</option>
                      <option value="medium">🟡 Media</option>
                      <option value="high">🔴 Alta</option>
                    </select>
                  </>
                )}
                
                <button 
                  onClick={() => onDeleteTask(task.id)}
                  className="action-btn delete"
                  title="Eliminar tarea"
                >
                  🗑️
                </button>

                {!task.synced && (
                  <span className="sync-indicator" title="Pendiente de sincronizar">
                    ⚡
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList