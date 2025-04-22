// src/handlers/gasHandler.js

export function parseGas(msg) {
  try {
    const raw = msg.data;
    const parts = raw.split(',');

    let voc = null;
    let co2 = null;
    const whiskers = {};

    parts.forEach((entry) => {
      const [key, value] = entry.split(':');
      if (!key || !value) return;

      if (key === 'VOCval') voc = parseFloat(value);
      else if (key === 'CO2PPM') co2 = parseFloat(value);
      else if (key.startsWith('W')) whiskers[key] = parseInt(value);
    });

    return {
      gas: {
        voc,
        co2,
        whiskers, // optional — you can choose to use/display this
      },
      alert: null, // no alert parsing in this format
    };
  } catch (err) {
    console.warn('Failed to parse /serial_data:', err);
    return {
      gas: {
        voc: null,
        co2: null,
        whiskers: {},
      },
      alert: null,
    };
  }
}
