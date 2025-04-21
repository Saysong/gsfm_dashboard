# 🚨 GSFM Mission Dashboard

This is the mission control web dashboard for the GSFM (Geometric Sensor Fusion Module) disaster response robot.

The dashboard displays real-time data from multiple onboard sensors including:
- IMU (acceleration)
- Gas (temperature, VOC, CO₂)
- Alerts (collision and threshold warnings)
- Camera views (Vision, Thermal, Depth)
- SLAM-based map area
- Trend tracking for each sensor

Built for rapid response teams and researchers to monitor sensor fusion output, trigger alerts, and evaluate live performance.

---

## ⚙️ Technologies Used

- React (functional components, hooks)
- Node.js WebSocket backend (bridge to ROS2)
- CSS Grid layout for modular dashboard design
- SVG-based mini charts for sensor trends
- Fully modular component-based structure

---

## 📦 Features So Far

- ✅ Real-time IMU and gas sensor data updates
- ✅ Modular sensor cards with trend graphs
- ✅ Click-to-reset historical graphs per card
- ✅ Alerts display with incoming ROS message feed
- ✅ Camera system with:
  - View all feeds simultaneously (2×2 grid)
  - Single view with toggle + live preview selection
- ✅ SLAM map placeholder panel ready for canvas or image stream

---

## 🧠 Architecture

### Frontend (`frontend/`)
- Built in React with functional components
- `App.jsx` receives all sensor data and routes to visual panels
- All panels live inside `DashboardGrid` using CSS Grid
- Each panel handles its own layout, trend tracking, and interactivity

### Backend
- WebSocket server (currently mocked, ready to connect to ROS2 via `rclnodejs`)
- Expected message structure:
```json
{
  "imu": { "x": 0.1, "y": 0.2, "z": 9.8 },
  "gas": { "temp": 23.5, "voc": 1250, "co2": 420 },
  "alert": "Whisker 1 HIT"
}