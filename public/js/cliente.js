var socket = io.connect(/**direccion del servidor**/);
var devices = [lamparaRoja : {code:'a1', state:false}, lamparaPie : {code:'a2', state:false, persiana : {code:'a3', state:false}];

$(window).load(function(){
	socket.emit('startSystem');
	socket.emit('startListening');
});

socket.on('turnOn',function(data){
	encender(data.code);
});

socket.on('turnOff',function(data){
	apagar(data.code);
});

	
function encender (code){
	if (code == devices['lamparaRoja'].code){
		encenderLR();
	}else if (code == devices['lamparaPie'].code){
		encenderLP();
	}else if (code == devices['persiana'].code){
		subirPersiana();
	}
}


function apagar (code){
	if (code == devices['lamparaRoja'].code){
		apagarLR();
	}else if (code == devices['lamparaPie'].code){
		apagarLP();
	}else if (code == devices['persiana'].code){
		bajarPersiana();
	}
}

function encenderLR(){
	devices['lamparaRoja'].state = true;
	if ($('#lamparaRoja').is(":visible")){
		//animacion
	}
}

function apagarLR(){
	devices['lamparaRoja'].state = false;
	if ($('#lamparaRoja').is(":visible")){
		//animacion
	}
}

function encenderLP(){
	devices['lamparaPie'].state = true;
	if ($('#lamparaPie').is(":visible")){
		//animacion
	}
}

function apagarLP(){
	devices['lamparaPie'].state = false;
	if ($('#lamparaPie').is(":visible")){
		//animacion
	}
}

function subirPersiana(){
	devices['persiana'].state = true;
	if ($('#persiana').is(":visible")){
		//animacion
	}
}

function bajarPersiana(){
	devices['persiana'].state = false;
	if ($('#persiana').is(":visible")){
		//animacion
	}
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
