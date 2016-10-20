var socket = io.connect('http://localhost:8888', { 'forceNew': true });
var audio = new Audio('piano.mp3');


socket.on('saludo', function(data) {  
  document.getElementById('messages').innerHTML = data;
})

socket.on('playNota', function(nota) {  
	console.log(nota);
  	audio.currentTime=nota;
  	audio.play();
  	setTimeout(function(){
  		audio.pause();
  	},900);
})


socket.emit('saludoDesdeCliente', 'Hola Mundo desde cliente');
