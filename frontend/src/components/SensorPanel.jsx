import React from 'react';
import SensorCard from './SensorCard';
import WhiskerMap from './WhiskerMap';

function SensorPanel({ gas, imu, connected }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        maxHeight: '100%',
        paddingRight: '0.5em',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1em',
          alignItems: 'stretch',
        }}
      >
        {/* Whisker Map replaces Temperature Card */}
        {gas && gas.whiskers && (
          <div style={{ flex: '1 1 100%' }}>
            <WhiskerMap whiskers={gas.whiskers} />
          </div>
        )}

        {/* Gas Sensor Cards */}
        {gas && (
          <>
            {/* <SensorCard label="Temperature" value={gas.temp?.toFixed(1)} unit="°C" /> */}
            <SensorCard label="VOC" value={gas.voc?.toFixed(0)} unit="ppb" />
            <SensorCard label="CO₂" value={gas.co2?.toFixed(0)} unit="ppm" />
          </>
        )}

        {/* IMU Sensor Cards */}
        {imu && (
          <>
            <SensorCard label="Accel X" value={imu.x?.toFixed(2)} unit="m/s²" />
            <SensorCard label="Accel Y" value={imu.y?.toFixed(2)} unit="m/s²" />
            <SensorCard label="Accel Z" value={imu.z?.toFixed(2)} unit="m/s²" />
          </>
        )}

        {/* Connection Status */}
        <SensorCard label="WebSocket" value={connected ? '🟢' : '🔴'} unit="" />
      </div>
    </div>
  );
}

export default SensorPanel;
