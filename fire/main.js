var config = {
	apiKey: "AIzaSyDzDgpMnj8j-0tzn2s2dev8nVXEMlA563Y",
	authDomain: "legomusical-80311.firebaseapp.com",
	databaseURL: "https://legomusical-80311.firebaseio.com"
};
firebase.initializeApp(config);

var notas;
var folders=['percusion','guitarraacustica','guitarraelectrica','synthpluck'];

var notasRef = firebase.database().ref("legomusical/notas");
notasRef.on("value", function(snapshot) {
  notas=(snapshot.val());
  console.log(notas);
});


//
var nota=0;
setInterval(function(){
	console.log(nota);
	if(notas && notas[nota]!=null){
		var audio = new Audio("sound/"+folders[instrumento]+'/'+notas[nota]+'.mp3');
		audio.play();
	}
	nota++;
	if(nota>3) nota=0;
},700);
//
var instrumento=0;
var onChange=function(cbo){
	instrumento=cbo.value;
	document.getElementById("imagegif").src="images/i"+instrumento+".gif";
}