# websocket demonstration

Running live on Heroku, please do not abuse this dyno, thankyou.

### https://evening-ravine-53812.herokuapp.com/

This is a simple demonstration of websockets using the socket.io package available on npm.

The server is run using the built in node package. First we set the port to listen on 8000 for dev or the port required by your host.

```var port = process.env.PORT || 8000;```

Then the server is started.

```const http = require('http');```
```const http_serv = http.createServer(handleHTTP).listen(port);```

The input output is set up by first requiring the socket.io and socket.io-client package.
On the server the module is required and run in the one command.

```const io = require('socket.io').listen(http_serv);```

We then run our handler on a connection.

```io.on('connection', handleIO);```

handleIO is a function that is created within your app to handle incoming and outgoing socket connections. The connections are passed as parameters to the function. Each instance of a connection is thus handled with a different socket. In this way our server can handle multiple connections. In the following example each connection parameter is passed as the argument ```socket```.

In order to recieve and run commands within the server we listen on each socket for set commands, and then run a function according to the received command. For example if we receive the command ```'disconnect'``` we run the disconnect function.

```  socket.on('disconnect', disconnect);```

Which is as follows:

```function disconnect() {
    console.log('client disconnected');
  }```
  
More interesting functions can be run to receive data through the web socket, and then parse that data according to the logic of the program. As an example the following instance of a socket connection listens for the ```msg``` command and then broadcasts that command to all connected sockets with the command ```broadcast``` and the attached data.

```socket.on('msg', function(broadcast) {
    socket.broadcast.emit('broadcast', broadcast);
  });```
  
On the CLIENT side a socket is also created with the ```io.connect``` command and attached to a variable.

```var socket = io.connect("/",{
  "connect timeout": 3000,
  "reconnect": false
});```

The broadcast command is received, as it is on the server, however on the client we want to run a different function and parse the received data in a different manner.

First we receive the command and data.

```socket.on("broadcast", receive);```

Then we run the ```receive``` function to use that received data in accordance with our logic.

```function receive(msg) {
  document.getElementById("receive").innerHTML = document.getElementById("receive").innerHTML + msg + "<br>";
}```

Here we are simply appending that data to the element on the html page with the ```id="receive"```.


#### Random number generator

A random number generator on the server creates individual random numbers that it pushes to each client every second.

#### Message sending and reception

Any messages sent through the client are received by all other connected clients.

#### Mouse movement

The page watches the mouse movement of each client and passes that to the server. In the present iteration there is no way of parsing that received data according to the client, and hence this will only function as intended if there are only two clients connected.

#### Credit

All credit for this app goes to Kyle Simpson and his excellent tutorial on node.js and javascript of which the websocket demo was part.
