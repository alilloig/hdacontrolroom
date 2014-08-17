var socket = io.connect();
var lamparaRojaState = false; //false = off, true = on

$(window).load(function(){
	socket.emit('startSystem');
	socket.emit('startListening');
});

socket.on('turnOn', function(data){
	//llamar a la funcion de animacion ON de data.code
});

socket.on('turnOff', function(data){
	//data.code
});

