import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Imu
import asyncio
import websockets
import json

PORT = 8081
clients = set()

class IMUBridge(Node):
    def __init__(self):
        super().__init__('imu_bridge')
        self.subscription = self.create_subscription(
            Imu,
            '/imu',
            self.imu_callback,
            10
        )

    def imu_callback(self, msg):
        imu_data = {
            "imu": {
                "x": msg.linear_acceleration.x,
                "y": msg.linear_acceleration.y,
                "z": msg.linear_acceleration.z
            }
        }

        # Send to all clients
        asyncio.run_coroutine_threadsafe(
            broadcast(json.dumps(imu_data)),
            asyncio.get_event_loop()
        )

async def broadcast(message):
    if clients:
        await asyncio.gather(*(client.send(message) for client in clients))

async def websocket_handler(websocket, path):
    clients.add(websocket)
    print("🟢 Frontend connected")

    try:
        async for _ in websocket:
            pass
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        clients.remove(websocket)
        print("🔴 Frontend disconnected")

async def main_async():
    # Start websocket server
    print(f"🌐 WebSocket server running at ws://0.0.0.0:{PORT}")
    await websockets.serve(websocket_handler, "0.0.0.0", PORT)

    # Start ROS
    rclpy.init()
    node = IMUBridge()
    executor = rclpy.executors.MultiThreadedExecutor()
    executor.add_node(node)

    try:
        await asyncio.get_event_loop().run_in_executor(None, executor.spin)
    finally:
        node.destroy_node()
        rclpy.shutdown()

def main():
    asyncio.run(main_async())

if __name__ == '__main__':
    main()
