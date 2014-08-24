var list = [{label:'lamparaRoja',code:'a9',status:false},
						{label:'persianaSalon',code:'a2',status:false},
						{label:'lamparaPie',code:'a3',status:false}];

exports.turnItOn = function (code){
	console.log("Encendiendo dispositivo: "+code);
	for (var i=0;i<list.length;i++){
		if(list[i].code == code.toLowerCase()){
			app.io.broadcast('turnOn',{code:list[i].code});
			list[i].status = true;
			console.log('Cambiado el dispositivo '+list[i].label+' con codigo X10 '+list[i].code+' a estado '+list[i].status);
		}
	}
};

exports.turnItOff = function (code){
	console.log("Apagando dispositivo: "+code);
	for (var i=0;i<list.length;i++){
		if(list[i].code == code.toLowerCase()){
			app.io.broadcast('turnOff',{code:list[i].code});
			list[i].status = false;
			console.log('Cambiado el dispositivo '+list[i].label+' con codigo X10 '+list[i].code+' a estado '+list[i].status);
		}
	}
};

exports.checkStatus = function (){
	for (var i=0;i<list.length;i++){
		if(list[i].status == true){
			app.io.broadcast('turnOn',{code:list[i].code});
		}else if (list[i].status == false){
			app.io.broadcast('turnOff',{code:list[i].code});
		}
	}
};
