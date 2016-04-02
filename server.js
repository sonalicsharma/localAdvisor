var http = require('http');
var port = 1337;

http.createServer(function(req, res) {
      res.writeHead(200, {
            'Content-Type': 'text/plain'
      });

      res.end("Hello from server");
}).listen(port);

console.log('Web server running at http://localhost:'+ port);