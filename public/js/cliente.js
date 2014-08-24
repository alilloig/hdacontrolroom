var socket = io.connect(192.168.75.129);
var devices = {lamparaRoja : {code:'a1', state:false}, lamparaPie : {code:'a2', state:false}, persiana : {code:'a3', state:false}};
var img = new Image();
var ctx, cont;

//En cuanto tenemos cargado el arbol DOM mandamos un evento que leera el estado de los dispositivos
//y pondra el servidor a escuchar al mochad
//el servidor nos respondera con un mensaje de turnOn por cada dispositivo encendido
//y con uno de turn off por cada dispositivo que estuviese apagado al conectarnos
$(document).ready(function(){
	socket.emit('startSystem');
	console.log("startSystem emitido");
});

//Al recibir un evento turnOn llamamos a la funcion de encender pasandole el codigo de dispositivo
socket.on('turnOn',function(data){
	encender(data.code);
});
//Y hacemos lo equivalente al recibir un evento turnOff
socket.on('turnOff',function(data){
	apagar(data.code);
});

//En la funcion encender, dependiendo del codigo recibido guardamos el nuevo estado del dispositivo
//y si es el que se esta mostrando en este momento, llamamos a su animacion de encendido
function encender (code){
	if (code == devices['lamparaRoja'].code){
		devices['lamparaRoja'].state = true;
		if ($('#lamparaRoja').is(":visible")){
			cont = 0;
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
			cont = 25;
			subirPersiana();
		}	
	}
}

//El proceso para "apagar" un dispositivo es analogo al de encendido
function apagar (code){
	if (code == devices['lamparaRoja'].code){
		devices['lamparaRoja'].state=false;
		if ($('#lamparaRoja').is(':visible')){
			cont = 8;
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
			cont = 0;
			bajarPersiana();
		}
	}
}

//Funciones para hacer las animaciones

function encenderLamparaRoja(){
	if (cont<8){
		cont++;
		img.src='./img/animaciones/lamparaRoja/'+cont+'.png';
		ctx.drawImage(img,0,0);
		setTimeout(encenderLamparaRoja, 100);
	}
}

function apagarLamparaRoja(){
	if (cont>0){
		cont--;
		img.src='./img/animaciones/lamparaRoja/'+cont+'.png';
		ctx.drawImage(img,0,0);
		setTimeout(apagarLamparaRoja, 100);
	}
}

function encenderLamparaPie(){
	ctx=$('#lamparaPie')[0].getContext('2d');
	img.src='./img/animaciones/lamparaPie/1.png';
	ctx.drawImage(img,0,0);
}

function apagarLamparaPie(){
	ctx=$('#lamparaPie')[0].getContext('2d');
	img.src='./img/animaciones/lamparaPie/0.png';
	ctx.drawImage(img,0,0);
}

function subirPersiana(){
	if (cont>0){
		cont--;
		img.src='./img/animaciones/persiana/'+cont+'.png';
		ctx.drawImage(img,0,0);
		setTimeout(subirPersiana, 150);
	}
}

function bajarPersiana(){
	if (cont<25){
		cont++;
		img.src='./img/animaciones/persiana/'+cont+'.png';
		ctx.drawImage(img,0,0);
		setTimeout(bajarPersiana, 133);
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

function cargarLamparaRoja(){
	if (devices['lamparaRoja'].status){
		img.src = './img/animaciones/lamparaRoja/8.png';
	}else{
		img.src = './img/animaciones/lamparaRoja/0.png';
	}
	ctx = $('#lamparaRoja')[0].getContext('2d');
	$('#lamparaPie').hide();
	$('#persiana').hide();
	$('#lamparaRoja').show();
	ctx.drawImage(img,0,0);
}

function cargarLamparaPie(){
	if (devices['lamparaPie'].status){
		img.src = './img/animaciones/lamparaPie/1.png';
	}else{
		img.src = './img/animaciones/lamparaPie/0.png';
	}
	ctx = $('#lamparaPie')[0].getContext('2d');
	$('#persiana').hide();
	$('#lamparaRoja').hide();
	$('#lamparaPie').show();
	ctx.drawImage(img,0,0);
}

function cargarPersiana(){
	if (devices['persiana'].status){
		img.src = './img/animaciones/persiana/0.png';
	}else{
		img.src = './img/animaciones/persiana/25.png';
	}
	ctx = $('#persiana')[0].getContext('2d');
	$('#lamparaPie').hide();
	$('#lamparaRoja').hide();
	$('#persiana').show();
	ctx.drawImage(img,0,0);
}
