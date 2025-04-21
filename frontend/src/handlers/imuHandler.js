// src/handlers/imuHandler.js

export function parseIMU(msg) {
    if (!msg) return null;
  
    return {
      linearAcceleration: {
        x: msg.linear_acceleration?.x || 0,
        y: msg.linear_acceleration?.y || 0,
        z: msg.linear_acceleration?.z || 0,
      },
      angularVelocity: {
        x: msg.angular_velocity?.x || 0,
        y: msg.angular_velocity?.y || 0,
        z: msg.angular_velocity?.z || 0,
      },
      orientation: {
        x: msg.orientation?.x || 0,
        y: msg.orientation?.y || 0,
        z: msg.orientation?.z || 0,
        w: msg.orientation?.w || 1,
      },
      timestamp: msg.header?.stamp || null,
    };
  }
  