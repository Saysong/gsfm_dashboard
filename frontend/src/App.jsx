import { useEffect, useState } from 'react';
import ROSLIB from 'roslib';
import DashboardGrid from './components/DashboardGrid';
import MapPanel from './components/MapPanel';
import AlertsPanel from './components/AlertsPanel';
import SensorPanel from './components/SensorPanel';

// Helper component to show one camera feed
function CameraFeed({ title, imageSrc }) {
  return (
    <div style={{ marginBottom: '1em' }}>
      <h4>{title}</h4>
      <img src={imageSrc} alt={title} style={{ width: '100%', maxHeight: '180px', objectFit: 'contain' }} />
    </div>
  );
}

function App() {
  const [data, setData] = useState({});
  const [connected, setConnected] = useState(false);

  const [colorImage, setColorImage] = useState('');
  const [depthImage, setDepthImage] = useState('');
  const [compressedDepthImage, setCompressedDepthImage] = useState('');

  useEffect(() => {
    const ros = new ROSLIB.Ros({ url: 'ws://10.91.19.146:9090' });

    ros.on('connection', () => {
      console.log('✅ Connected to rosbridge');
      setConnected(true);
    });
    ros.on('error', (err) => console.error('❌ ROSLIB error:', err));
    ros.on('close', () => {
      console.log('🔌 Disconnected from rosbridge');
      setConnected(false);
    });

    const imuSub = new ROSLIB.Topic({
      ros,
      name: '/imu',
      messageType: 'sensor_msgs/Imu'
    });

    imuSub.subscribe((msg) => {
      setData((prev) => ({
        ...prev,
        imu: {
          x: msg.linear_acceleration.x,
          y: msg.linear_acceleration.y,
          z: msg.linear_acceleration.z
        }
      }));
    });

    const gasSub = new ROSLIB.Topic({
      ros,
      name: '/serial_data', // Adjust if gas/alert is split differently
      messageType: 'std_msgs/String'
    });

    gasSub.subscribe((msg) => {
      try {
        const parsed = JSON.parse(msg.data);
        setData((prev) => ({ ...prev, gas: parsed.gas, alert: parsed.alert }));
      } catch (e) {
        console.warn('Failed to parse /serial_data');
      }
    });

    // Compressed camera image topics
    const colorCam = new ROSLIB.Topic({
      ros,
      name: '/camera/color/image_raw/compressed',
      messageType: 'sensor_msgs/CompressedImage'
    });
    colorCam.subscribe((msg) => {
      setColorImage(`data:image/jpeg;base64,${msg.data}`);
    });

    const depthCam = new ROSLIB.Topic({
      ros,
      name: '/camera/depth/image_raw/compressed',
      messageType: 'sensor_msgs/CompressedImage'
    });
    depthCam.subscribe((msg) => {
      setDepthImage(`data:image/jpeg;base64,${msg.data}`);
    });

    const depthCompressed = new ROSLIB.Topic({
      ros,
      name: '/camera/color/image_raw/compressedDepth',
      messageType: 'sensor_msgs/CompressedImage'
    });
    depthCompressed.subscribe((msg) => {
      setCompressedDepthImage(`data:image/jpeg;base64,${msg.data}`);
    });

    return () => {
      imuSub.unsubscribe();
      gasSub.unsubscribe();
      colorCam.unsubscribe();
      depthCam.unsubscribe();
      depthCompressed.unsubscribe();
    };
  }, []);

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
        {/* Top Row */}
        <div style={{ gridArea: 'map' }}>
          <MapPanel />
        </div>

        <div style={{ gridArea: 'livefeed' }}>
          <CameraFeed title="🎨 Color Camera" imageSrc={colorImage} />
          <CameraFeed title="🌊 Depth Camera" imageSrc={depthImage} />
          <CameraFeed title="📦 Compressed Depth" imageSrc={compressedDepthImage} />
        </div>

        <div style={{ gridArea: 'camera' }}>
          {/* Can show snapshots or overlays here later */}
        </div>

        {/* Bottom Row */}
        <div style={{ gridArea: 'alerts' }}>
          <AlertsPanel alert={data.alert} />
        </div>
        <div style={{ gridArea: 'sensorblock' }}>
          <SensorPanel gas={data.gas} imu={data.imu} connected={connected} />
        </div>
      </DashboardGrid>
    </div>
  );
}

export default App;
