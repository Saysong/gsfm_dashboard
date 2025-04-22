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
    <div style={{ color: 'white' }}>
      <h2>Alerts</h2>
      {alerts.length === 0 ? (
        <p>No active alerts</p>
      ) : (
        alerts.map((alert, index) => (
          <NotificationBubble
            key={index}
            message={alert.message}
            timestamp={alert.timestamp}
            onDismiss={() => dismissAlert(index)}
          />
        ))
      )}
    </div>
  );
}

export default AlertsPanel;
