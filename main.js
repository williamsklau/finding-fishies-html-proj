function startGame(){
	let canvas = document.getElementById('background');
	let ctx = canvas.getContext('2d');
	var img = document.createElement('img');
	//const myFish = new fish(100,100,0);
	let Fishs = [];
	let Total_Fish = 5;
	let FoodCount = Total_Fish;
	let fishColor = 'darkblue';
	img.src = "fish.png";
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	canvas.max_x = canvas.width*0.8;
	canvas.min_x = canvas.width*0.1;
	canvas.max_y = canvas.height*0.8;
	canvas.min_y = canvas.height*0.1;
	let score ={current_level:0,accum:0,display:0};
	let animateID;
	let fish_feed = 0;
	
	class fish{
		constructor(id,x,y,r){
			this.id = id;
			this.radius = r;
			this.velocity = {x:0.01,y:0.01};
			this.velocity_base = {x:0.004,y:0.005};
			this.current = {x_pos:x, y_pos:y};
			this.state = 0; //0 is unfed, 1 is fed 
			this.temp_state = 0;
			this.isColliding = 0;
			this.target_pos = { x:Math.random()*(canvas.max_x-canvas.min_x)+canvas.min_x, y:Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y};
			// console.log("ID" + this.id + " created here");
			// console.log(this.current.x_pos - this.target_pos.x, this.current.y_pos - this.target_pos.y);
			// console.log(this.current.x,this.current.y);
			// console.log(this.target_pos.x,this.target_pos.y);
		}
		
		draw(){
			//console.log("draw fish pls");
			ctx.beginPath();
			ctx.arc(this.current.x_pos,this.current.y_pos,this.radius,0,Math.PI*2,false);
			ctx.fillStyle = fishColor;
			ctx.fill();
			//ctx.fillRect(this.current.x_pos-this.width/2,this.current.y_pos-this.height/2,this.width,this.height);
			//console.log(this.current_x,this.current_y)

			// Draw fins
			// calculate base coord
			var angle = Math.atan2((this.target_pos.y - this.current.y_pos), (this.target_pos.x - this.current.x_pos));
			if(angle < 0)	// convert -180<->0 to 180<->360 degrees
				angle += 2*Math.PI;

			//var baseX = this.current.x_pos - this.radis + (-this.radius/2) * Math.cos(angle) - (0) * Math.sin(angle);
			//var baseY = this.current.y_pos + (this.radius/2) * Math.sin(angle) + 0 * Math.cos(angle);
			var baseX = -this.radius * Math.cos(angle) + this.current.x_pos;
			var baseY = -this.radius * Math.sin(angle) + this.current.y_pos;

			// calculate fin1 coord
			// var fin1_angle = angle - 0.05;
			var fin1X = -this.radius * (2*Math.cos(angle) - Math.sin(angle)) + this.current.x_pos;
			var fin1Y = -this.radius * (2*Math.sin(angle) + Math.cos(angle)) + this.current.y_pos;

			// calculate fin2 coord
			var fin2X = -this.radius * (2*Math.cos(angle) + Math.sin(angle)) + this.current.x_pos;
			var fin2Y = -this.radius * (2*Math.sin(angle) - Math.cos(angle)) + this.current.y_pos;
			
			// draw fins
			ctx.strokeStyle = fishColor;
			ctx.lineWidth = 5;
			ctx.beginPath();
			ctx.moveTo(fin1X, fin1Y);
			ctx.lineTo(baseX, baseY);
			ctx.lineTo(fin2X, fin2Y);
			ctx.stroke();
			
			// Print coord besides fishes (for testing)
			ctx.fillText('ID:'+this.id + ' angle:'+ Math.round(angle * 180/Math.PI), this.current.x_pos+40, this.current.y_pos-20);
			ctx.fillText(' current:'+ Math.round(this.current.x_pos)+", "+ Math.round(this.current.y_pos), this.current.x_pos+40, this.current.y_pos-10);
			ctx.fillText(' Fed?:'+ this.state, this.current.x_pos+40, this.current.y_pos);
			ctx.fillText(' tartget:'+ Math.round(this.target_pos.x)+", "+ Math.round(this.target_pos.y), this.current.x_pos+40, this.current.y_pos+10);
			
		
		}
	
		update(){

			this.velocity.x = this.velocity_base.x*(this.target_pos.x-this.current.x_pos);
			this.velocity.y = this.velocity_base.y*(this.target_pos.y-this.current.y_pos);
			// if(this.isColliding){
			// 	this.target_pos.x = Math.random()*(canvas.max_x-canvas.min_x)+canvas.min_x;
			// 	this.target_pos.y = Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y;
			// }
			if(this.target_pos.x>canvas.width){
				this.target_pos.x = canvas.width-this.radius*2;
			}else if(this.target_pos.x<0){
				this.target_pos.x = this.radius*2;
			}
			if(this.target_pos.y>canvas.height){
				this.target_pos.y = canvas.height - this.radius*2;
			}else if(this.target_pos.y<0){
				this.target_pos.y = this.radius*2;
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
			//console.log((1/obj1.velocity_base*10));
		}

		// feedFish: checks if fish exists where click happens
		feedFish(){
			if(clickX <= (this.current.x_pos+this.radius) && 
					clickX >= (this.current.x_pos-this.radius) && 
					clickY <= (this.current.y_pos+this.radius) &&
					clickY >= (this.current.y_pos-this.radius) &&
					FoodCount > 0
				)
			{
				this.state++;
				if(FoodCount > 0)
					FoodCount--;
				// clickY = null;
				// clickX = null;
				console.log('fish ' + this.id + ' fed at ' + clickX + ', ' + clickY + '. Foodcount = ' + FoodCount);
			}
			// else
				console.log('ID: '+this.id+' clickX=' + clickX + ' clickY=' + clickY + ' FishX=' + this.current.x_pos + ' FishY=' + this.current.y_pos);
		}
	
	}

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
				if (circleIntersect(obj1.current.x_pos, obj1.current.y_pos, obj1.radius, obj2.current.x_pos, obj2.current.y_pos, obj2.radius)){
					obj1.isColliding = true;
					obj2.isColliding = true;
					// obj1.target_pos.x = obj1.current.x_pos -obj1.velocity.x*(1/obj1.velocity_base.x*10);
					// obj1.target_pos.y = obj1.current.y_pos -obj1.velocity.y*(1/obj1.velocity_base.y*10);
					// obj2.target_pos.x = obj2.current.x_pos -obj2.velocity.x*(1/obj2.velocity_base.x*10);
					// obj2.target_pos.y = obj2.current.y_pos -obj2.velocity.y*(1/obj2.velocity_base.y*10);
					obj1.target_pos.x = obj1.current.x_pos -obj1.velocity.x*1000;
					obj1.target_pos.y = obj1.current.y_pos -obj1.velocity.y*1000;
					obj2.target_pos.x = obj2.current.x_pos -obj2.velocity.x*1000;
					obj2.target_pos.y = obj2.current.y_pos -obj2.velocity.y*1000;
					//console.log = ("here look");
				}
			}

		}
	}

	function score_update(){
		fish_feed = 0;
		for (var i = 0;i<Fishs.length;i++){
			if(Fishs[i].state){
				fish_feed++;
			}
		}
	}
	
	function draw_all_fish(){
		for (var i = 0; i < Total_Fish; i++) {
			// Spawn fish into its own designated range of X-axis
			var spawn_width = (canvas.max_x - canvas.min_x) / Total_Fish;
			var x_pos = (spawn_width*(i+1)-spawn_width*i)+(spawn_width*i);	
			var y_pos = Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y;
			
			var r = Math.random()*10+10;
			console.log("ID" + i + " at " + Math.round(x_pos) +" , " + Math.round(y_pos));
			const myFish = new fish(i,x_pos,y_pos,20);
			Fishs.push(myFish);
			//myFish.draw();
		}
	}

	function animate(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.restore(); 
		animateID = requestAnimationFrame(animate);
		detectCollisions();
		for (var i = 0; i < Total_Fish; i++) {
			Fishs[i].update();
			Fishs[i].draw();

			//console.log(Fishs[i].current);
		}
		score_update();
		score.current_level = fish_feed*10;
		score.display = score.current_level+score.accum;
		ctx.fillText(' score:'+ score.display, 40, 10);

		//end game
		if(FoodCount==0&&fish_feed!=Total_Fish){
			cancelAnimationFrame(animateID); 
			console.log('end game');
		}
		//move onto next level 
		else if(FoodCount==0&&fish_feed==Total_Fish){
			Total_Fish++;
			score.accum+=score.current_level;
			score.current_level = 0;
			FoodCount = Total_Fish;
			Fishs = [];
			draw_all_fish();
			console.log("next level!");
		}

	}


	//ctx.drawImage(img, 100, 100, 840, 230);
	// const morefish = new fish(210,100,180/180*Math.PI);
	// morefish.draw();
	//myFish.draw();
	draw_all_fish();
	animate();

	// Event checks coord of mouse click
	window.addEventListener('click', (event) => {

		// calibrate click from page to canvas and store values
		var rect = canvas.getBoundingClientRect();
		clickX = event.clientX - rect.left;
		clickY = event.clientY - rect.top;
		
		console.log('CLICK!'); // for testing

		for(var i = 0; i < Total_Fish; i++)
				Fishs[i].feedFish();
	})
}