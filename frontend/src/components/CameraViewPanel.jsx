// src/components/CameraViewPanel.jsx

import React from 'react';

const cameraLabels = {
  Vision: 'Color Camera',
  Depth: 'Depth Camera',
  USB: 'USB Camera',
  Thermal: 'Thermal Camera',
};

function CameraViewPanel({ activeCamera, setActiveCamera, setViewMode }) {
  const cameras = ['Vision', 'Depth', 'USB', 'Thermal'];
  const secondary = cameras.filter((c) => c !== activeCamera);

  return (
    <div style={{ padding: '1em' }}>
      <h3 style={{ color: 'white' }}>Other Camera Views</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        {secondary.map((cam) => (
          <div
            key={cam}
            onClick={() => {
              setActiveCamera(cam);
              setViewMode('Single');
            }}
            style={{
              height: '100px',
              backgroundColor: '#222',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '1px solid #555',
            }}
          >
            <p style={{ color: 'white', fontSize: '0.9em' }}>{cameraLabels[cam]} Feed</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CameraViewPanel;
