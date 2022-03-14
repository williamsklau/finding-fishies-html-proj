function startGame(){
	var canvas = document.getElementById('background');
	var ctx = canvas.getContext('2d');
	var img = document.createElement('img');
	img.src = "fish.png";
	var test;
	ctx.drawImage(img, 100, 100, 840, 230);
}