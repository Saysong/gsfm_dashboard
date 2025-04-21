import React, { useState } from 'react';
import LiveFeedPanel from './LiveFeedPanel';
import CameraViewPanel from './CameraViewPanel';

function CameraSystem() {
  const [viewMode, setViewMode] = useState('All'); // "All" or "Single"
  const [activeCamera, setActiveCamera] = useState('Vision');

  return (
    <>
      <div style={{ gridArea: 'livefeed' }}>
        <LiveFeedPanel
          viewMode={viewMode}
          setViewMode={setViewMode}
          activeCamera={activeCamera}
          setActiveCamera={setActiveCamera}
        />
      </div>
      <div style={{ gridArea: 'camera' }}>
        <CameraViewPanel
          activeCamera={activeCamera}
          setActiveCamera={setActiveCamera}
          setViewMode={setViewMode}
        />
      </div>
    </>
  );
}

export default CameraSystem;