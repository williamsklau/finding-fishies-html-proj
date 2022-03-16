function startGame(){
	let canvas = document.getElementById('background');
	let ctx = canvas.getContext('2d');
	var img = document.createElement('img');
	img.src = "fish.png";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.max_x = canvas.width*0.8;
	canvas.min_x = canvas.width*0.1;
	canvas.max_y = canvas.height*0.8;
	canvas.min_y = canvas.height*0.1;
	
	class fish{
		constructor(x,y,r){
			this.radis = r;
			this.velocity = {x:0.01,y:0.01};
			this.velocity_base = {x:0.01,y:0.01};
			this.current = {x_pos:x, y_pos:y};
			this.state = 0; //0 is unfed, 1 is fed 
			this.temp_state = 0;
			this.isColliding = 0;
			this.target_pos = { x:Math.random()*(canvas.max_x-canvas.min_x)+canvas.min_x, y:Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y};
			console.log("fish here created");
			console.log(this.current.x_pos - this.target_pos.x, this.current.y_pos - this.target_pos.y);
			console.log(this.current.x,this.current.y);
			console.log(this.target_pos.x,this.target_pos.y);
		}
		
		draw(){
			//console.log("draw fish pls");
			ctx.beginPath();
			ctx.arc(this.current.x_pos,this.current.y_pos,this.radis,0,Math.PI*2,false);
			ctx.fillStyle = 'blue';
			ctx.fill();
			//ctx.fillRect(this.current.x_pos-this.width/2,this.current.y_pos-this.height/2,this.width,this.height);
			//console.log(this.current_x,this.current_y)
		}
	
		upate(){

			this.velocity.x = this.velocity_base.x*(this.target_pos.x-this.current.x_pos);
			this.velocity.y = this.velocity_base.y*(this.target_pos.y-this.current.y_pos);
			// if(this.isColliding){
			// 	this.target_pos.x = Math.random()*(canvas.max_x-canvas.min_x)+canvas.min_x;
			// 	this.target_pos.y = Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y;
			// }
			if(this.target_pos.x>canvas.width){
				this.target_pos.x = canvas.width-this.radis*2;
			}else if(this.target_pos.x<0){
				this.target_pos.x = this.radis*2;
			}
			if(this.target_pos.y>canvas.height){
				this.target_pos.y = canvas.height - this.radis*2;
			}else if(this.target_pos.y<0){
				this.target_pos.y = this.radis*2;
			}
			if(this.current.x_pos!=this.target_pos.x||this.current.y_pos!=this.target_pos.y){
				// this.current.x_pos = this.current.x_pos + this.velocity.x*(this.target_pos.x-this.current.x_pos);
				// this.current.y_pos = this.current.y_pos + this.velocity.y*(this.target_pos.y-this.current.y_pos);
				this.current.x_pos = this.current.x_pos + this.velocity.x;
				this.current.y_pos = this.current.y_pos + this.velocity.y;
				// console.log(this.current.x_pos - this.target_pos.x);
				// console.log(this.current.y_pos - this.target_pos.y);
			}
			if((this.current.x_pos-this.target_pos.x)<10&&(this.current.x_pos-this.target_pos.x)>-10){
				this.target_pos.x = Math.random()*(canvas.max_x-canvas.min_x)+canvas.min_x;
			}
			if((this.current.y_pos-this.target_pos.y)<10&&(this.current.y_pos-this.target_pos.y)>-10){
				this.target_pos.y = Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y;
			}
			//if(this.current_x!=this.target_pos.x)
			//console.log(this.curr_angle);
		}
	
	}
	//const myFish = new fish(100,100,0);
	let Fishs = []
	let Totol_Fish = 10 

	//refence to https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
	function circleIntersect(x1, y1, r1, x2, y2, r2) {

		// Calculate the distance between the two circles
		let squareDistance = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2);
	
		// When the distance is smaller or equal to the sum
		// of the two radius, the circles touch or overlap
		return squareDistance <= ((r1 + r2) * (r1 + r2))
	}

	function detectCollisions(){
		let obj1;
		let obj2;
		// console.log("fish here created");
		// console.log("here");
		// Reset collision state of all objects
		for (let i = 0; i < Fishs.length; i++) {
			Fishs[i].isColliding = false;
		}
	
		// Start checking for collisions
		for (let i = 0; i < Fishs.length; i++){
			obj1 = Fishs[i];
			for (let j = i + 1; j < Fishs.length; j++){
				obj2 = Fishs[j];
				// Compare object1 with object2
				if (circleIntersect(obj1.current.x_pos, obj1.current.y_pos, obj1.radis, obj2.current.x_pos, obj2.current.y_pos, obj2.radis)){
					obj1.isColliding = true;
					obj2.isColliding = true;
					// let vCollision = {x: obj2.current.x_pos - obj1.current.x_pos, y: obj2.current.y_pos - obj1.current.y_pos};
					// let distance = Math.sqrt((obj2.current.x_pos-obj1.current.x_pos)*(obj2.current.x_pos-obj1.current.x_pos) + (obj2.current.y_pos-obj1.current.y_pos)*(obj2.current.y_pos-obj1.current.y_pos));
					// let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
					// let vRelativeVelocity = {x: obj1.velocity.x - obj2.velocity.x, y: obj1.velocity.y - obj2.velocity.y};
					// let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
					// obj1.velocity.x -= (speed * vCollisionNorm.x);
					// obj1.velocity.y -= (speed * vCollisionNorm.y);
					// obj2.velocity.x += (speed * vCollisionNorm.x);
					// obj2.velocity.y += (speed * vCollisionNorm.y);
					obj1.target_pos.x = obj1.current.x_pos -obj1.velocity.x*100;
					obj1.target_pos.y = obj1.current.y_pos -obj1.velocity.y*100;
					obj2.target_pos.x = obj2.current.x_pos -obj2.velocity.x*100;
					obj2.target_pos.y = obj2.current.y_pos -obj2.velocity.y*100;
					//console.log = ("here look");
				}
			}

		}
	}
	
	function animate(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.restore(); 
		requestAnimationFrame(animate);
		detectCollisions();
		for (var i = 0; i < Totol_Fish; i++) {
			Fishs[i].upate();
			Fishs[i].draw();

			//console.log(Fishs[i].current);
		}

		//console.log(canvas.width,canvas.height);
	}
	var test;
	//ctx.drawImage(img, 100, 100, 840, 230);
	for (var i = 0; i < Totol_Fish; i++) {
		var x_pos = Math.random()*(canvas.max_x-canvas.min_x)+canvas.min_x;
		var y_pos = Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y;
		var r = Math.random()*10+10;
		//console.log(x_pos,y_pos,r);
		const myFish = new fish(x_pos,y_pos,20);
		Fishs.push(myFish);
		//myFish.draw();
	}
	// const morefish = new fish(210,100,180/180*Math.PI);
	// morefish.draw();
	//myFish.draw();
	animate();
}