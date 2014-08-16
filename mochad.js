var net = require('net');
var tcpX10 = 1101;
var writer = new net.Socket();
var reader = new net.Socket();
var houseUnit = new String();
var state = new String();

reader.connect(tcpX10);
reader.setEncoding('utf8');


exports.sendOn = function (code){


};

exports.sendOff = function (code){

};

exports.readInput = function(){
  reader.on('data', function(data){
    console.log('Output de mochad: ');
    console.log(data);
    console.log('Hasta aqui del tiron');
    if (data.search('HouseUnit') != -1){
      if (data.charAt(34)=='\n'){//Para distinguir si el codigo de unidad es 10 o mayor
        houseUnit = data.slice(32,34);
        console.log('Dispositivo: ' +houseUnit);
      }else{
        houseUnit = data.slice(32,35);
        console.log('Dispositivo: ' +houseUnit);
      }
    }
    console.log('Buscando on u off');
    if (data.search('Tx') != -1){
      if (data.search('Func') != -1){
        if (data.search('On')!= -1){
	  socket.emit('on', houseUnit);
	  console.log('websocket on emitido');
	  console.log('Se va a cambiar a estado ON');
        }else{ 
	  if (data.search('Off')!= -1){
	    socket.emit('off', houseUnit);
	    console.log('websocket off emitido');
	    console.log('Se va a cambiar a estado OFF');
	  }
        }
      }
    }
  }
};
