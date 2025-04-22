import React, { useEffect, useRef } from 'react';

const RawCameraFeed = ({ title, message }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!message || !canvasRef.current) return;

    try {
      const { width, height, data, encoding } = message;

      if (encoding !== 'rgb8') {
        console.warn(`[RawCameraFeed] Unsupported encoding: ${encoding}`);
        return;
      }

      // decode base64
      const binary = atob(data);
      const rgb = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        rgb[i] = binary.charCodeAt(i);
      }

      const ctx = canvasRef.current.getContext('2d');
      const imageData = ctx.createImageData(width, height);
      const rgba = imageData.data;

      for (let i = 0, j = 0; i < rgb.length; i += 3, j += 4) {
        rgba[j] = rgb[i];
        rgba[j + 1] = rgb[i + 1];
        rgba[j + 2] = rgb[i + 2];
        rgba[j + 3] = 255;
      }

      canvasRef.current.width = width;
      canvasRef.current.height = height;
      ctx.putImageData(imageData, 0, 0);
    } catch (err) {
      console.error('[RawCameraFeed] Render error:', err);
    }
  }, [message]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {title && (
        <div
          style={{
            position: 'absolute',
            top: '6px',
            left: '10px',
            zIndex: 2,
            color: 'white',
            fontSize: '0.8em',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '2px 6px',
            borderRadius: '4px',
          }}
        >
          {title}
        </div>
      )}
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

export default RawCameraFeed;
