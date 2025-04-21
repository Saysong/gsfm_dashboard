## Web Dashboard Overview

This React-based dashboard connects to a ROS2 robot via `rosbridge_suite` and displays live sensor data and camera feeds in a modular layout.

### Features
- Real-time IMU data (acceleration, velocity, orientation)
- Live camera previews for:
  - Orbec Color (`/camera/color/image_raw/compressed`)
  - Orbec Depth (`/camera/depth/image_raw/compressed`)
  - USB Camera (`/image_raw`)
  - Thermal Camera (`/thermal/image_raw`)
- Toggle between multi-camera preview and full-screen view
- VOC/CO2 gas sensor support via `/serial_data` JSON input
- Alert parsing built into same stream
- Fully modular architecture using handlers and React hooks

### File Structure
