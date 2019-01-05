class path{
  constructor(x,y,x2,y2){
    if(x > x2){
      this.x = x2
      this.x2 = x
    }
    else{
      this.x = x
      this.x2 = x2
    }
    if(y > y2){
      this.y = y2
      this.y2 = y
    }
    else{
      this.y = y
      this.y2 = y2
    }
    this.dx
  }
  show(){
    push()
    stroke(0,0,255)
    if(this.lineAngle() == 1){ //v
      line(this.x-10,this.y-10,this.x2-10,this.y2+10)
      line(this.x+10,this.y-10,this.x2+10,this.y2+10)
    }
    else{ //h
      line(this.x-10,this.y-10,this.x2+10,this.y2-10)
      line(this.x-10,this.y+10,this.x2+10,this.y2+10)
    }
    pop()
  }
  getDotPos(){
    if(this.y == this.y2){ //horz
      for(this.dx = 0; this.dx <= (this.x2 - this.x); this.dx+=dotSpacing){
        dotPos.push(new dot(
          this.dx + this.x, this.y)
        )
        print(this.x,this.y,this.dx)
      }
    }
    else{ //vert
      for(this.dx = 0; this.dx <= (this.y2-this.y); this.dx+=dotSpacing){
        dotPos.push(new dot(
          this.x, this.dx + this.y) //0,40 0,60 0,80
        )
      }
    }


  }

  getLinePosition(){
    lineInfo = [this.x,this.y,this.x2,this.y2]
  }
  lineAngle(){
    if(this.y == this.y2){
      return 2 //horizontal line
    }
    else{
      return 1 //vertical line
    }
  }


}
class dot{
  constructor(x,y){
    this.x = x
    this.y = y
    this.delete = false
  }
  show(){
    ellipse(this.x,this.y,5)
    if (dist(player.x,player.y,this.x,this.y) < 5) {
      this.delete = true
    }
  }
}
class pacMac{
  constructor(){
    this.x = width/2
    this.y = height/2
    this.speedX = 0
    this.speedY = 0
    this.lastInput = 0
    this.currentInput = 0
    this.tester = false
  }
  show(){
    push()
    fill(250,200,0)
    noStroke()
    ellipse(this.x,this.y,10)
    pop()
    //collosion checking

    // this.nextXPosition = this.x + this.speedX
    // this.nextYPosition = this.y + this.speedY
    this.tester = false
    for(let i = 0; i < pathAr.length; i++){

      pathAr[i].getLinePosition()

      if(//last input matches with line direction
        (  pathAr[i].lineAngle() == 1 && (this.lastInput == 1 || this.lastInput == 2) && this.x == lineInfo[0] && this.y >= lineInfo[1] && this.y <= lineInfo[3]) || //line is vertical and not moving left or right AND player on line
        (  pathAr[i].lineAngle() == 2 && (this.lastInput == 3 || this.lastInput == 4) && this.y == lineInfo[1] && this.x >= lineInfo[0] && this.x <= lineInfo[2])
      ){
        this.tester = true
        this.currentInput = this.lastInput //set new direction
        this.lastInput = 0 //set lastInput to none
        if(this.currentInput == 1 || this.currentInput == 2){ //up or down
          this.speedX = 0
        }
        else if(this.currentInput == 3 || this.currentInput == 4){ //left or right
          this.speedY = 0

        }
      }

      if(//if current direction matches with line direction
        (  pathAr[i].lineAngle() == 1 && (this.currentInput == 1 || this.currentInput == 2) && this.x == lineInfo[0] && this.y >= lineInfo[1] && this.y <= lineInfo[3]   ) || //line is vertical and not moving left or right AND player on line
           (  pathAr[i].lineAngle() == 2 && (this.currentInput == 3 || this.currentInput == 4) && this.y == lineInfo[1] && this.x >= lineInfo[0] && this.x <= lineInfo[2]   )
      ){
        this.tester = true
      }

    }
    if(this.tester == false){
      this.currentInput = 0
      this.lastInput = 0
      this.x -= this.speedX //move back
      this.y -= this.speedY //move back
      this.speedX = 0 //stop moving
      this.speedY = 0 //stop moving
    }
    this.x += this.speedX
    this.y += this.speedY

  }

  moving(){
    if(this.currentInput == 1){
      this.speedX = 0
      this.speedY = -playerSpeed
    }
    else if (this.currentInput == 2) {
      this.speedX = 0
      this.speedY = playerSpeed
    }
    else if (this.currentInput == 3) {
      this.speedX = -playerSpeed
      this.speedY = 0
    }
    else if (this.currentInput == 4) {
      this.speedX = playerSpeed
      this.speedY = 0
    }
  }

  inputCheck(){
    if(keyCode == 119){
      this.lastInput = 1 //up
    }
    else if(keyCode == 115){
      this.lastInput = 2 //down
    }
    else if (keyCode == 97) {
      this.lastInput = 3 //left
    }
    else if (keyCode == 100) {
      this.lastInput = 4 //right
    }
    // 119 = w
    // 97 = a
    // 115 = s
    // 100 = d
  }
}

let lineInfo = []
let dotPos = []
let dotSpacing = 10
let pathAr = []
let player
let playerSpeed = 1

function setup() {
  createCanvas(400,400)

  pathAr.push(new path(40,40,220,40))
  pathAr.push(new path(80,0,80,120))
  pathAr.push(new path(200,150,200,250))
  pathAr.push(new path(150,200,250,200))
  pathAr.push(new path(150,250,150,40))

  player = new pacMac()

  for(i = 0; i < pathAr.length; i++){
    pathAr[i].getDotPos()
  }
}

function draw() {
  background(0)
  for (let i = 0; i < pathAr.length; i++){
    pathAr[i].show()
  }
  for (let i = dotPos.length - 1; i >= 0; i--) {
    dotPos[i].show();
    if(dotPos[i].delete == true){
      dotPos.splice(i,1)
    }
  }
  player.show()
  player.moving()
  player.inputCheck()
}
