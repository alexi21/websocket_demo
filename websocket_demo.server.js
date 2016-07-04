var port = process.env.PORT || 8000;

// Set modules and server

const http = require('http');
const http_serv = http.createServer(handleHTTP).listen(port);
const node_static = require('node-static');
const static_files = new node_static.Server(__dirname);
const io = require('socket.io').listen(http_serv);
const exchange = require('./lib/exchange.js');

// Handle http requests

function handleHTTP(req, res) {
  if (req.method === 'GET') {
    // Handle html that has a numeric begining
    if (req.url === '/') {
      req.addListener('end', function(){
        req.url = 'home.html'
        static_files.serve(req, res);
      });
      req.resume();
    } else if (req.url === '/jquery.js') {
      static_files.serve(req, res);
    } else if (req.url === '/websocket_demo.js') {
      static_files.serve(req, res);
    } else if (req.url === '/websocket_demo.css') {
      static_files.serve(req, res);
    } else {
      res.writeHead(403);
      res.end('Page not Found!');
    }
  } else {
    res.writeHead(403);
    res.end('Page not found!');
  }
}

// Setup socket connection

function handleIO(socket) {

  // Handle disconnection otherwise log connected

  console.log('client connected');

  socket.on('disconnect', function() {
    console.log('client disconnected');
  });

  // Receive and send messages

  socket.on('msg', function(broadcast) {
    socket.broadcast.emit('broadcast', broadcast);
  });

  // Receive and send mouse position

  socket.on('spy', function(x,y) {
    socket.broadcast.emit('spy', {
      x: x,
      y: y
    });
  });

  // Send exchange rate at 10 second interval to all clients

  var intv = setInterval(function () {
    return exchange.amountToOther().then(r => {
        console.log(r);
        socket.emit('exchangeRate', r);
      });
  }, 10000);
}

// Set connection

io.on('connection', handleIO);

// Thanks to Kyle Simpson @getify for the excellent tutorial that got me started.
