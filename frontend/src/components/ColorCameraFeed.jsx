import React, { useEffect, useRef } from 'react';

const ColorCameraFeed = ({ message }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!message || !message.data || !canvasRef.current) return;

    try {
      const binary = atob(message.data); // base64 to binary
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: 'image/jpeg' }); // or 'image/png'
      const url = URL.createObjectURL(blob);

      const img = new Image();
      img.onload = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    } catch (err) {
      console.error("Failed to render camera image:", err);
    }
  }, [message]);

  return (
    <div>
      <h4>🎨 Color Camera</h4>
      <canvas ref={canvasRef} width={640} height={480} style={{ border: '1px solid white' }} />
    </div>
  );
};

export default ColorCameraFeed;
