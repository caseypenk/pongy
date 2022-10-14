let ballX = 300 // ball's x position
let ballY = 300 // ball's y position
let p1x = 80 // player 1's x position
let p1y = 250 // player 1's y position
let p2x = 500 // player 2's x position
let p2y = 250 // player 2's y position
let p1points = 0 // player 1's points
let p2points = 0 // player 2's points
let p2speed = 0.75 // how fast player 2 (AI) moves towards ball
let velocityX = 1 // x component of the velocity vector (negative is left, positive is right)
let velocityY = 0 // y component of the velocity vector (negative is up, positive is down)

function setup() {
  background("black")
  createCanvas(600, 600);
  mouseY = 250
}

function draw() {
  background(0, 10);
  for (let i = 0; i < 5; i++) {
  
  noStroke()
  p1y = mouseY - 50
  if (p2y + 50 < ballY) p2y+= p2speed
  if (p2y + 50 > ballY) p2y-= p2speed
  ellipseMode(CORNER)
  drawBall()
  drawPlayers()
  moveBall()
  checkHitBall()
  goal()
  checkPlayer2Bounds()
  checkBounceBall()
  displayPoints()
  displayTitle()
  textSize(20)
  }
}

function drawBall() {
  textSize(60)
  circle(ballX, ballY, 20)
}

function drawPlayers() {
  rect(p1x, p1y, 20, 100) // draw player 1
  rect(p2x, p2y, 20, 100) // draw player 2
}

// move the ball's location based on its velocity
function moveBall() {
  ballX += velocityX
  ballY += velocityY
}

// check if the ball hits one of the players
function checkHitBall() {
  if (ballX == 100 && ballY >= p1y - 20 && ballY <= p1y + 100) {
    velocityX = -velocityX
    velocityY += random([-1, 1])
  }
  
  if (ballX == 480 && ballY >= p2y - 20 && ballY <= p2y + 100) {
    velocityX = -velocityX
    velocityY += random([-1, 1])
  }
}

// check if ball bounces on the top or bottom of the screen
function checkBounceBall() {
  if (ballY <= 0 || ballY >= height - 20) { // check if hitting the top or bottom of the canvas
    velocityY = -velocityY // bounce off the top or bottom of the canvas
  }
}

// keep player 2 within bounds
function checkPlayer2Bounds() {
  if (p2y < 0) {
    p2y = 0
  }
  if (p2y > height) {
    p2y = height - 0.01
  }
}

// one of the players scores a goal
function goal() {
  if (ballX < -20) {
    p2points++
    resetBall()
  }
  
  if (ballX > width) {
    p1points++
    resetBall()
  }
}

// place the ball back in the center-middle and reset its velocity
function resetBall() {
  velocityX = random([-1,1]) // reset velocity
  velocityY = 0 // reset velocity
  ballX = width / 2
  ballY = height / 2
  background("black")
}

// show each player's points
function displayPoints() {
  fill("white")
  textSize(50)
  text(p1points, width/4, 100)
  text(p2points, width*3/4, 100)
}

// show the title screen
function displayTitle() {
  if (frameCount < 90) {
    textSize(20)
    textAlign(LEFT)
    textFont("monospace")
    text("PPPPP OOOOO NNN N GGGGGG YY YY", width / 4 - 30, height / 2 - 100)
    text("PPPPP OOOOO NNN N GGGGGG YY YY", width / 4 - 30, height / 2 - 80)
    text("PP PP OO OO NNN N GG  GG YY YY", width / 4 - 30, height / 2 - 60)
    text("PP PP OO OO NNN N GG  GG YY YY", width / 4 - 30, height / 2 - 40)
    text("PPPPP OO OO NNN N GG     YY YY", width / 4 - 30, height / 2 - 20)
    text("PPPPP OO OO NNNNN GG GGG YY YY", width / 4 - 30, height / 2)
    text("PP    OO OO N NNN GG GGG  YYY ", width / 4 - 30, height / 2 + 20)
    text("PP    OO OO N NNN GG  GG  YYY ", width / 4 - 30, height / 2 + 40)
    text("PP    OO OO N NNN GG  GG  YYY ", width / 4 - 30, height / 2 + 60)
    text("PP    OOOOO N NNN GGGGGG  YYY ", width / 4 - 30, height / 2 + 80)
    text("PP    OOOOO N NNN GGGGGG  YYY ", width / 4 - 30, height / 2 + 100)
  } else if (frameCount == 90) {
    background("black")
    /* middle dividing line
    for (let i = 0; i < 100; i++) {
      rectMode(CENTER)
    rect(width / 2, i * 40, 20, 20)
      rectMode(CORNER)
    } */ 
  }
}
