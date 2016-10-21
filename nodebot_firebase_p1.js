var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: "keys/LegoMusical.json",
  databaseURL: "https://legomusical-80311.firebaseio.com"
});

var scale = require('scale-number-range');

var db = firebase.database();
var ref = db.ref("legomusical");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

var notasRef = ref.child("notas");
var notas={
	0: null,
	1: null,
	2: null,
	3: null,
	4: null,
	5: null,
	6: null
};
notasRef.set(notas);

var five = require("johnny-five"),
  board = new five.Board();

board.on("ready", function() {
	var valor=0;
	//Vamos a leer el sensor conectado a la entrada analógica A0
	var sensors = new five.Sensors([ "A0", "A1", "A2","A3" ]);
	//conectamos nuestra bocina a la salida digital 3
	var piezo = new five.Piezo(3);
	var arValores = [0,0,0,0];
	var arValoresIniciales = [0,0,0,0];
	//
	var indexSecuencia=0;
	//
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
				notas[indexSecuencia]=nota;
			}else{
				notas[indexSecuencia]=null;
			}
			notasRef.set(notas);
  		}
  		indexSecuencia++;
		if(indexSecuencia>4) indexSecuencia=0;

  	},600);  	
});