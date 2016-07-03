// Socket input functions

function setExchangeRate(num) {
  document.getElementById('exchangeRate').innerHTML = num;
}

function receive(msg) {
  $('#receive').prepend(msg + '<br>');
}

function spy(move) {
  $spy_marker.show().css({
    left: (move.x - 2) + 'px',
    top: (move.y - 2) + 'px'
  });
}

// Set mouse marker

var $spy_marker = $('#spy_marker');

// Socket input connection

var socket = io.connect('/',{
  'connect timeout': 3000,
  'reconnect': false
});

// Socket receive data

socket.on('exchangeRate', setExchangeRate);
socket.on('broadcast', receive);
socket.on('spy', spy);

// Dom events

$(document).bind('mousemove',function(evt){
  var x = evt.pageX;
  var y = evt.pageY;
  socket.emit('spy', x, y);
})

$('#submitmessage').click(
  function(){
    var $input = $('#message').val();
    socket.emit('msg', $input);
    $('#broadcast').prepend($input + '<br>');
    $('#message').val('');
});
