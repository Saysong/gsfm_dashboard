import React, { useEffect, useState } from 'react';
import NotificationBubble from './NotificationBubble';

function AlertsPanel({ alerts, setAlerts }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(interval);
  }, []);

  const dismissAlert = (index) => {
    setAlerts((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ color: 'white', height: '100%', overflowY: 'auto', paddingRight: '0.5em' }}>
      <h2>Alerts</h2>
      {alerts.length === 0 ? (
        <p>No active alerts</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
          {alerts.map((alert, index) => (
            <NotificationBubble
              key={index}
              message={alert.message}
              timestamp={alert.timestamp}
              onDismiss={() => dismissAlert(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AlertsPanel;
