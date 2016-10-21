var scale = require('scale-number-range');
var express = require('express');  
var app = express();  
var server = require('http').Server(app); 
var io = require('socket.io')(server); 

var five = require("johnny-five"),
  board = new five.Board();
var socketIO;
//
app.get('/holamundo', function(req, res) {  
  res.status(200).send("Hola Mundo!");
});
app.use(express.static('public4'));
//socket
io.on('connection', function(socket) {
	socketIO = socket;
	console.log('Alguien se ha conectado');
	socket.emit('saludo', 'Hola Mundo desde el Socket');

	socket.on('saludoDesdeCliente', function(data) {
		console.log(data);
	});
});
//


board.on("ready", function() {
	var valor=0;
	//Vamos a leer el sensor conectado a la entrada analógica A0
	var sensors = new five.Sensors([ "A0", "A1", "A2","A3" ]);
	//conectamos nuestra bocina a la salida digital 3
	var piezo = new five.Piezo(3);
	var arValores = [0,0,0,0];
	var arValoresIniciales = [0,0,0,0];

	var indexSecuencia=0;


	sensors.scale([0, 100]).on("change", function(sensor) {
		if(arValoresIniciales[sensor.pin]==0) arValoresIniciales[sensor.pin]=Math.round(sensor.value);
		arValores[sensor.pin]=Math.round(sensor.value);
	});

  	setInterval(function(){
  		//scaneamos los valores maximos usando el color blanco y usamos ese valor le agregamos 10
  		if(indexSecuencia<4){		
  			var intensidad=( Math.round(scale(arValores[indexSecuencia], 0, 70, 0, 6)) ) ;
  			if(intensidad>6) intensidad=6;
  			if(intensidad<0) intensidad=0;
  			var nota=((intensidad)*7)+indexSecuencia;
  			console.log(nota);
			if(arValores[indexSecuencia]>arValoresIniciales[indexSecuencia]){
				socketIO.emit('playNota', nota);
			}
	  		//piezo.frequency((arValores[indexSecuencia]*5)+(140*indexSecuencia), 700);
  		}
  		indexSecuencia++;
		if(indexSecuencia>4) indexSecuencia=0;

  	},600);  	
});




server.listen(8888, function() {  
  console.log("Servidor corriendo en http://localhost:8888");
});
