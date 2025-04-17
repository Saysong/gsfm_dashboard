import React from 'react';

function CameraViewPanel({ activeCamera, setActiveCamera, setViewMode }) {
  const cameras = ['Vision', 'Thermal', 'Depth'];
  const secondary = cameras.filter((c) => c !== activeCamera);

  return (
    <div>
      <h2>Other Camera Views</h2>
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
              backgroundColor: '#333',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: '1px solid #555',
            }}
          >
            <p style={{ color: 'white', fontSize: '0.9em' }}>{cam} Feed</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CameraViewPanel;