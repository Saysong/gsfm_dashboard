import React, { useState, useEffect, useCallback } from 'react';
import { useRos, useTopic } from 'react-roslib';

const MapDataProcessor = ({ onPointCloud, onRobotPose }) => {
  const { ros } = useRos();
  const pointCloudTopic = useTopic(ros, '/lidar_odometry/localmap_points', 'sensor_msgs/msg/PointCloud2');
  const poseTopic = useTopic(ros, '/lidar_odometry/pose', 'nav_msgs/msg/Odometry');

  useEffect(() => {
    if (pointCloudTopic && pointCloudTopic.latestMessage) {
      // Process the PointCloud2 message here
      const processPointCloudData = (message) => {
        // Basic extraction of points (you'll likely need more sophisticated logic)
        const numPoints = message.height * message.width;
        const points = [];
        for (let i = 0; i < numPoints; i++) {
          const xOffset = message.fields.find(f => f.name === 'x')?.offset || 0;
          const yOffset = message.fields.find(f => f.name === 'y')?.offset || 4;
          const zOffset = message.fields.find(f => f.name === 'z')?.offset || 8;
          const pointStep = message.point_step;

          const x = new DataView(message.data.buffer, message.data.byteOffset + i * pointStep + xOffset, 4).getFloat32(true);
          const y = new DataView(message.data.buffer, message.data.byteOffset + i * pointStep + yOffset, 4).getFloat32(true);
          const z = new DataView(message.data.buffer, message.data.byteOffset + i * pointStep + zOffset, 4).getFloat32(true);
          points.push({ x, y, z });
        }
        return points;
      };

      const processedPoints = processPointCloudData(pointCloudTopic.latestMessage);
      onPointCloud(processedPoints); // Send processed data to MapPanel
    }
  }, [pointCloudTopic, onPointCloud]);

  useEffect(() => {
    if (poseTopic && poseTopic.latestMessage) {
      // Process the Odometry message for pose data
      const processPoseData = (message) => {
        return {
          position: {
            x: message.pose.pose.position.x,
            y: message.pose.pose.position.y,
            z: message.pose.pose.position.z,
          },
          orientation: {
            x: message.pose.pose.orientation.x,
            y: message.pose.pose.orientation.y,
            z: message.pose.pose.orientation.z,
            w: message.pose.pose.orientation.w,
          },
        };
      };

      const processedPose = processPoseData(poseTopic.latestMessage);
      onRobotPose(processedPose); // Send processed pose to MapPanel
    }
  }, [poseTopic, onRobotPose]);

  return null; // This component doesn't render anything directly
};

export default MapDataProcessor;
