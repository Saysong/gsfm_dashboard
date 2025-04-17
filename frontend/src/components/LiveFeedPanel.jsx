import React from 'react';

function LiveFeedPanel({ viewMode, setViewMode, activeCamera, setActiveCamera }) {
  const cameras = ['Vision', 'Thermal', 'Depth'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2>Live Feed</h2>

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
              {cam}
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
    {['Vision', 'Thermal', 'Depth'].map((cam) => (
      <div
        key={cam}
        style={{
          backgroundColor: '#333',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>{cam} Feed</p>
      </div>
    ))}

    {/* empty cell to keep 2x2 grid shape */}
    <div style={{ backgroundColor: 'transparent' }} />
  </div>
) : (
  <div
    style={{
      flexGrow: 1,
      backgroundColor: '#333',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <p>{activeCamera} Feed (enlarged)</p>
  </div>
)}
    </div>
  );
}

export default LiveFeedPanel;