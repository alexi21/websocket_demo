// Socket input functions

function random_number(num) {
  document.getElementById("random_number").innerHTML = num;
}

function receive(msg) {
  document.getElementById("receive").innerHTML = document.getElementById("receive").innerHTML + msg + "<br>";
}

function spy(move) {
  $spy_marker.show().css({
    left: (move.x - 2) + "px",
    top: (move.y - 2) + "px"
  });
}

// Set mouse marker

var $spy_marker = $("#spy_marker");

// Socket input connection

var socket = io.connect("/",{
  "connect timeout": 3000,
  "reconnect": false
});

// Socket receive data

socket.on("random_number", random_number);
socket.on("broadcast", receive);
socket.on("spy", spy);

// Dom events

$(document).bind("mousemove",function(evt){
  var x = evt.pageX;
  var y = evt.pageY;
  socket.emit('spy', x, y);
})

document.getElementById("submitmessage").addEventListener(
  "click",
  function(){
    var inp = document.getElementById("message");
    socket.emit("msg",inp.value);
    document.getElementById('broadcast').innerHTML += inp.value + '<br />';
    inp.value = "";
  },
  false
);
