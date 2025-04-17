import React from 'react';

function IMUCard({ imu }) {
  if (!imu) return <p>No IMU data</p>;

  return (
    <div>
      <h2>IMU Data</h2>
      <p>X: {imu.x?.toFixed(3)}</p>
      <p>Y: {imu.y?.toFixed(3)}</p>
      <p>Z: {imu.z?.toFixed(3)}</p>
    </div>
  );
}

export default IMUCard;