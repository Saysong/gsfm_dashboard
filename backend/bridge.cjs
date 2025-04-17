const WebSocket = require('ws');
const rclnodejs = require('rclnodejs');
const registerHandlers = require('./handlers'); // <- centralized handler loader

const PORT = 8081;
const wss = new WebSocket.Server({ port: PORT });
const clients = [];

console.log(` WebSocket server running on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
  console.log('🟢 Frontend connected');
  clients.push(ws);

  ws.on('close', () => {
    const i = clients.indexOf(ws);
    if (i !== -1) clients.splice(i, 1);
    console.log('🔴 Frontend disconnected');
  });
});

rclnodejs.init().then(() => {
  const node = new rclnodejs.Node('gsfm_dashboard_bridge');

  // 🔌 Register all topic subscriptions
  registerHandlers(node, clients);

  rclnodejs.spin(node);
});
