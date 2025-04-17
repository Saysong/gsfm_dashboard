// handlers/visionCameraHandler.js
function setupVisionCameraHandler(node, clients) {
    node.createSubscription('sensor_msgs/msg/Image', '/camera/color/image_raw', (msg) => {
      const visionData = {
        camera: {
          source: 'vision',
          width: msg.width,
          height: msg.height,
          encoding: msg.encoding,
          frame_id: msg.header.frame_id,
          timestamp: msg.header.stamp,
          // Optionally send image data:
          // data: Buffer.from(msg.data).toString('base64'),
        },
      };
  
      const json = JSON.stringify(visionData);
  
      clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
          ws.send(json);
        }
      });
    });
  
    console.log('Subscribed to Vision camera (/camera/color/image_raw)');
  }
  
  module.exports = setupVisionCameraHandler;
  