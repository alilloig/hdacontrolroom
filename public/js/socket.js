var socket = io.connect();
var lamparaRojaState = false; //false = off, true = on

$(window).load(function(){
	socket.emit('checkStatus');
	socket.emit('startListening');
});

socket.on('loadState', function(){


});
