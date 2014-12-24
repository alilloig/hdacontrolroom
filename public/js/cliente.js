var socket = io.connect("localhost:80");
var dispositivos = {lamparaRoja : {code:'a3', state:false}, 
					lamparaPie : {code:'a1', state:false}, 
					persiana : {code:'a2', state:false}};
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
	$('#areaComedor').keypress(function(e) {
		if (e.which == '13') {
			$('#areaComedor').click();
		}
	});
	$('#areaSalon').keypress(function(e) {
		if (e.which == '13') {
			$('#areaSalon').click();
		}
	});
	$('#lamparaRoja').keypress(function(e) {
		if (e.which == '13') {
			$('#lamparaRoja').click();
		}
	});
		$('#lamparaPie').keypress(function(e) {
		if (e.which == '13') {
			$('#lamparaPie').click();
		}
	});
		$('#persiana').keypress(function(e) {
		if (e.which == '13') {
			$('#persiana').click();
		}
	});
});

function clickPersiana(){
	if (dispositivos.persiana.state){//la persiana esta true, subida, por lo que
		socket.emit('turnOff',{code:dispositivos.persiana.code});//enviamos mensaje para bajarla
		console.log("Emitido turnOff a: "+dispositivos.persiana.code);
	}else{//si no, es que esta false y enviamos mensaje para subir
		socket.emit('turnOn',{code:dispositivos.persiana.code});
		console.log("Emitido turnOn a: "+dispositivos.persiana.code);
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