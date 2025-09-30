import { useState, useEffect } from 'react'
import './DeviceInfo.css'

const DeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({})

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        orientation: window.screen.orientation?.type || 'unknown',
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt
        } : null,
        memory: navigator.deviceMemory || 'unknown',
        cores: navigator.hardwareConcurrency || 'unknown'
      })
    }

    updateDeviceInfo()

    // Actualizar cuando cambie la orientación
    window.addEventListener('resize', updateDeviceInfo)
    window.screen.orientation?.addEventListener('change', updateDeviceInfo)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.screen.orientation?.removeEventListener('change', updateDeviceInfo)
    }
  }, [])

  return (
    <div className="device-info">
      <h3>📱 Información del Dispositivo</h3>
      <div className="info-grid">
        <div className="info-item">
          <strong>Plataforma:</strong>
          <span>{deviceInfo.platform}</span>
        </div>
        <div className="info-item">
          <strong>Idioma:</strong>
          <span>{deviceInfo.language}</span>
        </div>
        <div className="info-item">
          <strong>Pantalla:</strong>
          <span>{deviceInfo.screenWidth} x {deviceInfo.screenHeight}</span>
        </div>
        <div className="info-item">
          <strong>Orientación:</strong>
          <span>{deviceInfo.orientation}</span>
        </div>
        {deviceInfo.connection && (
          <>
            <div className="info-item">
              <strong>Conexión:</strong>
              <span>{deviceInfo.connection.effectiveType}</span>
            </div>
            <div className="info-item">
              <strong>Velocidad:</strong>
              <span>{deviceInfo.connection.downlink} Mbps</span>
            </div>
          </>
        )}
        <div className="info-item">
          <strong>Memoria:</strong>
          <span>{deviceInfo.memory} GB</span>
        </div>
        <div className="info-item">
          <strong>Núcleos CPU:</strong>
          <span>{deviceInfo.cores}</span>
        </div>
      </div>
    </div>
  )
}

export default DeviceInfo