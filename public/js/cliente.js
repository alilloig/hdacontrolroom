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
}

function apagarLR(){
}

function encenderLP(){
}

function apagarLP(){
}

function subirPersiana(){
}

function bajarPersiana(){
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
