import React from 'react';
import GenericCameraFeed from './GenericCameraFeed';
import ThermalCameraFeed from './ThermalCameraFeed';
import RawCameraFeed from './RawCameraFeed';

const cameraLabels = {
  Vision: 'Color Camera',
  Depth: 'Depth Camera',
  USB: 'USB Camera',
  Thermal: 'Thermal Camera',
};

function LiveFeedPanel({ viewMode, setViewMode, activeCamera, setActiveCamera, cameraFeeds }) {
  const cameras = ['Vision', 'Depth', 'USB', 'Thermal'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* View Mode Toggle */}
      <div style={{ marginBottom: '0.8em', paddingLeft: '0.5em' }}>
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

      {/* All Mode: 2x2 Grid with Scroll */}
      {viewMode === 'All' ? (
        <div
          style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '0 0.5em 0.5em',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5em',
            }}
          >
            {cameras.map((cam) => (
              <div
                key={cam}
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3',
                  backgroundColor: '#111',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {cam === 'Thermal' ? (
                  <ThermalCameraFeed message={cameraFeeds.Thermal} />
                ) : cam === 'USB' ? (
                  <RawCameraFeed title={cameraLabels[cam]} message={cameraFeeds.USB} />
                ) : (
                  <GenericCameraFeed title={cameraLabels[cam]} base64Data={cameraFeeds[cam]} />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Single Mode: Full-size centered feed
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5em',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {activeCamera === 'Thermal' ? (
            <ThermalCameraFeed message={cameraFeeds.Thermal} />
          ) : activeCamera === 'USB' ? (
            <RawCameraFeed title={cameraLabels.USB} message={cameraFeeds.USB} />
          ) : (
            <GenericCameraFeed title={cameraLabels[activeCamera]} base64Data={cameraFeeds[activeCamera]} />
          )}
        </div>
      )}
    </div>
  );
}

export default LiveFeedPanel;
