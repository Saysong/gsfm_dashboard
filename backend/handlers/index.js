const setupImuHandler = require('./imuHandler');
const setupCameraHandler = require('./cameraHandler');
const setupDepthCameraHandler = require('./depthCameraHandler')
const setupVisionCameraHandler = require('./visionCameraHandler');


function registerHandlers(node, clients) {
  setupImuHandler(node, clients);
  //setupCameraHandler(node, clients); // Add camera
  //setupDepthCameraHandler(node, clients);
  //setupVisionCameraHandler(node, clients);
}

module.exports = registerHandlers;
