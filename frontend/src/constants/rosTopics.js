// src/constants/rosTopics.js

export const CAMERA_TOPICS = {
  Vision: '/camera/color/image_raw/compressed',
  Depth: '/camera/depth/image_grayscale/compressed',
  USB: '/image_raw', // You can change this to '/usb/compressed' if needed
};

export const IMU_TOPIC = '/imu/data';
export const GAS_TOPIC = '/serial_data';
export const POSE_TOPIC = '/lidar_odometry/pose';
export const THERMAL_TOPIC = '/thermal/image_raw'; // <-- Make sure this is separate