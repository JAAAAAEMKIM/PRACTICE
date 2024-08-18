import http from 'node:http';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    console.log('hello world!');
  } else {
    res.statusCode = 404;
    res.end();
  }
});

const PORT = 8080;

server.listen(PORT);

console.log(`Server listening on port: ${PORT}`);
