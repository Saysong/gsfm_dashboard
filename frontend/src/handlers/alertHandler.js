// src/handlers/alertHandler.js

export function parseAlert(msg) {
    return msg?.data || 'Unknown alert';
  }
  