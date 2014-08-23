var mochad = require('./mochad.js');
var devices = require('./devices.js');

app.io.route('device', {
	turnOn: function(req) {
		console.log('Enviando el comando para encender el dispositivo '+code);
		mochad.sendOn(req.data);
	},
	turnOff: function(req){
		console.log('Enviando el comando para apagar el dispositivo '+code);
		mochad.sendOff(req.data);
	},
	startSystem: function(req) {
		devices.checkStatus();
		mochad.readInput();
	}
});
