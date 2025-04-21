import React from 'react';

function AlertsPanel({ alert }) {
  return (
    <div>
      <h2>Alerts</h2>
      {alert ? (
        <p style={{ color: 'red', fontWeight: 'bold' }}>{alert}</p>
      ) : (
        <p>No active alerts</p>
      )}
    </div>
  );
}

export default AlertsPanel;