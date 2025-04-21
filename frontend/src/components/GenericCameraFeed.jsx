// src/components/GenericCameraFeed.jsx

import React, { useEffect, useRef } from 'react';

const GenericCameraFeed = ({ title, base64Data }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!base64Data || !canvasRef.current) return;

    try {
      const binary = atob(base64Data); // decode base64 to binary
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: 'image/jpeg' }); // change to 'image/png' if needed
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (err) {
      console.error('Failed to render camera image:', err);
    }
  }, [base64Data]);

  return (
    <div>
      <h4 style={{ color: 'white', marginBottom: '0.5em' }}>{title}</h4>
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ border: '1px solid white', backgroundColor: '#000' }}
      />
    </div>
  );
};

export default GenericCameraFeed;
