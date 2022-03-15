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
			this.velocity_x = 0;
			this.velocity_y = 0;
			this.current_x = x;
			this.current_y = y;
			this.set_angle = -angle;
			this.curr_angle = 0;
			this.state = 0; //0 is unfed, 1 is fed 
			this.temp_state = 0;
			console.log("fish here created");
		}
		
		draw(){
			//console.log("draw fish pls");
			//ctx.drawImage(img_normal,this.current_x,this.current_y,this.width,this.height)
			//rotation 
			if(this.set_angle!=this.curr_angle)
			{
				ctx.save();
				ctx.translate(this.current_x,this.current_y);
				ctx.rotate(this.set_angle);
				ctx.translate(-this.current_x,-this.current_y);
				
				this.curr_angle = this.set_angle;
				console.log(this.curr_angle*180/Math.PI);
			}
			ctx.fillRect(this.current_x-this.width/2,this.current_y-this.height/2,this.width,this.height);
			//console.log(this.current_x,this.current_y)
		}
	
		upate(){
			this.current_x = this.current_x + this.velocity_x;
			this.current_y = this.current_y + this.velocity_y;
			//console.log(this.curr_angle);
		}
	
	}
	//const myFish = new fish(100,100,0);
	let Fishs = []
	let Totol_Fish = 5 
	
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