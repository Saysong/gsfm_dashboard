// src/handlers/gasHandler.js

export function parseGas(msg) {
    try {
      const parsed = JSON.parse(msg.data);
  
      return {
        gas: parsed.gas || {
          voc: null,
          co2: null,
        },
        alert: parsed.alert || null,
      };
    } catch (err) {
      console.warn('Failed to parse /serial_data:', err);
      return {
        gas: {
          voc: null,
          co2: null,
        },
        alert: null,
      };
    }
  }
  