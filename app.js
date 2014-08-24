express = require('express.io');
app = express().http().io();

var mochad = require('./resources/mochad.js');
var devices = require('./resources/devices.js');

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev')); // log every request to the console
  //app.use(express.bodyParser()); //pull into POST
});

app.listen(80);// startup our app at http://localhost:80

app.get('/', function (req,res){
	res.sendfile(__dirname + '/index.html');
});

app.io.route('turnOn', function(req) {
	console.log('Enviando el comando para encender el dispositivo '+req.data.code);
	mochad.sendOn(req.data.code);
});
	
app.io.route('turnOff', function(req) {
	console.log('Enviando el comando para apagar el dispositivo '+req.data.code);
	mochad.sendOff(req.data.code);
});

app.io.route('startSystem', function(req) {
	devices.checkStatus();
	mochad.readInput();
	console.log("Recibido evento iniciador del sistema y llamado a checkStatus y readInput");
});