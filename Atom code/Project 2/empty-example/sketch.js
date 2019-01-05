class character{
  constructor(){
    this.pokemon = []
    this.frameCount = 0
    this.name = 'cool dude'
    this.items = ['Potion', 5, 'owo', 69]
    this.box = []
  }
  show(){
    push()
    translate(width/4,height/4)
    fill(100,0,0)
    if(lastDir == 'left'){
      rotate(270)
    }
    if(lastDir == 'right'){
      rotate(90)
    }
    if(lastDir == 'up'){
      rotate(0)
    }
    if(lastDir == 'down'){
      rotate(180)
    }
    ellipse(0,0,10)
    strokeWeight(0.4)
    line(0,0,0,-5)
    pop()
  }
  async caughtAPokemon(pokeName, lvl, hp, sp, at, spat, df, spdf){
    let nameChoose = prompt("Please enter the " + pokeName + "\'s name", pokeName);
    if(this.pokemon.length == 6){
      if (nameChoose == null || nameChoose == "") {
        nameChoose = pokeName
      }
      this.box.push(new characterPokemon(pokeName, pokeName, lvl, hp, sp, at, spat, df, spdf))
      textBox('Put the ' + pokeName + ' in your box.')
      print(this.box)
    }
    else{
      if (nameChoose == null || nameChoose == "") {
        nameChoose = pokeName
        this.pokemon.push(new characterPokemon(pokeName, pokeName, lvl, hp, sp, at, spat, df, spdf))
        canMove = true
      }
      else {
        this.pokemon.push(new characterPokemon(nameChoose, pokeName, lvl, hp, sp, at, spat, df, spdf))
        canMove = true
      }
      print(this.pokemon)
      textBox('You caught a ' + nameChoose + '!')
      menuLevel3.push(nameChoose)
      menuLevel3.push(0)
    }


  }


}


class characterPokemon{
  constructor(name, pokemonName,level, health, speed, attack, specialAttack, defence, specialDefence){
    this.name = name
    this.pokemonName = pokemonName
    this.level = level
    //stats
    this.health = health
    this.speed = speed
    this.attack = attack
    this.specialAttack = specialAttack
    this.defence = defence
    this.specialDefence = specialDefence
    //end stats
  }
  returnName(){
    return this.name
  }



}

let sel
let globalTimer = 0
let x = 4
let y = 5
let tileSize = 16
let numOfTiles = 9
let mapTxt;
let tileSheet;
let borderStyle
let lastDir = ''
let borderType = 1
let randChance = true;
let dirPressed = false;
let canMove = true;
let menuOpen = false;
let canv
let menBord
let speechBord
let zoom = 2
let menuProgress = 1
let cursorPos = 0
let enterPressed = false
let escapePressed = false
let menuLevel1
let menuLevel2
let menuLevel3
let menuLevel4
// let menuLevel5
let menuLevel6
let menuLevel7
let menuLevel8
let textToSay = ''
let textIndex = 0
let textDone = ''
let speechUp = false

function preload() {
  tileSheet = loadImage('tilesheet.png');
  mapTxt = loadStrings('map.txt');
}

function setup() {
  angleMode(DEGREES)
  canv = createCanvas(tileSize * numOfTiles * 2, tileSize * numOfTiles * 2)
  player = new character()
  menuLevel1 = [player.name, 2, 'Pokemon', 3, 'Pokedex', 4, 'Bag', 5, 'Back', 0, 'Settings', 6] //main
  menuLevel2 = ['test', 0] //user
  menuLevel3 = [] //pokemon
  menuLevel4 = [] //pokedex
  menuLevel5 = ['No settings atm', 0] //settings

}

async function draw() {

  if(menuOpen == false ){
    scale(zoom)
  }
  globalTimer++

  if(frameCount % 8 == 0 && menuOpen == false && speechUp == false){
    if (keyIsDown(LEFT_ARROW)) {
      x-=4
      dirPressed = true
      lastDir = 'left'
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      x+=4
      dirPressed = true
      lastDir = 'right'
    }
    else if (keyIsDown(UP_ARROW)) {
      y--;
      dirPressed = true
      lastDir = 'up'
    }
    else if (keyIsDown(DOWN_ARROW)) {
      y++;
      dirPressed = true
      lastDir = 'down'
    }
    mapDraw(x,y,'checkPos')
  }
  if (keyIsDown(ENTER) && enterPressed == false && speechUp == false){
    menuOpen = true
  }
  if (!keyIsDown(ENTER)){
    enterPressed = false
  }

  if (menuOpen == false && speechUp == false){
    zoom = 2
    mapDraw(x,y,'ground1')
    //mapDraw(x,y,'buildings')
    player.show()
  }
  else if(menuOpen){
    if(zoom == 2){
      zoom = 1
      scale(0.5)
    }
    await menu()
  }
  if(speechUp){
    scale(0.5)
    await speech()
  }

  dirPressed = false
}

function mapDraw(x,y, type){
  let mX = -tileSize
  let mY = -tileSize // y + numOfTiles = 'height'

  for(let i = y+1; i < y+numOfTiles+1; i++){ //for each line of the text file from y down 20 (i.e. a 20x20 grid)
    mY += tileSize //20px images
    let arItem = mapTxt[i] //arItem is set to a line of the text file

    for(let l = x; l < (x+numOfTiles) * 4; l+=4){ //for length of line of text file, i want to draw what the number says
      mX += tileSize

      if(mX == width/4 - (tileSize / 2) && //while drawing images, if image is in the center then
         mY == height/4 - (tileSize / 2) &&
         type != 'fin'){ //center of screen
        tileOn(arItem.charAt(l+1), arItem.charAt(l+2), arItem.charAt(l))
      }

      if(type != 'checkPos'){
        numToImg(arItem.charAt(l+1), arItem.charAt(l+2), arItem.charAt(l), mX, mY, type) //runs numToImg with the specified number and position on screen
      }

    }
    mX = -tileSize
  }
}

function numToImg(num, num2, num3, x, y, type){

  pImgX = 595 //pathIMageX
  pImgY = 85 //pathImageY
  num = num+num2
  // print(num)
  if(type == 'ground1'){
    if(num == 'p' + num2 || num3 == 'P' + num2){
      switch(num3){
        case '2':
          pImgY = 136;
          break;
        case '3':
          pImgX = 663;
          break;
        case '4':
          pImgX = 663;
          pImgY = 136;
          break;
        case '5':
          pImgX = 731;
          break;
        case '6':
          pImgX = 731;
          pImgY = 136;
          break;
        case '7':
          pImgX = 799;
          break;
        case '8':
          pImgX = 799;
          pImgY = 136;
          break;
      }
    }
    switch(num){
      case 'vd':
        push()
        fill(0)
        noStroke()
        rect(x,y,16,16)
        pop()
        break;
      case 'g1':
        image(tileSheet, x, y, tileSize+1, tileSize+1, 578, 34, tileSize, tileSize) //grass 1
        break;
      case 'g2':
        image(tileSheet, x, y, tileSize+1, tileSize+1, 578, 51, tileSize, tileSize) //grass 2
        break;
      case 'g3':
        image(tileSheet, x, y, tileSize+1, tileSize+1, 595, 51, tileSize, tileSize) //grass 3
        break;
      case 'g4':
        image(tileSheet, x, y, tileSize+1, tileSize+1, 595, 68, tileSize, tileSize) //grass 4
        break;
      case 'tg':
        image(tileSheet, x, y, tileSize+1, tileSize+1, 595, 34, tileSize, tileSize) //tall grass
        break;
      case 'fl':
        image(tileSheet, x, y, tileSize+1, tileSize+1, 612, 68, tileSize, tileSize) //flowerr
        break;
      case 'p1': //path left
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX, pImgY, tileSize, tileSize) //flowerr
        break;
      case 'p2': //path bottomleft
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX, pImgY + 17, tileSize, tileSize) //flowerr
        break;
      case 'p3': //path right
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 17, pImgY, tileSize, tileSize) //flowerr
        break;
      case 'p4': //path bottomright
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 17, pImgY + 17, tileSize, tileSize) //flowerr
        break;
      case 'p5': //path top
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 34, pImgY, tileSize, tileSize) //flowerr
        break;
      case 'p6': //bath bottom
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 51, pImgY, tileSize, tileSize) //flowerr
        break;
      case 'p7': //path top left
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 34, pImgY + 17, tileSize, tileSize) //flowerr
        break;
      case 'p8': //path top right
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 51, pImgY + 17, tileSize, tileSize) //flowerr
        break;
      case 'p9': //path turn bottom right
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX, pImgY + 34, tileSize, tileSize) //flower
        break;
      case 'P1': //path turn bottom left
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 17, pImgY + 34, tileSize, tileSize) //flowerr
        break;
      case 'P2': //path turn top right
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 34, pImgY + 34, tileSize, tileSize) //flowerr
        break;
      case 'P3': //path turn top left
        image(tileSheet, x, y, tileSize+1, tileSize+1, pImgX + 51, pImgY + 34, tileSize, tileSize)
        break; //flowerr
    }
  }
  else if(type == 'buildings'){
    switch(num){
      case 1:
        image(tileSheet, x, y, tileSize, tileSize, 578, 34, tileSize, tileSize)
        break;
      case 2:
        image(tileSheet, x, y, tileSize, tileSize, 578, 51, tileSize, tileSize)
        break;
      case 3:
        image(tileSheet, x, y, tileSize, tileSize, 595, 51, tileSize, tileSize)
        break;
    }
  }
}

function tileOn(centerNum, centerNum2, centerNum3){
  let centerTile = centerNum + centerNum2
  if(centerTile == 'tg' && dirPressed){ //random chance for battle and just moved
    if(randChance){ //if can enter battle
      if(round(random(20)) == 3){ //if random number is chosen
        push()
        fill(0)
        rect(0,0,width,height)
        pop()
        battle() //start a battle
        randChance = false //cannot enter another battle after this
      }
    }
    else{ //cannot enter battle, randomly see if you can next time
      if(round(random(20)) == 3){ //if random number is chosen
        randChance = true //cannot enter another battle after this
      }
    }
  }
  if((centerTile == 'vd') && lastDir != ''){
    if(lastDir == 'left'){
      x+=4;
      randChance = false
    }
    if(lastDir == 'right'){
      x-=4;
      randChance = false
    }
    if(lastDir == 'up'){
      y++;
      randChance = false
    }
    if(lastDir == 'down'){
      y--;
      randChance = false
    }
  }
}

function battle(){ //do the battle stuff here
  print('battle!')
  player.caughtAPokemon('pikachuuuuuuuuuuuuu', 1, 1, 1, 1, 1, 1, 1)




}

function pokRemoved() {
  removedMon = sel.value();
  if (confirm("Box this Pokemon?")) {
    return true
  }
  else{
    return false
  }
}

async function menu(){
  let tryY
  frameRate(20)
  borderDraw('menu')

  if(menuProgress == 1){
    fill(0)
    textAlign(LEFT);
    let vertPos = 40
    let horzPos = 50
    for(let i = 0; i < menuLevel1.length; i+=2){
      text(menuLevel1[i], horzPos, vertPos)
      if (cursorPos == i/2 + 1 && frameCount % 15 <= 7){
        triangle(horzPos - 5,vertPos - 4,horzPos - 10,vertPos - 9,horzPos - 10,vertPos + 1)
      }
      vertPos += 20
      if(vertPos >= 300){
        horzPos += 50
        vertPos = 40
      }
    }
    if(frameCount % 2 == 0){
      if (keyIsDown(UP_ARROW) && cursorPos >= 1) {
        cursorPos--
      }
      if (keyIsDown(DOWN_ARROW) && cursorPos != 0) {
        cursorPos++
      }
      if(cursorPos == 0){
        if (keyIsDown(UP_ARROW)) {
          cursorPos = menuLevel1.length/2 //max distance
        }
        if (keyIsDown(DOWN_ARROW)) {
          cursorPos = 1
        }
      }
      if(cursorPos == menuLevel1.length/2 + 1){
        cursorPos = 1
      }
    }
    if(keyIsDown(ENTER) && cursorPos != 0){ //do what the key is on
      menuProgress = menuLevel1[cursorPos * 2 - 1]
      cursorPos = 0
      if(menuProgress == 0){
        enterPressed = true
        menuProgress = 1
        frameRate(60)
        zoom = 2
        menuOpen = false
      }
    }} //main
  if(menuProgress == 2){
    fill(0)
    textAlign(LEFT);
    let vertPos = 40
    let horzPos = 50
    for(let i = 0; i < menuLevel2.length; i+=2){
      text(menuLevel2[i], horzPos, vertPos)
      if (cursorPos == i/2 + 1 && frameCount % 15 <= 7){
        triangle(horzPos - 5,vertPos - 4,horzPos - 10,vertPos - 9,horzPos - 10,vertPos + 1)
      }
      vertPos += 20
      if(vertPos >= 300){
        horzPos += 50
        vertPos = 40
      }
    }
    if(frameCount % 2 == 0){
      if (keyIsDown(UP_ARROW) && cursorPos >= 1) {
        cursorPos--
      }
      if (keyIsDown(DOWN_ARROW) && cursorPos != 0) {
        cursorPos++
      }
      if(cursorPos == 0){
        if (keyIsDown(UP_ARROW)) {
          cursorPos = menuLevel2.length/2 //max distance
        }
        if (keyIsDown(DOWN_ARROW)) {
          cursorPos = 1
        }
      }
      if(cursorPos == menuLevel2.length/2 + 1){
        cursorPos = 1
      }
    }
    if(keyIsDown(ENTER) && cursorPos != 0){ //do what the key is on
      menuProgress = menuLevel2[cursorPos * 2 - 1]
      cursorPos = 0
      if(menuProgress == 0){
        enterPressed = true
        menuProgress = 1
        frameRate(60)
        zoom = 2
        menuOpen = false
      }
    }
    if(keyIsDown(ESCAPE)){
      menuProgress = 1
      cursorPos = 1
    }
  } //user info
  if(menuProgress == 3){
    fill(0)
    textAlign(LEFT);
    let vertPos = 40
    let horzPos = 50
    if(menuLevel3.length == 0){
      menuLevel3.push('No pokemon')
      menuLevel3.push(0)
    }
    for(let i = 0; i < menuLevel3.length; i+=2){
      text(menuLevel3[i], horzPos, vertPos)
      if (cursorPos == i/2 + 1 && frameCount % 15 <= 7){
        triangle(horzPos - 5,vertPos - 4,horzPos - 10,vertPos - 9,horzPos - 10,vertPos + 1)
      }
      vertPos += 20
      if(vertPos >= 300){
        horzPos += 50
        vertPos = 40
      }
    }
    if(frameCount % 2 == 0){
      if (keyIsDown(UP_ARROW) && cursorPos >= 1) {
        cursorPos--
      }
      if (keyIsDown(DOWN_ARROW) && cursorPos != 0) {
        cursorPos++
      }
      if(cursorPos == 0){
        if (keyIsDown(UP_ARROW)) {
          cursorPos = menuLevel3.length/2 //max distance
        }
        if (keyIsDown(DOWN_ARROW)) {
          cursorPos = 1
        }
      }
      if(cursorPos == menuLevel3.length/2 + 1){
        cursorPos = 1
      }
    }
    if(keyIsDown(ENTER) && cursorPos != 0){ //do what the key is on
      menuProgress = menuLevel3[cursorPos * 2 - 1]
      cursorPos = 0
      if(menuProgress == 0){
        enterPressed = true
        menuProgress = 1
        frameRate(60)
        zoom = 2
        menuOpen = false
      }
    }
    if(keyIsDown(ESCAPE)){
      if(menuLevel3[0] == 'No pokemon'){
        menuLevel3.splice(0,menuLevel3.length)
      }
      menuProgress = 1
      cursorPos = 2
    }} //pokemon
  if(menuProgress == 4){
    fill(0)
    textAlign(LEFT);
    let vertPos = 40
    let horzPos = 50
    if(menuLevel4.length == 0){
      menuLevel4.push('No pokemon saved')
      menuLevel4.push(0)
    }
    for(let i = 0; i < menuLevel4.length; i+=2){
      text(menuLevel4[i], horzPos, vertPos)
      if (cursorPos == i/2 + 1 && frameCount % 15 <= 7){
        triangle(horzPos - 5,vertPos - 4,horzPos - 10,vertPos - 9,horzPos - 10,vertPos + 1)
      }
      vertPos += 20
      if(vertPos >= 300){
        horzPos += 50
        vertPos = 40
      }
    }
    if(frameCount % 2 == 0){
      if (keyIsDown(UP_ARROW) && cursorPos >= 1) {
        cursorPos--
      }
      if (keyIsDown(DOWN_ARROW) && cursorPos != 0) {
        cursorPos++
      }
      if(cursorPos == 0){
        if (keyIsDown(UP_ARROW)) {
          cursorPos = menuLevel4.length/2 //max distance
        }
        if (keyIsDown(DOWN_ARROW)) {
          cursorPos = 1
        }
      }
      if(cursorPos == menuLevel4.length/2 + 1){
        cursorPos = 1
      }
    }
    if(keyIsDown(ENTER) && cursorPos != 0){ //do what the key is on
      menuProgress = menuLevel4[cursorPos * 2 - 1]
      cursorPos = 0
      if(menuProgress == 0){
        enterPressed = true
        menuProgress = 1
        frameRate(60)
        zoom = 2
        menuOpen = false
      }
    }
    if(keyIsDown(ESCAPE)){
      if(menuLevel4[0] == 'No pokemon saved'){
        menuLevel4.splice(0,menuLevel4.length)
      }
      menuProgress = 1
      cursorPos = 3
    }} //pokedex
  if(menuProgress == 5){
    fill(0)
    textAlign(LEFT);
    let vertPos = 40
    let horzPos = 50
    if(player.items.length == 0){
      player.items.push('No items')
      player.items.push(0)
    }
    for(let i = 0; i < player.items.length; i+=2){
      if(player.items[i+1] != 0){
        text(player.items[i] + ': ' + player.items[i+1], horzPos, vertPos)
      }
      else{
        text(player.items[i], horzPos, vertPos)
      }
      if (cursorPos == i/2 + 1 && frameCount % 15 <= 7){
        triangle(horzPos - 5,vertPos - 4,horzPos - 10,vertPos - 9,horzPos - 10,vertPos + 1)
      }
      vertPos += 20
      if(vertPos >= 300){
        horzPos += 50
        vertPos = 40
      }
    }
    if(frameCount % 2 == 0){
      if (keyIsDown(UP_ARROW) && cursorPos >= 1) {
        cursorPos--
      }
      if (keyIsDown(DOWN_ARROW) && cursorPos != 0) {
        cursorPos++
      }
      if(cursorPos == 0){
        if (keyIsDown(UP_ARROW)) {
          cursorPos = player.items.length/2 //max distance
        }
        if (keyIsDown(DOWN_ARROW)) {
          cursorPos = 1
        }
      }
      if(cursorPos == player.items.length/2 + 1){
        cursorPos = 1
      }
    }
    if(frameCount % 2 == 0){
      if(keyIsDown(ENTER) && cursorPos != 0){
        useItem(cursorPos)
      }
    }
    if(keyIsDown(ESCAPE)){
      if(player.items[0] == 'No items'){
        player.items.splice(0,player.items.length)
      }
      menuProgress = 1
      cursorPos = 4}
    } //Items
  if(menuProgress == 6){
    fill(0)
    textAlign(LEFT);
    let vertPos = 40
    let horzPos = 50
    for(let i = 0; i < menuLevel5.length; i+=2){
      text(menuLevel5[i], horzPos, vertPos)
      if (cursorPos == i/2 + 1 && frameCount % 15 <= 7){
        triangle(horzPos - 5,vertPos - 4,horzPos - 10,vertPos - 9,horzPos - 10,vertPos + 1)
      }
      vertPos += 20
      if(vertPos >= 300){
        horzPos += 50
        vertPos = 40
      }
    }
    if(frameCount % 2 == 0){
      if (keyIsDown(UP_ARROW) && cursorPos >= 1) {
        cursorPos--
      }
      if (keyIsDown(DOWN_ARROW) && cursorPos != 0) {
        cursorPos++
      }
      if(cursorPos == 0){
        if (keyIsDown(UP_ARROW)) {
          cursorPos = menuLevel5.length/2 //max distance
        }
        if (keyIsDown(DOWN_ARROW)) {
          cursorPos = 1
        }
      }
      if(cursorPos == menuLevel5.length/2 + 1){
        cursorPos = 1
      }
    }
    if(keyIsDown(ENTER) && cursorPos != 0){ //do what the key is on
      menuProgress = menuLevel5[cursorPos * 2 - 1]
      cursorPos = 0
      if(menuProgress == 0){
        enterPressed = true
        menuProgress = 1
        frameRate(60)
        zoom = 2
        menuOpen = false
      }
    }
    if(keyIsDown(ESCAPE)){
      menuProgress = 1
      cursorPos = 6
    }} //settings

  if(menuProgress == 7){}
}

async function borderDraw(type){
  push()
  borderType = borderType.toString()
  if(type == 'speech'){
    let top = 200
    fill(200)
    noStroke()
    rect(10,10+top,width-20,68.5)
    loadImage('borders/border' + borderType + '.png', function(borderStyle) {
      let h = top
      for(let i = 10; i <= width; i += 50){ //x
        image(borderStyle, i, h) //draws the top
      }
      h = 278
      for(let i = 10; i <= width; i += 50){ //x
        image(borderStyle, i, h) //draws the bottom
      }
      translate(10,10)
      rotate(90)
      h = 0
      for(let i = top; i <= height; i += 50){ //x
        image(borderStyle, i, h) //draws the left
      }
      rotate(-90)
      translate(-10,0)
      translate(288,10)
      rotate(90)
      for(let i = top-10; i <= height; i += 50){ //x
        image(borderStyle, i, h) //draws the top
      }
      rotate(-90)
      translate(-288,-20)
    });
    loadImage('borders/border' + borderType + 'Corner.png', function(borderCorner) {
      image(borderCorner,0,top) //top left

      push()
      translate(288,top)
      rotate(90)
      image(borderCorner,0,0) //top right
      pop()

      push()
      translate(288,288)
      rotate(180)
      image(borderCorner,0,0) //bottom right
      pop()

      push()
      translate(0,288)
      rotate(270)
      image(borderCorner,0,0) //bottom left
      pop()


    });
  }
  else if(type == 'menu'){
    fill(200)
    rect(9,9,width-19,height-19)
    loadImage('borders/border' + borderType + '.png', function(borderStyle) {
      let h = 0
      for(let i = 10; i <= width; i += 50){ //x
        image(borderStyle, i, h) //draws the top
      }
      h = 278
      for(let i = 10; i <= width; i += 50){ //x
        image(borderStyle, i, h) //draws the bottom
      }
      translate(10,10)
      rotate(90)
      h = 0
      for(let i = 0; i <= height; i += 50){ //x
        image(borderStyle, i, h) //draws the left
      }
      rotate(-90)
      translate(-10,0)
      translate(288,0)
      rotate(90)
      for(let i = 0; i <= height; i += 50){ //x
        image(borderStyle, i, h) //draws the top
      }
      rotate(-90)
      translate(-288,-10)
    });
    loadImage('borders/border' + borderType + 'Corner.png', function(borderCorner) {
      image(borderCorner,0,0) //top left

      push()
      translate(288,0)
      rotate(90)
      image(borderCorner,0,0) //top right
      pop()

      push()
      translate(288,288)
      rotate(180)
      image(borderCorner,0,0) //bottom right
      pop()

      push()
      translate(0,288)
      rotate(270)
      image(borderCorner,0,0) //bottom left
      pop()
    });
  }
  pop()
}

function useItem(cursorPosition){
  let itemUsed = player.items[cursorPos * 2 - 2]
  let itemCount = player.items[cursorPos * 2 - 1] - 1
  if(itemUsed != 'No items'){
    print(itemUsed, 'used', itemCount + 1)
  }
  if(itemCount < 1){
    player.items.splice(cursorPos * 2 - 2, 2)
  }
  else{
    player.items[cursorPos * 2 - 1] --
  }



}

async function speech(){
  await borderDraw('speech')
  if(textIndex == textToSay.length && keyIsDown(ESCAPE) && escapePressed == false){
    enterPressed = true
    speechUp = false
    textIndex = 0
    textDone = ''
    textToSay = ''
    frameRate(60)
  }
  else if(keyIsDown(ESCAPE) && textIndex != textToSay.length){
    escapePressed = true
    textDone = textToSay
    textIndex = textToSay.length
  }
  else if(textIndex != textToSay.length){
    textDone = textDone + textToSay.charAt(textIndex)
    textIndex++
  }

  text(textDone, 20, 220, 200, 300)

  if(!keyIsDown(ESCAPE)){
    escapePressed = false
  }
}

function textBox(textIn){
  frameRate(10)
  reDrawMap()
  textToSay = textIn
  speechUp = true
}

function reDrawMap(){
  mapDraw(x,y,'ground1')

  player.show()
}
