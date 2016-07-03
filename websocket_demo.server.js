
var port = process.env.PORT || 8000;

// Set modules and server

const http = require('http');
const http_serv = http.createServer(handleHTTP).listen(port);
const ASQ = require('asynquence');
const node_static = require('node-static');
const static_files = new node_static.Server(__dirname);
const io = require('socket.io').listen(http_serv);

// Handle http requests

function handleHTTP(req, res) {
  if (req.method === "GET") {
    // Handle html that has a numeric begining
    if (req.url === '/') {
      req.addListener("end", function(){
        req.url = "home.html"
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
      res.end("Page not Found!");
    }
  } else {
    res.writeHead(403);
    res.end("Page not found!");
  }
}

// Setup socket connection

function handleIO(socket) {

  // Handle disconnection otherwise log connected

  function disconnect() {
    console.log('client disconnected');
  }

  console.log('client connected');

  socket.on('disconnect', disconnect);

  // Receive and send messages

  socket.on('msg', function(broadcast) {
    socket.broadcast.emit('broadcast', broadcast);
  })

  // Receive and send mouse position

  socket.on('spy', function(x,y) {
    socket.broadcast.emit('spy', {
      x: x,
      y: y
    });
  });

  // Send random numbers at one second interval to all clients

  var intv = setInterval(function () {
    socket.emit('random_number', Math.random());
  }, 1000)
}

// Set connection

io.on('connection', handleIO);
