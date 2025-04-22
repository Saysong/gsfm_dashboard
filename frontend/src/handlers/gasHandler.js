let lastWhiskerAlert = 0;
let lastVocAlert = 0;
let lastCo2Alert = 0;

const ALERT_DEBOUNCE_MS = 30000;

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

    const leftHit = ['W0', 'W1', 'W2', 'W3'].some((w) => whiskers[w] < 4095);
    const rightHit = ['W4', 'W5', 'W6', 'W7'].some((w) => whiskers[w] < 4095);

    if ((leftHit || rightHit) && now - lastWhiskerAlert > ALERT_DEBOUNCE_MS) {
      if (leftHit && rightHit) alerts.push('🟥 Alert 1: Both whiskers triggered – potential impact on both sides');
      else if (leftHit) alerts.push('🟥 Alert 1: Left whisker triggered – obstacle on left side');
      else if (rightHit) alerts.push('🟥 Alert 1: Right whisker triggered – obstacle on right side');
      lastWhiskerAlert = now;
    }

    if (voc !== null && voc > 1000 && now - lastVocAlert > ALERT_DEBOUNCE_MS) {
      alerts.push('🟨 Alert 2: VOC level critical (>1000 ppb) – poor air quality, off-gassing, chemicals [ℹ️]');
      lastVocAlert = now;
    } else if (voc !== null && voc > 660 && now - lastVocAlert > ALERT_DEBOUNCE_MS) {
      alerts.push('🟨 Alert 2: VOC level elevated (>660 ppb) – mild pollution or odor sources [ℹ️]');
      lastVocAlert = now;
    }

    if (co2 !== null && co2 > 1000 && now - lastCo2Alert > ALERT_DEBOUNCE_MS) {
      alerts.push('🟦 Alert 3: CO₂ above 1000 ppm – ventilation may be insufficient [ℹ️]');
      lastCo2Alert = now;
    }

    return {
      gas: {
        voc,
        co2,
        whiskers,
      },
      alert: alerts.length ? alerts : null,
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
