var mochad = require('./mochad.js');
var devices = require('./devices.js');

app.io.route('turnOn', function(req) {
	console.log('Enviando el comando para encender el dispositivo '+req.data.code);
	mochad.sendOn(req.data.code);
});
	
app.io.route('turnOff', function(req) {
	console.log('Enviando el comando para apagar el dispositivo '+req.data.code);
	mochad.sendOff(req.data.code);
});

app.io.route('startSystem', function(req) {
	console.log("Recibido evento iniciador del sistema");
	devices.checkStatus();
	mochad.readInput();
});
