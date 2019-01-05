class Dot{
  constructor(x,y){
    this.x = x
    this.y = y
  }
  show(){
    //noStroke()
    point(this.x,this.y)
  }
  createHalfDot(oX,oY){
    mainAr.push(new Dot(
      lerp(this.x,oX,.5),
      lerp(this.y,oY,.5)
    ))       //returns new [x,y] pos of new dot
    cord = [lerp(this.x,oX,.5), lerp(this.y,oY,.5)]
  }
  setNew(){
    cord = [this.x,this.y]
  }

}

let cord, mainAr = []
let x, y, rand3;
let count = 3

function setup() {
  rectMode(CENTER)
  angleMode(DEGREES)
  createCanvas(1000,1000)
  background(110)           //angle of thing
  for(let i = 0; i < 360; i += 360/count){
    mainAr.push(new Dot(
      (width / 2.5) * cos(i),
      (height / 2.5) * sin(i)))
  }
  for(i = 0; i < mainAr.length; i++){
    mainAr[i].show()
  }
  rand3 = round(random(1,count)) - 1
  mainAr[rand3].setNew() //sets array cord to x and y of point it picks
}

function draw() {
  background(110)

  dragScreen()

  let prevNum = rand3

  if(mainAr.length < 100000 * count){
    for(i = 0; i < 100000 * count; i++){
      // while(rand3 == prevNum){
        rand3 = round(random(1,count)) - 1
      // }
      prevNum = rand3
      mainAr[rand3].createHalfDot(cord[0],cord[1])
    }
  }

  for(i = 0; i < mainAr.length; i++){
    mainAr[i].show()
  }
}
