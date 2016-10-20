var five = require("johnny-five"),
  board = new five.Board();

board.on("ready", function() {
	var valor=0;
	//Vamos a leer el sensor conectado a la entrada analógica A0
	var sensor = new five.Sensor("A0");	
	//conectamos nuestra bocina a la salida digital 3
	var piezo = new five.Piezo(3);
	//cuando cambie de valor....
	sensor.on("change", function() {
		//almacenamos
    	valor=this.scaleTo(0, 30);
  	});

  	setInterval(function(){
  		//escuchamos el color
		//piezo.frequency(valor, 1000);
		piezo.frequency(valor*20, 1000);
  	},1000);  	
});