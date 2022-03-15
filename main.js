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
		constructor(x,y,angle){
			this.width = 100;
			this.height = 10;
			this.velocity = {x:0.01,y:0.01};
			this.current = {x_pos:x, y_pos:y};
			this.set_angle = -angle;
			this.curr_angle = 0;
			this.state = 0; //0 is unfed, 1 is fed 
			this.temp_state = 0;
			this.target_pos = { x:Math.random()*(canvas.max_x-canvas.min_x)+canvas.min_x, y:Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y};
			ctx.fillRect(this.target_pos.x,this.target_pos.y,50,50);
			console.log("fish here created");
			console.log(this.current.x_pos - this.target_pos.x, this.current.y_pos - this.target_pos.y);
			console.log(this.current.x,this.current.y);
			console.log(this.target_pos.x,this.target_pos.y);
		}
		
		draw(){
			//console.log("draw fish pls");
			//ctx.drawImage(img_normal,this.current_x,this.current_y,this.width,this.height)
			//rotation 
			if(this.set_angle!=this.curr_angle)
			{
				ctx.save();
				ctx.translate(this.current.x_pos,this.current.y_pos);
				ctx.rotate(this.set_angle);
				ctx.translate(-this.current.x_pos,-this.current.y_pos);
				
				this.curr_angle = this.set_angle;
				console.log(this.curr_angle*180/Math.PI);
			}
			ctx.fillRect(this.current.x_pos-this.width/2,this.current.y_pos-this.height/2,this.width,this.height);
			//console.log(this.current_x,this.current_y)
		}
	
		upate(){
			if(this.current.x_pos!=this.target_pos.x||this.current.y_pos!=this.target_pos.y){
				this.current.x_pos = this.current.x_pos + this.velocity.x*(this.target_pos.x-this.current.x_pos);
				this.current.y_pos = this.current.y_pos + this.velocity.y*(this.target_pos.y-this.current.y_pos);
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
	
	function animate(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.restore(); 
		requestAnimationFrame(animate);
		for (var i = 0; i < Totol_Fish; i++) {
			Fishs[i].upate();
			Fishs[i].draw();
			//console.log(Fishs[i].angle);
		}

		//console.log(canvas.width,canvas.height);
	}
	var test;
	//ctx.drawImage(img, 100, 100, 840, 230);
	for (var i = 0; i < Totol_Fish; i++) {
		var x_pos = Math.random()*(canvas.max_x-canvas.min_x)+canvas.min_x;
		var y_pos = Math.random()*(canvas.max_y-canvas.min_y)+canvas.min_y;
		var angle = Math.random()*Math.PI;
		console.log(x_pos,y_pos,angle/Math.PI*180);
		const myFish = new fish(x_pos,y_pos,angle);
		Fishs.push(myFish);
		//myFish.draw();
	}
	// const morefish = new fish(210,100,180/180*Math.PI);
	// morefish.draw();
	//myFish.draw();
	animate();
}