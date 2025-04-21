// src/handlers/cameraHandler.js

export function parseCompressedImage(msg) {
    if (!msg || !msg.data) {
      console.warn('Invalid camera message:', msg);
      return '';
    }
  
    return msg.data;
  }
  