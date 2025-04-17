function setupCameraHandler(node, clients) {
    node.createSubscription('sensor_msgs/msg/Image', '/image_raw', (msg) => {
      const cameraData = {
        camera: {
          source: 'usb',
          width: msg.width,
          height: msg.height,
          encoding: msg.encoding,
          frame_id: msg.header.frame_id,
          timestamp: msg.header.stamp,
          // Optional: comment this out for performance if you're not displaying yet
          data: Buffer.from(msg.data).toString('base64'),
        },
      };
  
      const json = JSON.stringify(cameraData);
  
      clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
          ws.send(json);
        }
      });
    });
  
    console.log('Subscribed to USB camera (/image_raw)');
  }
  
  module.exports = setupCameraHandler;
  