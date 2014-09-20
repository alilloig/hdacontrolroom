
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
	document.getElementById("areaComedor").addEventListener("click", mostrarComedor);
	document.getElementById("areaSalon").addEventListener("click", mostrarSalon);
	document.getElementById("persiana").addEventListener("click", clickPersiana);
	document.getElementById("lamparaPie").addEventListener("click", clickLamparaPie);
	document.getElementById("lamparaRoja").addEventListener("click", clickLamparaRoja);
});

//Funciones asignadas al click en los elementos o en el plano
function mostrarComedor(){
	console.log("Mostrando salon en el controlador");
	$('#salon').hide();
	$('#comedor').show();
	cargarLamparaPie();
	cargarPersiana();
	$( "#persiana" ).attr( "tabindex", "3" );
	$( "#lamparaPie" ).attr( "tabindex", "4" );
	$( "#lamparaRoja" ).removeAttr( "tabindex");
}
function mostrarSalon(){
	console.log("Mostrando comedor en el controlador");
	$('#comedor').hide();
	$('#salon').show();
	cargarLamparaRoja();
	$( "#lamparaRoja" ).attr( "tabindex", "3" );
	$( "#lamparaPie" ).removeAttr( "tabindex");
	$( "#periana" ).removeAttr( "tabindex");
}

//Funciones para cargar los elementos
function cargarLamparaRoja(){
	if (dispositivos.lamparaRoja.state){
		imgLR.src = './img/animaciones/lamparaRoja/8.png';
	}else{
		imgLR.src = './img/animaciones/lamparaRoja/0.png';
	}
	ctxLR = $('#lamparaRoja')[0].getContext('2d');
	ctxLR.drawImage(imgLR,0,0,480,322);
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

function clickPersiana(){
	if (dispositivos.persiana.state){//la persiana esta true, subida, 
		bajarPersiana();
	}else{//si no, es que esta false 
		subirPersiana();
	}
}
function clickLamparaPie(){
	if (dispositivos.lamparaPie.state){//la lampara esta true, encendida,
		apagarLamparaPie();
	}else{//si no, es que esta false 
		encenderLamparaPie();
	}
}
function clickLamparaRoja(){
	if (dispositivos.lamparaRoja.state){//la lampara esta true,
		apagarLamparaRoja();
	}else{//si no, es que esta false y enviamos mensaje para encender
		encenderLamparaRoja();
	}
}



//Funciones para las animaciones
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
