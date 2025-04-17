// handlers/depthCameraHandler.js
function setupDepthCameraHandler(node, clients) {
    node.createSubscription('sensor_msgs/msg/Image', '/camera/depth/image_raw', (msg) => {
      const depthData = {
        camera: {
          source: 'depth',
          width: msg.width,
          height: msg.height,
          encoding: msg.encoding,
          frame_id: msg.header.frame_id,
          timestamp: msg.header.stamp,
          // Depth images may be larger, keep this commented out unless needed:
          // data: Buffer.from(msg.data).toString('base64'),
        },
      };
  
      const json = JSON.stringify(depthData);
  
      clients.forEach((ws) => {
        if (ws.readyState === ws.OPEN) {
          ws.send(json);
        }
      });
    });

    console.log(' Subscribed to Depth camera (/camera/depth/image_raw)');
  }
  
  module.exports = setupDepthCameraHandler;
  