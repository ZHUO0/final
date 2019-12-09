let number = 1000;
let arrVX = new Array(number);
let arrVY = new Array(number);
let arrX = new Array(number);
let arrY = new Array(number);
let arrAX = new Array(number);
let arrAY = new Array(number); 
let magnetism = 10;
let radius = 1;
let deceleration = 0.95;
let lorentz = 0.2;
let start = false;
let isClick = false;
let mx , my;
function setup(){
	createCanvas(windowWidth,windowHeight);
	background(0);
	for(let i = 0; i < number; ++i){
		arrX[i] = random(width);
		arrY[i] = random(height);
		arrVX[i] = 0;
		arrVY[i] = 0;
		arrAX[i] = 0;
		arrAY[i] = 0;
	}
	noStroke();
	drawWindow();
	ellipseMode(RADIUS);
	blendMode(ADD);
	noLoop();
}



function draw(){
	blendMode(ADD);  
	push(); 
	if(!start){
		return ;
	}
	if(!isClick){
		mx = mouseX;
		my = mouseY;
	}
	for(let i = 0; i<number; ++i){
		let distance = dist(mx,my,arrX[i],arrY[i]);
		if(isClick && distance<3){
			arrX[i] = random(width);
			arrY[i] = random(height);
			arrVX[i] = 0;
			arrVY[i] = 0;
			arrAX[i] = 0;
			arrAY[i] = 0;
			continue;
		}
		
		if(isClick || distance>3){
			arrAX[i] = magnetism * (mx - arrX[i]) /(distance * distance);
			arrAY[i] = magnetism * (my - arrY[i]) / (distance * distance);
		}
		
		if(isClick){
			arrAY[i] += arrVX[i] * lorentz;
			arrAX[i] += -arrVY[i] * lorentz;
		}
		
		arrVX[i] += arrAX[i];
		arrVY[i] += arrAY[i];
		
		arrVX[i] *= deceleration;
		arrVY[i] *= deceleration;
		
		arrX[i] += arrVX[i];
		arrY[i] += arrVY[i];
		
		let v = dist(0,0,arrVX[i],arrVY[i]);
		let r = map(v,0,5,0,255);
		let g = map(v,0,5,64,255);
		let b = map(v,0,5,128,255);
		fill(r,g,b,32);
		ellipse(arrX[i],arrY[i],radius,radius);
	}
	pop();
	blendMode(BLEND);
	drawWindow();
}

function begin(){
	start = true;
	push();
	blendMode(DARKEST);
	background(0);
	pop();
	loop();
}

function mouseClicked(){
	if(!isClick){
		isClick = true;
		mx = mouseX;
		my = mouseY;
		begin();
	}
	return false;
}

function drawWindow() {
 
  push();
  fill(230);
  noStroke();
  let edge = 50;
  rect(0, 0, edge, height);
  rect(0, 0, width, edge);
  rect(0, height-edge, width, edge);
  rect(width-edge, 0, edge, height);
  stroke(130, 82, 1);
  noFill();
  strokeWeight(10);
  rect(edge, edge, width-edge*2, height-edge*2);
  line(edge, height/2, width-edge, height/2);
  line(width/2, edge, width/2, height-edge);
  fill(150, 92, 1);
  rect(0+edge/2, height-edge*1.5, width-edge, edge/2);
	pop();
}
