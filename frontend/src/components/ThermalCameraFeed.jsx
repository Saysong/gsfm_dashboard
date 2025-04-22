// src/components/ThermalCameraFeed.jsx

import React, { useEffect, useRef } from 'react';

const ThermalCameraFeed = ({ message }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!message || !canvasRef.current) return;

    try {
      const { width, height, data, encoding } = message;

      if (encoding !== 'rgb8') {
        console.warn('[ThermalCameraFeed] Unsupported encoding:', encoding);
        return;
      }

      const rgb = new Uint8Array(data); // Already a binary Uint8Array
      const ctx = canvasRef.current.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      const rgba = imageData.data;

      for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
        rgba[j] = rgb[i];         // R
        rgba[j + 1] = rgb[i + 1]; // G
        rgba[j + 2] = rgb[i + 2]; // B
        rgba[j + 3] = 255;        // A (fully opaque)
      }

      ctx.putImageData(imageData, 0, 0);
    } catch (err) {
      console.error('[Thermal Render Error]', err);
    }
  }, [message]);

  return (
    <div>
      <h4>Thermal Camera</h4>
      <canvas
        ref={canvasRef}
        width={160}
        height={120}
        style={{
          border: '1px solid #888',
          backgroundColor: '#000',
        }}
      />
    </div>
  );
};

export default ThermalCameraFeed;
