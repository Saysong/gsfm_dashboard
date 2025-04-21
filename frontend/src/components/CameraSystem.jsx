// src/components/CameraSystem.jsx

import React, { useState } from 'react';
import LiveFeedPanel from './LiveFeedPanel';
import CameraViewPanel from './CameraViewPanel';

function CameraSystem({ cameraFeeds }) {
  const [viewMode, setViewMode] = useState('All'); // 'All' or 'Single'
  const [activeCamera, setActiveCamera] = useState('Vision');

  return (
    <>
      <div style={{ gridArea: 'livefeed' }}>
        <LiveFeedPanel
          viewMode={viewMode}
          activeCamera={activeCamera}
          setViewMode={setViewMode}
          cameraFeeds={cameraFeeds}
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
