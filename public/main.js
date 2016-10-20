var socket = io.connect('http://localhost:8888', { 'forceNew': true });
var audio = new Audio('piano.mp3');




socket.on('messages', function(data) {  
  console.log(data);
  render(data);
  //audio.play();
  audio.currentTime=(Math.round(Math.random()*140));
  audio.play();
  
})



function render (data) {  
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}



function addMessage(e) {  
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}