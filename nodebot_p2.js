var five = require("johnny-five"),
  board = new five.Board();

board.on("ready", function() {
	//Vamos a leer el sensor conectado a la entrada analógica A0
	var sensor = new five.Sensor("A0");	
	//cuando cambie de valor....
	sensor.on("change", function() {
    	//console.log(this.value);
    	console.log(this.scaleTo(0, 30));
  	});  	
});