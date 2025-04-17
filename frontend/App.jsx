import { useEffect, useState } from 'react';
import DashboardGrid from './components/DashboardGrid';
import MapPanel from './components/MapPanel';
import CameraSystem from './components/CameraSystem';
import AlertsPanel from './components/AlertsPanel';
import SensorPanel from './components/SensorPanel';

function App() {
  const [data, setData] = useState({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://10.91.19.146:9090"); // 👈 Connect to rosbridge_websocket

    ws.onopen = () => {
      console.log("✅ Connected to ROSBridge WebSocket");
      setConnected(true);

      // Optional: subscribe to a topic (like /imu) using ROSBridge protocol
      ws.send(JSON.stringify({
        op: "subscribe",
        topic: "/imu",
      }));
    };

    ws.onclose = () => {
      console.log("❌ Disconnected from ROSBridge WebSocket");
      setConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        // ROSBridge messages have an 'op' field and a 'msg' field
        if (message.op === "publish" && message.topic === "/imu") {
          const imuMsg = message.msg;

          setData(prev => ({
            ...prev,
            imu: {
              x: imuMsg.linear_acceleration.x,
              y: imuMsg.linear_acceleration.y,
              z: imuMsg.linear_acceleration.z
            }
          }));
        }

        // Add more topic parsing as needed
      } catch (e) {
        console.error("Failed to parse WebSocket message:", e);
      }
    };

    return () => ws.close();
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
        <div style={{ gridArea: 'map' }}>
          <MapPanel />
        </div>

        <CameraSystem />

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
