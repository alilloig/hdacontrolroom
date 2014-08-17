var socket = io.connect();
var lamparaRojaState = false; //false = off, true = on

$(window).load(function(){
	socket.emit('startSystem');
	socket.emit('startListening');
});

socket.on('turnOn', function(){


});
