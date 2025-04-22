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

      // Decode base64-encoded string into binary
      const binary = atob(data);
      const rgb = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        rgb[i] = binary.charCodeAt(i);
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      const rgba = imageData.data;

      for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
        rgba[j] = rgb[i];
        rgba[j + 1] = rgb[i + 1];
        rgba[j + 2] = rgb[i + 2];
        rgba[j + 3] = 255;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.putImageData(imageData, 0, 0);
    } catch (err) {
      console.error('[ThermalCameraFeed] Render error:', err);
    }
  }, [message]);

  if (!message || !message.width || !message.height) {
    return <p style={{ color: 'white' }}>Waiting for thermal image...</p>;
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '6px',
          backgroundColor: '#000',
          display: 'block',
        }}
      />
    </div>
  );
};

export default ThermalCameraFeed;
