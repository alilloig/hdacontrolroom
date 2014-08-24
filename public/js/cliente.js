var socket = io.connect("http://192.168.75.129:80");
var devices = {lamparaRoja : {code:'a9', state:false}, lamparaPie : {code:'a2', state:false}, persiana : {code:'a3', state:false}};
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

//Funciones asignadas al click en los elementos o en el plano
function mostrarComedor(){
	console.log("click click");
  	$('#salon').hide();
	$('#comedor').show();
	cargarLamparaPie();
	cargarPersiana();
}

function mostrarSalon(){
  	$('#comedor').hide();
	$('#salon').show();
	cargarLamparaRoja();
}

$('#persiana').click(function(){
	if (this.devices['persiana'].state){//la persiana esta true, subida, por lo que
		socket.emit('turnOff',{code:this.devices['persiana'].code});//enviamos mensaje para bajarla
		console.log("Emitido turnOff a: "+this.devices['persiana'].code);
	}else{//si no, es que esta false y enviamos mensaje para subir
		socket.emit('turnOn',{code:this.devices['persiana'].code});
		console.log("Emitido turnOn a: "+this.devices['persiana'].code);
	}
});
$('#lamparaPie').click(function(){
	if (this.devices['lamparaPie'].state){//la lampara esta true, encendida, por lo que
		socket.emit('turnOff',{code:this.devices['lamparaPie'].code});//enviamos mensaje para apgarla
		console.log("Emitido turnOff a: "+this.devices['lamparaPie'].code);
	}else{//si no, es que esta false y enviamos mensaje para encender	
		socket.emit('turnOn',{code:this.devices['lamparaPie'].code});
		console.log("Emitido turnOn a: "+this.devices['lamparaPie'].code);
	}
});
$('#lamparaRoja').click(function(){
	if (this.devices['lamparaRoja'].state){//la lampara esta true, encendida, por lo que
		socket.emit('turnOff',{code: this.devices['lamparaRoja'].code});//enviamos mensaje para apagarla
		console.log("Emitido turnOff a: "+this.devices['lamparaRoja'].code);
	}else{//si no, es que esta false y enviamos mensaje para encender
		socket.emit('turnOn',{code: this.devices['lamparaRoja'].code});
		console.log("Emitido turnOn a: "+this.devices['lamparaRoja'].code);
	}
});

//Al recibir un evento turnOn llamamos a la funcion de encender pasandole el codigo de dispositivo
socket.on('turnOn',function(data){
	console.log("Encendiendo el dispositivo: "+data.code);
	encender(data.code);
});
//Y hacemos lo equivalente al recibir un evento turnOff
socket.on('turnOff',function(data){
	console.log("Apagando el dispositivo: "+data.code);
	apagar(data.code);
});

//En la funcion encender, dependiendo del codigo recibido guardamos el nuevo estado del dispositivo
//y si es el que se esta mostrando en este momento, llamamos a su animacion de encendido
function encender (code){
	if (code == this.devices['lamparaRoja'].code){
		this.devices['lamparaRoja'].state = true;
		console.log("Guardado lamparaRoja como encendida");
		if ($('#lamparaRoja').is(":visible")){
			cont = 0;
			ctx=$('#lamparaRoja')[0].getContext('2d');
			console.log("Ejecutando la animacion de lamparaRoja");
			encenderLamparaRoja();
		}	
	}else if (code == this.devices['lamparaPie'].code){
		this.devices['lamparaPie'].state = true;
		console.log("Guardado lamparaPie como encendida");
		if ($('#lamparaPie').is(":visible")){
			encenderLamparPie();
		}	
	}else if (code == this.devices['persiana'].code){
		this.devices['persiana'].state = true;
		console.log("Guardado persiana como encendida");
		if ($('#persiana').is(":visible")){
			cont = 25;
			ctx=$('#persiana')[0].getContext('2d');
			subirPersiana();
		}	
	}
}

//El proceso para "apagar" un dispositivo es analogo al de encendido
function apagar (code){
	if (code == this.devices['lamparaRoja'].code){
		this.devices['lamparaRoja'].state=false;
		console.log("Guardada lamparaRoja como apagada");
		if ($('#lamparaRoja').is(':visible')){
			cont = 8;
			ctx=$('#lamparaRoja')[0].getContext('2d');
			apagarLamparaRoja();
		}
	}else if (code == this.devices['lamparaPie'].code){
		this.devices['lamparaPie'].state=false;
		console.log("Guardada lamparaPie como apagada");
		if ($('#lamparaPie').is(':visible')){
			apagarLamparaPie();
		}
	}else if (code == this.devices['persiana'].code){
		this.devices['persiana'].state=false;
		console.log("Guardada persiana como apagada");
		if ($('#persiana').is(':visible')){
			cont = 0;
			ctx=$('#persiana')[0].getContext('2d');
			bajarPersiana();
		}
	}
}

//Funciones para hacer las animaciones
function cargarLamparaRoja(){
	if (this.devices['lamparaRoja'].state){
		img.src = './img/animaciones/lamparaRoja/8.png';
	}else{
		img.src = './img/animaciones/lamparaRoja/0.png';
	}
	ctx = $('#lamparaRoja')[0].getContext('2d');
	ctx.drawImage(img,0,0);
}

function cargarLamparaPie(this.devices){
	if (this.devices['lamparaPie'].state){
		img.src = './img/animaciones/lamparaPie/1.png';
	}else{
		img.src = './img/animaciones/lamparaPie/0.png';
	}
	ctx = $('#lamparaPie')[0].getContext('2d');
	ctx.drawImage(img,0,0);
}

function cargarPersiana(){
	if (this.devices['persiana'].state){
		img.src = './img/animaciones/persiana/0.png';
	}else{
		img.src = './img/animaciones/persiana/25.png';
	}
	ctx = $('#persiana')[0].getContext('2d');
	ctx.drawImage(img,0,0);
}

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
