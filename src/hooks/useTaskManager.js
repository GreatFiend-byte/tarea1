import { useState, useEffect } from 'react'
import { taskService } from '../services/taskService'
import { useNetworkStatus } from './useNetworkStatus'

export const useTaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [syncStatus, setSyncStatus] = useState('')
  const { isOnline } = useNetworkStatus()

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const localTasks = await taskService.getLocalTasks()
      setTasks(localTasks)
      
      if (isOnline) {
        const remoteTasks = await taskService.getRemoteTasks()
        if (remoteTasks.length > 0) {
          setTasks(remoteTasks)
          await taskService.saveLocalTasks(remoteTasks)
        }
      }
    } catch (error) {
      console.error('Error loading tasks:', error)
    }
  }

  const addTask = async (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      synced: !isOnline
    }

    setTasks(prev => [...prev, newTask])
    await taskService.saveLocalTasks([...tasks, newTask])

    if (isOnline) {
      await syncTaskToServer(newTask)
    }
  }

  const updateTask = async (taskId, updates) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates, synced: !isOnline } : task
    )
    
    setTasks(updatedTasks)
    await taskService.saveLocalTasks(updatedTasks)

    if (isOnline) {
      const taskToUpdate = updatedTasks.find(t => t.id === taskId)
      await syncTaskToServer(taskToUpdate)
    }
  }

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
    await taskService.saveLocalTasks(updatedTasks)

    if (isOnline) {
      await taskService.deleteRemoteTask(taskId)
    }
  }

  const syncTasks = async () => {
    if (!isOnline) return

    setSyncStatus('Sincronizando...')
    
    try {
      const unsyncedTasks = tasks.filter(task => !task.synced)
      
      for (const task of unsyncedTasks) {
        await syncTaskToServer(task)
      }

      const remoteTasks = await taskService.getRemoteTasks()
      setTasks(remoteTasks)
      await taskService.saveLocalTasks(remoteTasks)
      
      setSyncStatus('Sincronizado ✓')
    } catch (error) {
      setSyncStatus('Error en sincronización')
    } finally {
      setTimeout(() => setSyncStatus(''), 3000)
    }
  }

  const syncTaskToServer = async (task) => {
    if (task.synced) return

    try {
      await taskService.saveRemoteTask(task)
      const updatedTasks = tasks.map(t =>
        t.id === task.id ? { ...t, synced: true } : t
      )
      setTasks(updatedTasks)
      await taskService.saveLocalTasks(updatedTasks)
    } catch (error) {
      console.error('Error syncing task:', error)
    }
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    syncTasks,
    isOnline,
    syncStatus
  }
}