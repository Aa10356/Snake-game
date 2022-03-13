var snake, apple;
var appleImage;
var appleSound;
unitTime = 1;
speed = 15;
unitWidth = 25;
var score = 0;
lastTime = 0;
gameState = PLAY

function preload() {
  appleImage = loadImage("apple.png");
  appleSound = loadSound("applebite.mp3");
}

function setup() {
  createCanvas(windowWidth - 5, windowHeight - 5);
  snakeGroup = new Group();
  snake = createSprite(200, 200, unitWidth, unitWidth);
  snake.shapeColor = "green";
  snakeGroup.add(snake);

  appleGroup = new Group();

  edges = createEdgeSprites();
}

function draw() {
  background(30);
  textSize(30);
  text("Score: " + score, 50, 50);

  x = snake.x;
  y = snake.y;

  snakeTouchingItself()

  if (edges.isTouching(snake)) {
    gameOver();
  }
  else {
    if (keyDown("right")) {
      snake.setSpeedAndDirection(5 + score * 2, 0);
    }
    if (keyDown("left")) {
      snake.setSpeedAndDirection(5 + score * 2, 180);
    }
    if (keyDown("up")) {
      snake.setSpeedAndDirection(5 + score * 2, -90);
    }
    if (keyDown("down")) {
      snake.setSpeedAndDirection(5 + score * 2, 90);
    }
  }

  if (World.seconds == lastTime + unitTime) {
    lastTime = World.seconds;

    var s = createSprite(200, 200, unitWidth, unitWidth);
    s.shapeColor = "green";

    snakeGroup.add(s);
  }
  for (var i = snakeGroup.length - 1; i > 0; i--) {
    snakeGroup.get(i).x = snakeGroup.get(i - 1).x;
    snakeGroup.get(i).y = snakeGroup.get(i - 1).y;
    //if (snake.isTouching(snake)) {
    //  gameOver()
    //}
  }
  //unitWidth += .1;
  drawSprites();

  spawnApples();

  for (let i = 0; i < appleGroup.length; i++) {
    if (appleGroup.get(i).isTouching(snake)) {
      appleSound.play();
      score += 1;
      appleGroup.get(i).destroy();
    }
  }
}

function spawnApples() {
  if (frameCount % 60 === 0) {
    apple = createSprite(
      random(0, displayWidth),
      random(0, displayWidth),
      unitWidth,
      unitWidth
    );
    apple.addImage("apple.png", appleImage);
    apple.scale = 0.1;
    apple.lifetime = 400;
    appleGroup.add(apple);
  }
}

function gameOver() {
  snakeGroup.setSpeedAndDirectionEach(0, 0);
  swal({
    title: `Game Over`,
    text: "Oops you hit an edge!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing",
  });
  appleGroup.destroyEach();
}

function snakeTouchingItself() {
  for (var i = snakeGroup.length - 1; i > 0; i--) {
    let part = snakeGroup[i];
    if (part.x == x && part.y == y) {
      gameOver()
    }
  }
}