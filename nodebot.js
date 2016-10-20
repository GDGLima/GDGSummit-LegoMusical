var five = require("johnny-five"),
  board = new five.Board();

board.on("ready", function() {
	//
	var arValoresIniciales = [0,0,0,0];
	var arValores = [0,0,0,0];
	var indexSecuencia=0;
	// Creates a piezo object and defines the pin to be used for the signal
	var piezo = new five.Piezo(3);
	var sensors = new five.Sensors([ "A0", "A1", "A2","A3" ]);

	// Injects the piezo into the repl
	/*board.repl.inject({
		piezo: piezo
	});*/

	sensors.scale([0, 30]).on("change", function(sensor) {
		if(arValoresIniciales[sensor.pin]==0) arValoresIniciales[sensor.pin]=Math.round(sensor.value);
		arValores[sensor.pin]=Math.round(sensor.value);
	});

	setInterval(function(){
		/*console.log('arValoresIniciales');
		console.log(arValoresIniciales);*/
		console.log('arValores');
		console.log(arValores);
		if(arValores[indexSecuencia]>arValoresIniciales[indexSecuencia]){
			piezo.frequency((arValores[indexSecuencia]*5)+(140*indexSecuencia), 700);
		}
		indexSecuencia++;
		if(indexSecuencia>3) indexSecuencia=0;
	},1000);

});


