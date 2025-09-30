const REMOTE_API_URL = 'https://jsonplaceholder.typicode.com/todos'

export const taskService = {
  // Datos locales
  async getLocalTasks() {
    try {
      const tasks = localStorage.getItem('tasks')
      return tasks ? JSON.parse(tasks) : []
    } catch (error) {
      console.error('Error reading local tasks:', error)
      return []
    }
  },

  async saveLocalTasks(tasks) {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } catch (error) {
      console.error('Error saving local tasks:', error)
    }
  },

  // Datos remotos (simulados)
  async getRemoteTasks() {
    try {
      const response = await fetch(REMOTE_API_URL)
      const remoteTasks = await response.json()
      
      return remoteTasks.slice(0, 5).map(task => ({
        id: task.id.toString(),
        title: task.title,
        completed: task.completed,
        priority: 'medium',
        synced: true,
        createdAt: new Date().toISOString()
      }))
    } catch (error) {
      console.error('Error fetching remote tasks:', error)
      return []
    }
  },

  async saveRemoteTask(task) {
    try {
      // Simulación de guardado en servidor
      await fetch(REMOTE_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          title: task.title,
          completed: task.completed,
          userId: 1
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      return true
    } catch (error) {
      console.error('Error saving remote task:', error)
      throw error
    }
  },

  async deleteRemoteTask(taskId) {
    try {
      await fetch(`${REMOTE_API_URL}/${taskId}`, {
        method: 'DELETE',
      })
      return true
    } catch (error) {
      console.error('Error deleting remote task:', error)
      throw error
    }
  }
}