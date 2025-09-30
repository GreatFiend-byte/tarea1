const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.static('dist'))

// Ruta para Server-Side Rendering de tareas
app.get('/server-tasks', (req, res) => {
  const tasks = [
    {
      id: 'server-1',
      title: 'Tarea desde el servidor',
      completed: false,
      priority: 'high',
      synced: true,
      createdAt: new Date().toISOString()
    },
    {
      id: 'server-2',
      title: 'Otra tarea del servidor',
      completed: true,
      priority: 'medium',
      synced: true,
      createdAt: new Date().toISOString()
    }
  ]

  res.json(tasks)
})

// Servir la aplicación React para todas las demás rutas
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})