// server.js
const express = require('express');
const https = require('https'); // or 'http' if target is http
const { URL } = require('url');
require('dotenv').config()


const HTTP_SERVER_PORT = process.env.HTTP_PORT || 8080
const app = express();
app.use(express.raw({ type: '*/*' })); // forward raw body

const TARGET = 'https://example.com'; // your upstream
const targetURL = new URL(TARGET);

app.use('/api', (req, res) => {
  const pathname = req.originalUrl.replace(/^\/api/, '');
  const options = {
    protocol: targetURL.protocol,
    hostname: targetURL.hostname,
    port: targetURL.port || (targetURL.protocol === 'https:' ? 443 : 80),
    path: pathname + (req._parsedUrl.search || ''),
    method: req.method,
    headers: {
      ...req.headers,
      host: targetURL.host, // mimic changeOrigin
    },
  };

  const proxyReq = (targetURL.protocol === 'https:' ? https : http).request(
    options,
    proxyRes => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on('error', err => {
    res.status(502).send('Bad Gateway: ' + err.message);
  });

  if (req.body && req.body.length) proxyReq.write(req.body);
  req.pipe(proxyReq); // stream body if not pre-parsed
});

app.listen(HTTP_SERVER_PORT, () => console.log('Proxy on http://localhost:3000'));