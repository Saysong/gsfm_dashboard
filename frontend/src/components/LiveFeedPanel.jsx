// src/components/LiveFeedPanel.jsx

import React from 'react';
import GenericCameraFeed from './GenericCameraFeed';

const cameraLabels = {
  Vision: 'Color Camera',
  Depth: 'Depth Camera',
  USB: 'USB Camera',
  Thermal: 'Thermal Camera',
};

function LiveFeedPanel({ viewMode, setViewMode, activeCamera, setActiveCamera, cameraFeeds }) {
  const cameras = ['Vision', 'Depth', 'USB', 'Thermal'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ color: 'white' }}>Live Feed</h2>

      {/* View Mode Toggle */}
      <div style={{ marginBottom: '1em' }}>
        {['All', 'Single'].map((mode) => (
          <button
            key={mode}
            style={{
              marginRight: '0.5em',
              padding: '0.4em 0.8em',
              backgroundColor: viewMode === mode ? '#444' : '#222',
              color: 'white',
              border: '1px solid #666',
              cursor: 'pointer',
            }}
            onClick={() => setViewMode(mode)}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Camera Selector (when in Single view) */}
      {viewMode === 'Single' && (
        <div style={{ marginBottom: '1em' }}>
          {cameras.map((cam) => (
            <button
              key={cam}
              style={{
                marginRight: '0.5em',
                padding: '0.4em 0.8em',
                backgroundColor: activeCamera === cam ? '#555' : '#222',
                color: 'white',
                border: '1px solid #666',
                cursor: 'pointer',
              }}
              onClick={() => setActiveCamera(cam)}
            >
              {cameraLabels[cam]}
            </button>
          ))}
        </div>
      )}

      {/* Camera Feeds */}
      {viewMode === 'All' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '1em',
            flexGrow: 1,
          }}
        >
          {cameras.map((cam) => (
            <div key={cam} style={{ backgroundColor: '#111', borderRadius: '6px' }}>
              <GenericCameraFeed title={cameraLabels[cam]} base64Data={cameraFeeds[cam]} />
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            flexGrow: 1,
            backgroundColor: '#111',
            borderRadius: '6px',
            padding: '1em',
          }}
        >
          <GenericCameraFeed title={cameraLabels[activeCamera]} base64Data={cameraFeeds[activeCamera]} />
        </div>
      )}
    </div>
  );
}

export default LiveFeedPanel;
