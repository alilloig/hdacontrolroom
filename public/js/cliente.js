var socket = io.connect("http://192.168.75.129:80");
var dispositivos = {lamparaRoja : {code:'a9', state:false}, 
					lamparaPie : {code:'a2', state:false}, 
					persiana : {code:'a3', state:false}};
var ctxLR, ctxLP, ctxP;
var imgLR = new Image();
var imgLP = new Image();
var imgP = new Image();
var cont;
					
//En cuanto tenemos cargado el arbol DOM mandamos un evento que leera el estado de los dispositivos
//y pondra el servidor a escuchar al mochad
//el servidor nos respondera con un mensaje de turnOn por cada dispositivo encendido
//y con uno de turn off por cada dispositivo que estuviese apagado al conectarnos
$(document).ready(function(){
	socket.emit('startSystem');
	console.log("startSystem emitido");
	document.getElementById("areaComedor").addEventListener("click", mostrarComedor);
	document.getElementById("areaSalon").addEventListener("click", mostrarSalon);
	document.getElementById("persiana").addEventListener("click", clickPersiana);
	document.getElementById("lamparaPie").addEventListener("click", clickLamparaPie);
	document.getElementById("lamparaRoja").addEventListener("click", clickLamparaRoja);
});

//Funciones asignadas al click en los elementos o en el plano
function mostrarComedor(){
	console.log("Mostrando salon en el controlador");
  	cargarLamparaPie();
	cargarPersiana();
	$('#salon').hide();
	$('#comedor').show();
}
function mostrarSalon(){
	console.log("Mostrando comedor en el controlador");
  	cargarLamparaRoja();
	$('#comedor').hide();
	$('#salon').show();
}
function clickPersiana(){
	if (dispositivos.persiana.state){//la persiana esta true, subida, por lo que
		socket.emit('turnOff',{code:dispositivos.persiana.code});//enviamos mensaje para bajarla
		console.log("Emitido turnOff a: "+dispositivos.persiana.code);
	}else{//si no, es que esta false y enviamos mensaje para subir
		socket.emit('turnOn',{code:dispositivos.persiana.code});
		console.log("Emitido turnOn a: "+dispositivos.persiana.code);
	}
}
function clickLamparaPie(){
	if (dispositivos.lamparaPie.state){//la lampara esta true, encendida, por lo que
		socket.emit('turnOff',{code:dispositivos.lamparaPie.code});//enviamos mensaje para apgarla
		console.log("Emitido turnOff a: "+dispositivos.lamparaPie.code);
	}else{//si no, es que esta false y enviamos mensaje para encender	
		socket.emit('turnOn',{code:dispositivos.lamparaPie.code});
		console.log("Emitido turnOn a: "+dispositivos.lamparaPie.code);
	}
}
function clickLamparaRoja(){
	if (dispositivos.lamparaRoja.state){//la lampara esta true, encendida, por lo que
		socket.emit('turnOff',{code: dispositivos.lamparaRoja.code});//enviamos mensaje para apagarla
		console.log("Emitido turnOff a: "+dispositivos.lamparaRoja.code);
	}else{//si no, es que esta false y enviamos mensaje para encender
		socket.emit('turnOn',{code: dispositivos.lamparaRoja.code});
		console.log("Emitido turnOn a: "+dispositivos.lamparaRoja.code);
	}
}

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
	if (code == dispositivos.lamparaRoja.code){
		dispositivos.lamparaRoja.state = true;
		console.log("Guardado lamparaRoja como encendida");
		if ($('#lamparaRoja').is(":visible")){
			cont = 0;
			ctx=$('#lamparaRoja')[0].getContext('2d');
			console.log("Ejecutando la animacion de lamparaRoja");
			encenderLamparaRoja();
		}	
	}else if (code == dispositivos.lamparaPie.code){
		dispositivos.lamparaPie.state = true;
		console.log("Guardado lamparaPie como encendida");
		if ($('#lamparaPie').is(":visible")){
			encenderLamparPie();
		}	
	}else if (code == dispositivos.persiana.code){
		dispositivos.persiana.state = true;
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
	if (code == dispositivos.lamparaRoja.code){
		dispositivos.lamparaRoja.state=false;
		console.log("Guardada lamparaRoja como apagada");
		if ($('#lamparaRoja').is(':visible')){
			cont = 8;
			ctx=$('#lamparaRoja')[0].getContext('2d');
			apagarLamparaRoja();
		}
	}else if (code == dispositivos.lamparaPie.code){
		dispositivos.lamparaPie.state=false;
		console.log("Guardada lamparaPie como apagada");
		if ($('#lamparaPie').is(':visible')){
			apagarLamparaPie();
		}
	}else if (code == dispositivos.persiana.code){
		dispositivos.persiana.state=false;
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
	if (dispositivos.lamparaRoja.state){
		imgLR.src = './img/animaciones/lamparaRoja/8.png';
	}else{
		imgLR.src = './img/animaciones/lamparaRoja/0.png';
	}
<<<<<<< HEAD
	img.style.height = '100px';
    img.style.width = '200px';
	ctx = $('#lamparaRoja')[0].getContext('2d');
	ctx.drawImage(img,0,0);
=======
	ctxLR = $('#lamparaRoja')[0].getContext('2d');
	ctxLR.drawImage(imgLR,0,0,480,322);
>>>>>>> origin/master
}

function cargarLamparaPie(){
	if (dispositivos.lamparaPie.state){
		imgLP.src = './img/animaciones/lamparaPie/1.png';
	}else{
		imgLP.src = './img/animaciones/lamparaPie/0.png';
	}
	ctxLP = $('#lamparaPie')[0].getContext('2d');
	ctxLP.drawImage(imgLP,0,0,283,322);
}

function cargarPersiana(){
	if (dispositivos.persiana.state){
		imgP.src = './img/animaciones/persiana/0.png';
	}else{
		imgP.src = './img/animaciones/persiana/25.png';
	}
	ctxP = $('#persiana')[0].getContext('2d');
	ctxP.drawImage(imgP,0,0,197,322);
}

function encenderLamparaRoja(){
	if (cont<8){
		cont++;
		imgLR.src='./img/animaciones/lamparaRoja/'+cont+'.png';
		ctxLR.drawImage(imgLR,0,0,480,322);
		setTimeout(encenderLamparaRoja, 100);
	}
}

function apagarLamparaRoja(){
	if (cont>0){
		cont--;
		imgLR.src='./img/animaciones/lamparaRoja/'+cont+'.png';
		ctxLR.drawImage(imgLR,0,0,480,322);
		setTimeout(apagarLamparaRoja, 100);
	}
}

function encenderLamparaPie(){
	ctxLP=$('#lamparaPie')[0].getContext('2d');
	imgLP.src='./img/animaciones/lamparaPie/1.png';
	ctxLP.drawImage(imgLP,0,0,283,322);
}

function apagarLamparaPie(){
	ctxLP=$('#lamparaPie')[0].getContext('2d');
	imgLP.src='./img/animaciones/lamparaPie/0.png';
	ctxLP.drawImage(imgLP,0,0,283,322);
}

function subirPersiana(){
	if (cont>0){
		cont--;
		imgP.src='./img/animaciones/persiana/'+cont+'.png';
		ctxP.drawImage(imgP,0,0,197,322);
		setTimeout(subirPersiana, 150);
	}
}

function bajarPersiana(){
	if (cont<25){
		cont++;
		imgP.src='./img/animaciones/persiana/'+cont+'.png';
		ctxP.drawImage(imgP,0,0,197,322);
		setTimeout(bajarPersiana, 133);
	}
}
