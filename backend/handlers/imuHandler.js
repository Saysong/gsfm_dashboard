function setupImuHandler(node, clients) {
    // Subscribe to the IMU topic
    node.createSubscription('sensor_msgs/msg/Imu', '/imu', (msg) => {
      const imuData = {
        imu: {
          x: msg.linear_acceleration.x,
          y: msg.linear_acceleration.y,
          z: msg.linear_acceleration.z,
          // Optional: include orientation/gyro data later
        },
      };
  
      const json = JSON.stringify(imuData);
  
      clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
          ws.send(json);
        }
      });
    });
  
    console.log(' Subscribed to /imu');
  }
  
  module.exports = setupImuHandler;
  