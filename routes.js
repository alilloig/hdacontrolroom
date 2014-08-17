var mochad = require('./mochad.js');

app.io.route('device', {
  turnOn: function(code) {
  	console.log('Enviando el comando para encender el dispositivo '+code);
		mochad.turnOn(code);
  },
  turnOff: function(code){
  	console.log('Enviando el comando para apagar el dispositivo '+code);
		mochad.turnOff(code);
  },
  checkState: function(code) {
  	devices['code'][];
  }
	startListening: function(){
		mochad.readInput();
	}
});
