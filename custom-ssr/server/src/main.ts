import http from 'node:http';
import { renderToPipeableStream } from 'react-dom/server';
import React from 'react';
import App from '../../client/src/app/app';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    console.log('request');
    const { pipe } = renderToPipeableStream(React.createElement(App), {
      bootstrapScripts: ['/main.js'],
      onShellReady() {
        res.setHeader('content-type', 'text/html');
        pipe(res);
      },
    });
  } else {
    console.log('unfound', req, res);
    res.statusCode = 404;
    res.end();
  }
});

const PORT = 8080;

server.listen(PORT);

console.log(`Server listening on port: ${PORT}`);
