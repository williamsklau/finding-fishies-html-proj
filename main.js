function startGame(){
	var canvas = document.getElementById('background');
	var ctx = canvas.getContext('2d');
	var img = document.createElement('img');
	img.src = "fish.png";
	var test;
	// to rotate fish, use img.rotate(angleInRadians) 
	// https://stackoverflow.com/questions/3793397/html5-canvas-drawimage-with-at-an-angle
	ctx.drawImage(img, 100, 100, 840, 230);
}

var level = 4;
var foodcount = level;
var clickX = 0;
var clickY = 0;
let fishList = [];

class fish {
	constructor(id, dir, x, y, endpoint, speed, fed){
		this.id = id;
		this.dir = dir;
		this.x = x;
		this.y = y;
		this.endpoint = endpoint;
		this.speed = speed;
		this.fed = fed;
		console.log('fish created!');
	}

	// feedFish: checks if fish exists where click happens
	feedFish(){
			if(clickX == this.x && clickY == this.y){
				this.fed = 1;
				foodcount--;
				clickY = null;
				clickX = null;

			}
			else
				console.log('no fish here');

			console.log('clickX=' + clickX + ' clickY=' + clickY + 
						' this.x=' + this.x + ' this.y=' + this.y);
	}
}

const fishTest = new fish(1, null, 8, 6, null, null, 0); // for testing
drawFish();

// updates coordinate mouse click
window.addEventListener('click', (event) => {
	console.log(event.clientX, event.clientY); // for testing
	const clickX = event.clientX;
	const clickY = event.clientY;
	fishTest.feedFish();
})
