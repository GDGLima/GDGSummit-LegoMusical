var socket = io.connect('http://localhost:8888', { 'forceNew': true });
var folders=['percusion','guitarraacustica','guitarraelectrica','synthpluck'];

var instrumento=0;

socket.on('saludo', function(data) {  
  //document.getElementById('messages').innerHTML = data;
})

socket.on('playNota', function(nota) {  
	console.log(nota);
  	var audio = new Audio("sound/"+folders[instrumento]+'/'+nota+'.mp3');
	audio.play();
})


socket.emit('saludoDesdeCliente', 'Hola Mundo desde cliente');

var onChange=function(cbo){
	instrumento=cbo.value;
	document.getElementById("imagegif").src="images/i"+instrumento+".gif";
}