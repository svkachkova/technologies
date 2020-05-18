const http = require('http');
const static = require('node-static');
const file = new static.Server('.');

http.createServer((req, res) => {
  file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');

// open http://127.0.0.1:8080/server.js.
