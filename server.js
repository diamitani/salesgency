/**
 * SalesGency Sovereign Development Server
 * Serves static frontend assets and executes Vercel Serverless Functions (/api/*) with Vercel AI SDK integration.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown; charset=UTF-8',
  '.zip': 'application/zip'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  // Handle API routes
  if (pathname.startsWith('/api/')) {
    let apiFile = '';
    const cleanPath = pathname.replace(/^\/api\//, '').replace(/\/$/, '');

    if (cleanPath === 'agent') apiFile = 'api/agent.js';
    else if (cleanPath === 'builder') apiFile = 'api/builder.js';
    else if (cleanPath === 'catalog') apiFile = 'api/catalog.js';
    else if (cleanPath === 'portal/generate') apiFile = 'api/portal/generate.js';
    else if (cleanPath.startsWith('stripe/')) apiFile = `api/${cleanPath}.js`;
    else apiFile = `api/${cleanPath}.js`;

    const fullApiPath = path.join(__dirname, apiFile);
    if (fs.existsSync(fullApiPath)) {
      // Parse Body if POST/PUT
      let body = {};
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        try {
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const raw = Buffer.concat(buffers).toString();
          if (raw) {
            body = JSON.parse(raw);
          }
        } catch (e) {
          console.warn('[Server] Body parse error:', e.message);
        }
      }

      req.body = body;
      req.query = Object.fromEntries(parsedUrl.searchParams);

      // Enhance res with Express-like helpers
      res.status = (code) => {
        res.statusCode = code;
        return res;
      };
      res.json = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      };

      try {
        delete require.cache[require.resolve(fullApiPath)];
        const handler = require(fullApiPath);
        return await handler(req, res);
      } catch (err) {
        console.error('[API Execution Error]', pathname, err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ error: err.message || 'Internal API Error' }));
      }
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: `API endpoint not found: ${pathname}` }));
    }
  }

  // Handle Static files
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  // If path doesn't have an extension and is not a dir, check for .html
  let filePath = path.join(__dirname, pathname);
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // 404 handler
    const notFoundPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      fs.createReadStream(notFoundPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`🚀 SalesGency Unified Node & Vercel AI SDK Server running at http://localhost:${PORT}`);
});
