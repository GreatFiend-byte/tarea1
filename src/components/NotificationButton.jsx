import { useState } from 'react'
import './NotificationButton.css'

const NotificationButton = () => {
  const [permission, setPermission] = useState(Notification.permission)

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('Este navegador no soporta notificaciones')
      return
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      
      if (result === 'granted') {
        showWelcomeNotification()
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error)
    }
  }

  const showWelcomeNotification = () => {
    new Notification('¡Bienvenido a TaskManager!', {
      body: 'Tu aplicación de gestión de tareas está lista para usar.',
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png'
    })
  }

  const showCustomNotification = () => {
    if (permission !== 'granted') {
      alert('Por favor permite las notificaciones primero')
      return
    }

    new Notification('Recordatorio de Tareas', {
      body: 'Tienes tareas pendientes por completar. ¡Mantente productivo!',
      icon: '/pwa-192x192.png',
      tag: 'task-reminder'
    })
  }

  return (
    <div className="notification-buttons">
      {permission !== 'granted' ? (
        <button 
          className="notification-btn request"
          onClick={requestNotificationPermission}
        >
          🔔 Permitir Notificaciones
        </button>
      ) : (
        <button 
          className="notification-btn send"
          onClick={showCustomNotification}
        >
          📨 Enviar Recordatorio
        </button>
      )}
    </div>
  )
}

export default NotificationButton