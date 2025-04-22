import { useEffect, useState } from 'react';
import { useRosBridge } from './hooks/useRosBridge';
import { CAMERA_TOPICS, IMU_TOPIC, GAS_TOPIC, THERMAL_TOPIC } from './constants/rosTopics';

import DashboardGrid from './components/DashboardGrid';
import CameraSystem from './components/CameraSystem';
import MapPanel from './components/MapPanel';
import AlertsPanel from './components/AlertsPanel';
import SensorPanel from './components/SensorPanel';

import { parseIMU } from './handlers/imuHandler';
import { parseGas } from './handlers/gasHandler';
import { parseCompressedImage } from './handlers/cameraHandler';

import ROSLIB from 'roslib';

function App() {
  const { ros, connected } = useRosBridge('ws://10.91.19.146:9090'); // or your IP

  const [imuData, setImuData] = useState(null);
  const [gasData, setGasData] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const [cameraFeeds, setCameraFeeds] = useState({
    Vision: '',
    Depth: '',
    USB: '',
    Thermal: '',
  });

  useEffect(() => {
    if (!ros) return;

    // IMU
    const imuSub = new ROSLIB.Topic({
      ros,
      name: IMU_TOPIC,
      messageType: 'sensor_msgs/Imu',
    });
    imuSub.subscribe((msg) => {
      const parsed = parseIMU(msg);
      if (parsed) setImuData(parsed);
    });

    // Gas + Alert
    const gasSub = new ROSLIB.Topic({
      ros,
      name: GAS_TOPIC,
      messageType: 'std_msgs/String',
    });
    gasSub.subscribe((msg) => {
      const parsed = parseGas(msg);
      if (parsed) {
        setGasData(parsed.gas);

        if (parsed.alert) {
          const timestamp = Date.now();

          const newAlerts = Array.isArray(parsed.alert)
            ? parsed.alert
                .filter((msg) => typeof msg === 'string' && msg.trim().length > 0)
                .map((msg) => ({ message: msg, timestamp }))
            : typeof parsed.alert === 'string'
            ? [{ message: parsed.alert, timestamp }]
            : [];

          if (newAlerts.length > 0) {
            setAlerts((prev) => [...prev, ...newAlerts]);
          }
        }
      }
    });

    // Camera feeds (compressed)
    const cameraSubscribers = Object.entries(CAMERA_TOPICS).map(([label, topicName]) => {
      const sub = new ROSLIB.Topic({
        ros,
        name: topicName,
        messageType: 'sensor_msgs/CompressedImage',
      });

      sub.subscribe((msg) => {
        setCameraFeeds((prev) => ({
          ...prev,
          [label]: parseCompressedImage(msg),
        }));
      });

      return sub;
    });

    // Thermal feed
    const thermalSub = new ROSLIB.Topic({
      ros,
      name: THERMAL_TOPIC,
      messageType: 'sensor_msgs/Image',
    });

    thermalSub.subscribe((msg) => {
      setCameraFeeds((prev) => ({
        ...prev,
        Thermal: msg,
      }));
    });

    // Cleanup
    return () => {
      imuSub.unsubscribe();
      gasSub.unsubscribe();
      cameraSubscribers.forEach((sub) => sub.unsubscribe());
      thermalSub.unsubscribe();
    };
  }, [ros]);

  return (
    <div
      style={{
        backgroundColor: '#111',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <DashboardGrid>
        <div style={{ gridArea: 'map' }}>
          <MapPanel />
        </div>

        <CameraSystem cameraFeeds={cameraFeeds} />

        <div style={{ gridArea: 'alerts' }}>
          <AlertsPanel alerts={alerts} setAlerts={setAlerts} />
        </div>

        <div style={{ gridArea: 'sensorblock' }}>
          <SensorPanel imu={imuData} gas={gasData} connected={connected} />
        </div>
      </DashboardGrid>
    </div>
  );
}

export default App;
