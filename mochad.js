var net = require('net');
var tcpX10R = 1101;
var tcpX10W = 1099;
var writer = new net.Socket();
var reader = new net.Socket();
var houseUnit = new String();
var state = new String();

reader.connect(tcpX10R);
reader.setEncoding('utf8');

exports.sendOn = function (code){
	writer.connect(tcpX10W);
	writer.write('pl '+code+' on\n');
	console.log('Enviado "pl '+code+' on" por el socket '+tcpX10W);
	writer.end();
};

exports.sendOff = function (code){
	writer.connect(tcpX10W);
	writer.write('pl '+code+' off\n');
	console.log('Enviado "pl '+code+' off" por el socket '+tcpX10W);
	writer.end();
};

exports.readInput = function(){
  reader.on('data', function(data){
    console.log('Leyendo del CM15, output de mochad: '+data);
    if (data.search('HouseUnit') != -1){//Buscamos el codigo de unidad sobre el que esta hablando el mochad
      if (data.charAt(34)=='\n'){//Para distinguir si el codigo de unidad es 10 o mayor y parsear en consecuencia
        houseUnit = data.slice(32,34);
        console.log('Dispositivo: ' +houseUnit);
      }else{
        houseUnit = data.slice(32,35);
        console.log('Dispositivo: ' +houseUnit);
      }
    }
    console.log('Buscando on u off');
    if (data.search('Tx') != -1){//
      if (data.search('Func') != -1){
        if (data.search('On')!= -1){
	  			socket.emit('on', houseUnit);
	  			console.log('emitido ON por el ws');
        }else if (data.search('Off')!= -1){
	    		socket.emit('off', houseUnit);
	    		console.log('emitido OFF por el ws');
        }
      }
    }
  }
};
