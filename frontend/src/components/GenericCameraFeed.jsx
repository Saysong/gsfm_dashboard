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

      const blob = new Blob([bytes], { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (err) {
      console.error('Failed to render camera image:', err);
    }
  }, [base64Data]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          borderRadius: '6px',
          backgroundColor: '#000',
        }}
      />
    </div>
  );
};

export default GenericCameraFeed;
