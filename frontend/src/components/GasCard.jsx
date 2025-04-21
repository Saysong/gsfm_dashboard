import React from 'react';

function GasCard({ gas }) {
  if (!gas) return <p>No gas data available</p>;

  return (
    <div>
      <h2>Gas Sensor</h2>
      <p>Temperature: {gas.temp?.toFixed(1)} °C</p>
      <p>VOC: {gas.voc?.toFixed(1)} ppb</p>
      <p>CO₂: {gas.co2?.toFixed(1)} ppm</p>
    </div>
  );
}

export default GasCard;