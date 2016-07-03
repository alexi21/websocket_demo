function handleHTTP(req, res) {
  if (req.method === "GET") {
    if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
      req.addListener("end", function(){
        req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html")
        static_files.serve(req, res);
      });
      req.resume();
    } else if (req.url === '/jquery.js') {
      static_files.serve(req, res);
    } else {
      res.writeHead(403);
      res.end("Get outta here!");
    }
  } else {
    res.writeHead(403);
    res.end("Get outta here!");
  }
}

function handleIO(socket) {
  function disconnect() {
    console.log('client disconnected');
  }

  console.log('client connected');

  socket.on('disconnect', disconnect);

  socket.on('typeit', function(msg) {
    socket.broadcast.emit('messages', msg);
  });

  socket.on('spy', function(x,y) {
    socket.broadcast.emit('spy', {
      x: x,
      y: y
    });
  });

  socket.on('msg', function(broadcast) {
    socket.broadcast.emit('broadcast', broadcast);
  })

  var intv = setInterval(function () {
    socket.emit('hello', Math.random());
  }, 1000)
}

var host = "localhost";
var port = 8006;

const http = require('http');
const http_serv = http.createServer(handleHTTP).listen(port,host);
const ASQ = require('asynquence');
const node_static = require('node-static');
const static_files = new node_static.Server(__dirname);
const io = require('socket.io').listen(http_serv);

io.on('connection', handleIO);

//configure socket.io
io.configure(function() {
  io.enable('browser client minification');
  io.enable('browser client etag');
  io.set('log level', 1);
  io.set('transports', [
    'websocket',
    'xhr-polling',
    'jsonp-polling'
  ]);
});
