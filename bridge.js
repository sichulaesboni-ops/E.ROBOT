const http = require('http');
const { spawn } = require('child_process');

const PORT = 8787;
let mt5Process = null;

// Spawn Python Executor
function startExecutor() {
  mt5Process = spawn('python', ['executor.py']);
  mt5Process.stdout.on('data', (data) => console.log(`[MT5] ${data}`));
  mt5Process.stderr.on('data', (data) => console.error(`[MT5 ERR] ${data}`));
}

const server = http.createServer((req, res) => {
  // CORS Headers for local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === '/connect' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      // Forward to Python executor via stdin...
      // For this demo, we return a mock success.
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, account: '20498115', latency: 12 }));
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

startExecutor();
server.listen(PORT, '127.0.0.1', () => {
  console.log(`E.ROBOT Bridge running on http://127.0.0.1:${PORT}`);
});
