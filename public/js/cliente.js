var socket = io.connect(/**direccion del servidor**/);
var devices = [lamparaRoja : {code:'a1', state:false}, lamparaPie : {code:'a2', state:false, persiana : {code:'a3', state:false}];

//Al cargar la ventana mandamos un evento que leera el estado de los dispositivos
//y pondra el servidor a escuchar al mochad
//el servidor nos respondera con un mensaje de turnOn por cada dispositivo encendido
//y con uno de turn off por cada dispositivo que estuviese apagado al conectarnos
$(window).load(function(){
	socket.emit('startSystem');
});

socket.on('turnOn',function(data){
	encender(data.code);
});

socket.on('turnOff',function(data){
	apagar(data.code);
});

	
function encender (code){
	if (code == devices['lamparaRoja'].code){
		devices['lamparaRoja'].state = true;
		if ($('#lamparaRoja').is(":visible")){
			encenderLamparaRoja();
		}	
	}else if (code == devices['lamparaPie'].code){
		devices['lamparaPie'].state = true;
		if ($('#lamparaPie').is(":visible")){
			encenderLamparPie();
		}	
	}else if (code == devices['persiana'].code){
		devices['persiana'].state = true;
		if ($('#persiana').is(":visible")){
			subirPersiana();
		}	
	}
}

function apagar (code){
	if (code == devices['lamparaRoja'].code){
		devices['lamparaRoja'].state=false;
		if ($('#lamparaRoja').is(':visible')){
			apagarLamparaRoja();
		}
	}else if (code == devices['lamparaPie'].code){
		devices['lamparaPie'].state=false;
		if ($('#lamparaPie').is(':visible')){
			apagarLamparaPie();
		}
	}else if (code == devices['persiana'].code){
		devices['persiana'].state=false;
		if ($('#persiana').is(':visible')){
			bajarPersiana();
		}
	}
}

//Funciones para animar

function encenderLamparaRoja(){
}

function apagarLamparaRoja(){
}

function encenderLamparaPie(){
}

function apagarLamparaPie(){
}

function subirPersiana(){
}

function bajarPersiana(){
}

///Funciones asignadas al click en los elementos o en el plano

function cambiarEstadoLamparaRoja(){
	if (devices['lamparaRoja'].state){//la lampara esta true, encendida, por lo que
		socket.emit('turnOff',{code: devices['lamparaRoja'].code});//enviamos mensaje para apagarla
	}else{//si no, es que esta false y enviamos mensaje para encender
		socket.emit('turnOn',{code: devices['lamparaRoja'].code});
	}
}

function cambiarEstadoLamparaPie(){
	if (devices['lamparaPie'].state){//la lampara esta true, encendida, por lo que
		socket.emit('turnOff',{code:devices['lamparaPie'].code});//enviamos mensaje para apgarla
	}else{//si no, es que esta false y enviamos mensaje para encender	
		socket.emit('turnOn',{code:devices['lamparaPie'].code});
	}
}

function cambiarEstadoPersiana(){
	if (devices['persiana'].state){//la persiana esta true, subida, por lo que
		socket.emit('turnOff',{code:devices['persiana'].code});//enviamos mensaje para bajarla
	}else{//si no, es que esta false y enviamos mensaje para subir
		socket.emit('turnOn',{code:devices['persiana'].code});
	}
}

function controlarLamparaRoja(){
	if (devices['lamparaRoja'].status){
		
		$('#lamparaPie').hide();
		$('#persiana').hide();
		$('#lamparaRoja').show();
	}else{
		//cargar la imagen de lampara apagada, .show() y .hide los otros dos
	}
}


function controlarLamparaPie(){
	if (devices['lamparaPie'].status){
		//cargar la imagen de lampara encendida, .show() y .hide() los otros dos
	}else{
		//cargar la imagen de lampara apagada, .show() y .hide los otros dos
	}
}


function controlarPersiana(){
	if (devices['lamparaRoja'].status){
		//cargar la imagen de lampara encendida, .show() y .hide() los otros dos
	}else{
		//cargar la imagen de lampara apagada, .show() y .hide los otros dos
	}
}
