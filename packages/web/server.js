const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Proxy setup for /api-app
  server.use(
    '/api-app',
    createProxyMiddleware({
      target: process.env.BASE_API_URL,
      changeOrigin: true,
      pathRewrite: { '^/api-app': '' },
      logger: console,
    })
  );

  // Proxy setup for /trueidapi
  server.use(
    '/trueidapi',
    createProxyMiddleware({
      target: 'https://api.trueid.ai',
      changeOrigin: true,
      pathRewrite: { '^/trueidapi': '' },
    })
  );

  // Handle all other requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  if (dev) {
    // Use HTTPS in development
    const httpsOptions = {
      key: fs.readFileSync(path.join(__dirname, '', 'localhost-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '', 'localhost.pem')),
    };

    https.createServer(httpsOptions, server).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${port}`);
    });
  } else {
    // Use HTTP in production
    http.createServer(server).listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});