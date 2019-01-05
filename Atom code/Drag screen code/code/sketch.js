let canvDragX = 0
let canvDragY = 0
let newX = 0
let newY = 0
let oldX = 0
let oldY = 0
var zoom = 1.00;
var zMin = 0.05;
var zMax = 9.00;
var sensativity = 0.05;

// function setup() {
//   createCanvas(200,200)
// }
//
// function draw() {
//   background(110)
//   dragScreen()
//   rect(0,0,50,50)
//   //now do code
// }

function dragScreen(){
  if(!mouseIsPressed){
    oldX = newX
    oldY = newY
    ogX = mouseX
    ogY = mouseY
  }
  else{
    newX = oldX + mouseX - ogX
    newY = oldY + mouseY - ogY
  }
  translate(width/2 + newX, height/2 + newY);
  scale(zoom);
}

function mouseWheel(event) {
  zoom += sensativity * event.delta;
  zoom = constrain(zoom, zMin, zMax);
  //uncomment to block page scrolling
  return false;
}
