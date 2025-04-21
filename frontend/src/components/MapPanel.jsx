import React from 'react';

function MapPanel() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ marginBottom: '0.5em' }}>SLAM Map</h2>
      <div
        style={{
          flexGrow: 1,
          backgroundColor: '#333',
          borderRadius: '10px',
          border: '1px solid #555',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#bbb',
        }}
      >
        <p>Map display area (e.g. RViz, canvas, image stream)</p>
      </div>
    </div>
  );
}

export default MapPanel;