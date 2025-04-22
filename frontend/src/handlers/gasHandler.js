// src/handlers/gasHandler.js

let lastWhiskerAlert = 0;
let lastVocAlert = 0;
let lastCo2Alert = 0;

const ALERT_DEBOUNCE_MS = 30 * 1000; // 30 seconds

export function parseGas(msg) {
  try {
    const raw = msg.data;
    const parts = raw.split(',');

    let voc = null;
    let co2 = null;
    const whiskers = {};
    const alerts = [];
    const now = Date.now();

    parts.forEach((entry) => {
      const [key, value] = entry.split(':');
      if (!key || !value) return;

      if (key === 'VOCval') voc = parseFloat(value);
      else if (key === 'CO2PPM') co2 = parseFloat(value);
      else if (key.startsWith('W')) whiskers[key] = parseInt(value);
    });

    // Alert 1: Whisker triggered
    const whiskerHit = Object.values(whiskers).some((val) => val < 4095);
    if (whiskerHit && now - lastWhiskerAlert > ALERT_DEBOUNCE_MS) {
      alerts.push('Alert 1: Whisker sensor triggered');
      lastWhiskerAlert = now;
    }

    // Alert 2: High VOC
    if (voc !== null && voc > 1000 && now - lastVocAlert > ALERT_DEBOUNCE_MS) {
      alerts.push('Alert 2: VOC level high');
      lastVocAlert = now;
    }

    // Alert 3: High CO₂
    if (co2 !== null && co2 > 1000 && now - lastCo2Alert > ALERT_DEBOUNCE_MS) {
      alerts.push('Alert 3: CO₂ level high');
      lastCo2Alert = now;
    }

    return {
      gas: {
        voc,
        co2,
        whiskers,
      },
      alert: alerts.length > 0 ? alerts : null,
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
