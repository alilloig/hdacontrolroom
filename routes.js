var mochad = require('./resources/mochad.js');
var devices = require('./resources/devices.js');

app.io.route('device', {
	turnOn: function(req) {
		console.log('Enviando el comando para encender el dispositivo '+code);
		mochad.turnOn(req.data);
	},
	turnOff: function(req){
		console.log('Enviando el comando para apagar el dispositivo '+code);
		mochad.turnOff(req.data);
	},
	checkStatus: function(req) {
		devices.checkStatus(req);
	},
	startListening: function(req){
		mochad.readInput(req.io);//le pasamos la conexion con el websocket forzando a tope
	}
});
