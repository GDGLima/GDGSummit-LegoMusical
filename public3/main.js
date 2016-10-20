var socket = io.connect('http://localhost:8888', { 'forceNew': true });


socket.on('saludo', function(data) {  
  document.getElementById('messages').innerHTML = data;
})

socket.emit('saludoDesdeCliente', 'Hola Mundo desde cliente');