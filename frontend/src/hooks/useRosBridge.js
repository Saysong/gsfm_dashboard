// src/hooks/useRosBridge.js

import { useEffect, useState } from 'react';
import ROSLIB from 'roslib';

export function useRosBridge(url = 'ws://localhost:9090') {
  const [ros, setRos] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const rosConnection = new ROSLIB.Ros({ url });

    rosConnection.on('connection', () => {
      console.log('[rosbridge] Connected');
      setConnected(true);
    });

    rosConnection.on('error', (err) => {
      console.error('[rosbridge] Error:', err);
    });

    rosConnection.on('close', () => {
      console.warn('[rosbridge] Disconnected');
      setConnected(false);
    });

    setRos(rosConnection);

    return () => {
      rosConnection.close();
    };
  }, [url]);

  return { ros, connected };
}
