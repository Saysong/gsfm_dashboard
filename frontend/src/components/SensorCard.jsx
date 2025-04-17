import React, { useEffect, useState } from 'react';
import '../styles/SensorCard.css';

const SensorCard = ({ label, unit, value }) => {
  const [recordedData, setRecordedData] = useState([]);
  const [selected, setSelected] = useState(false);

  const numeric = parseFloat(value);

  useEffect(() => {
    if (!isNaN(numeric)) {
      setRecordedData((prev) => [...prev, numeric].slice(-30));
    }
  }, [value]);

  const resetData = (e) => {
    e.stopPropagation();
    setRecordedData([]);
  };

  const renderMiniGraph = () => {
    if (recordedData.length < 2) return null;
    const width = 120;
    const height = 40;
    const maxVal = Math.max(...recordedData);
    const minVal = Math.min(...recordedData);
    const scaleY = (val) => height - ((val - minVal) / (maxVal - minVal + 0.001)) * height;
    const points = recordedData.map((val, i) => `${(i / (recordedData.length - 1)) * width},${scaleY(val)}`).join(' ');

    return (
      <svg width={width} height={height} style={{ marginTop: '0.5em' }}>
        <polyline fill="none" stroke="#4fd1c5" strokeWidth="2" points={points} />
        {recordedData.map((val, i) => (
          <circle
            key={i}
            cx={(i / (recordedData.length - 1)) * width}
            cy={scaleY(val)}
            r="2"
            fill="#4fd1c5"
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="sensor-card" onClick={() => setSelected(!selected)}>
      <div className="sensor-label">{label}</div>
      <div className="sensor-value">
        <strong>{!isNaN(numeric) ? numeric.toFixed(2) : '—'}</strong> {unit}
      </div>
      {renderMiniGraph()}
      {selected && (
        <button
          style={{
            marginTop: '0.4em',
            fontSize: '0.7em',
            padding: '2px 6px',
            backgroundColor: '#222',
            color: '#eee',
            border: '1px solid #555',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
          onClick={resetData}
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default SensorCard;