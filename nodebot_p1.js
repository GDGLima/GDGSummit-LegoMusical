var five = require("johnny-five"),
  board = new five.Board();

board.on("ready", function() {
	console.log('Hola Mundo');
});