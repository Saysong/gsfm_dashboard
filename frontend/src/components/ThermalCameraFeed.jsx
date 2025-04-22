// src/components/ThermalCameraFeed.jsx

import React, { useEffect, useRef } from 'react';

const ThermalCameraFeed = ({ message }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!message || !canvasRef.current) {
      console.warn('[ThermalCameraFeed] Waiting for message or canvas ref');
      return;
    }

    const { width, height, data, encoding } = message;

    console.log('[ThermalCameraFeed] received message:', message);

    if (encoding !== 'rgb8') {
      console.warn('[ThermalCameraFeed] Unsupported encoding:', encoding);
      return;
    }

    // Decode base64 string to raw bytes
    const binary = atob(data); // base64 -> ASCII
    const rgb = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      rgb[i] = binary.charCodeAt(i);
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      console.error('[ThermalCameraFeed] Canvas context not available');
      return;
    }

    const imageData = ctx.createImageData(width, height);
    const rgba = imageData.data;

    for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
      rgba[j] = rgb[i];         // R
      rgba[j + 1] = rgb[i + 1]; // G
      rgba[j + 2] = rgb[i + 2]; // B
      rgba[j + 3] = 255;        // A
    }

    ctx.putImageData(imageData, 0, 0);
  }, [message]);

  if (!message || !message.data || !message.width || !message.height) {
    return <p style={{ color: 'white' }}>Waiting for thermal image...</p>;
  }

  return (
    <div>
      <h4 style={{ color: 'white' }}>Thermal Camera</h4>
      <canvas
        ref={canvasRef}
        width={message.width}
        height={message.height}
        style={{
          width: '320px',
          height: '240px',
          border: '2px solid red',
          backgroundColor: '#000',
        }}
      />
    </div>
  );
};

export default ThermalCameraFeed;
