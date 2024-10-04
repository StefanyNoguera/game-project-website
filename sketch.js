/*

The Game Project 6 - Adding Game Mechanics

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var collectables;
var canyons;
var clouds;
var platforms;
var mountains;
var trees_x;
var treePos_y;
var cameraPosX;
var game_score;
var flagpole;
var lives;
var enemies;
var jumpSound;
var fallSound;
var hasFallenSoundPlayed;
var biteSound;
var bombSound;
var gameOverSound;
var hasGameOverSoundPlayed;


function preload()
{
    soundFormats('mp3', 'wav');

    jumpSound = loadSound('assets/jump.mp3');
    jumpSound.setVolume(0.1);
    fallSound = loadSound('assets/fall.mp3');
    fallSound.setVolume(0.1);
    biteSound = loadSound('assets/bite.mp3');
    biteSound.setVolume(0.1);
    bombSound = loadSound('assets/bomb.mp3');
    bombSound.setVolume(0.1);
    gameOverSound = loadSound('assets/game-over.mp3');
    gameOverSound.setVolume(0.1);
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
  lives = 3;

  startGame();
}

function draw()
{
  cameraPosX = gameChar_x - width / 2;
	background(100,155,255); //blue sky

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //green ground

  push()
  translate(-cameraPosX, 0)

  // mountains
  drawMountains();

  // trees
  drawTrees();

  // clouds
  drawClouds();

  // collectable
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      checkCollectable(collectables[i]);
    }
    drawCollectable(collectables[i]);
  }

	//canyon
  for (var i = 0; i < canyons.length; i++) {
    checkCanyon(canyons[i]);
    drawCanyon(canyons[i]);
  }

  // platforms
  drawPlatform();

  // flagpole
  renderFlagpole();

	//the game character
	if(isLeft && isFalling)
	{
    // character's hair
    fill(0);
    rect(gameChar_x - 12, gameChar_y - 73, 24, 30);

    // character's legs
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x - 5, gameChar_y - 30, gameChar_x - 9, gameChar_y - 12);
    line(gameChar_x + 5, gameChar_y - 30, gameChar_x + 1, gameChar_y - 12);

    // character's right arm
    line(gameChar_x - 15, gameChar_y - 35, gameChar_x - 4, gameChar_y - 45);
    pop();

    // character's body
    fill(139, 0, 0);
    triangle(
      gameChar_x, gameChar_y - 55,
      gameChar_x + 15, gameChar_y - 25,
      gameChar_x - 15, gameChar_y - 25);

    // character's left arm
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 35, gameChar_x + 4, gameChar_y - 45);
    pop();

    // character's head
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 60, 22, 22);

	}
	else if(isRight && isFalling)
	{
    // character's hair
    fill(0);
    rect(gameChar_x - 12, gameChar_y - 73, 24, 30);

    // character's legs
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x - 5, gameChar_y - 30, gameChar_x - 1, gameChar_y - 12);
    line(gameChar_x + 5, gameChar_y - 30, gameChar_x + 9, gameChar_y - 12);

    // character's right arm
    line(gameChar_x + 15, gameChar_y - 35, gameChar_x + 4, gameChar_y - 45);
    pop();

    // character's body
    fill(139, 0, 0);
    triangle(
      gameChar_x, gameChar_y - 55,
      gameChar_x + 15, gameChar_y - 25,
      gameChar_x - 15, gameChar_y - 25);

    // character's left arm
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x + 4, gameChar_y - 35, gameChar_x - 4, gameChar_y - 45);
    pop();

    // character's head
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 60, 22, 22);
	}
	else if(isLeft)
	{
    // character's hair
    fill(0);
    rect(gameChar_x - 12, gameChar_y - 63, 24, 30);

    // character's legs
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x - 5, gameChar_y - 20, gameChar_x - 9, gameChar_y - 2);
    line(gameChar_x + 5, gameChar_y - 20, gameChar_x + 1, gameChar_y - 2);

    // character's right arm
    line(gameChar_x - 15, gameChar_y - 25, gameChar_x - 4, gameChar_y - 35);
    pop();

    // character's body
    fill(139, 0, 0);
    triangle(
      gameChar_x, gameChar_y - 45,
      gameChar_x + 15, gameChar_y - 15,
      gameChar_x - 15, gameChar_y - 15);

    // character's left arm
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x - 4, gameChar_y - 25, gameChar_x + 4, gameChar_y - 35);
    pop();

    // character's head
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 50, 22, 22);

	}
	else if(isRight)
	{
    // character's hair
    fill(0);
    rect(gameChar_x - 12, gameChar_y - 63, 24, 30);

    // character's legs
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x - 5, gameChar_y - 20, gameChar_x - 1, gameChar_y - 2);
    line(gameChar_x + 5, gameChar_y - 20, gameChar_x + 9, gameChar_y - 2);

    // character's right arm
    line(gameChar_x + 15, gameChar_y - 25, gameChar_x + 4, gameChar_y - 35);
    pop();

    // character's body
    fill(139, 0, 0);
    triangle(
      gameChar_x, gameChar_y - 45,
      gameChar_x + 15, gameChar_y - 15,
      gameChar_x - 15, gameChar_y - 15);

    // character's left arm
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x + 4, gameChar_y - 25, gameChar_x - 4, gameChar_y - 35);
    pop();

    // character's head
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 50, 22, 22);
	}
	else if(isFalling || isPlummeting)
	{
    // character's hair
    fill(0);
    rect(gameChar_x - 12, gameChar_y - 73, 24, 30);

    // character's legs
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x - 5, gameChar_y - 30, gameChar_x - 5, gameChar_y - 12);
    line(gameChar_x + 5, gameChar_y - 30, gameChar_x + 5, gameChar_y - 12);

    // character's arms
    line(gameChar_x - 15, gameChar_y - 50, gameChar_x - 4, gameChar_y - 45);
    line(gameChar_x + 15, gameChar_y - 50, gameChar_x + 4, gameChar_y - 45);
    pop();

    // character's body
    fill(139, 0, 0);
    triangle(
      gameChar_x, gameChar_y - 55,
      gameChar_x + 15, gameChar_y - 25,
      gameChar_x - 15, gameChar_y - 25);

    // character's head
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 60, 22, 22);
	}
	else
	{
    // character's hair
    fill(0);
    rect(gameChar_x - 12, gameChar_y - 63, 24, 30);

    // character's legs
    push();
    stroke(222, 184, 135);
    strokeWeight(4);
    line(gameChar_x - 5, gameChar_y - 20, gameChar_x - 5, gameChar_y - 2);
    line(gameChar_x + 5, gameChar_y - 20, gameChar_x + 5, gameChar_y - 2);

    // character's arms
    line(gameChar_x - 15, gameChar_y - 25, gameChar_x - 4, gameChar_y - 35);
    line(gameChar_x + 15, gameChar_y - 25, gameChar_x + 4, gameChar_y - 35);
    pop();

    // character's body
    fill(139, 0, 0);
    triangle(
      gameChar_x, gameChar_y - 45,
      gameChar_x + 15, gameChar_y - 15,
      gameChar_x - 15, gameChar_y - 15);

    // character's head
    fill(222, 184, 135);
    ellipse(gameChar_x, gameChar_y - 50, 22, 22);
	}
  pop();

  if (gameChar_y < floorPos_y) {
    gameChar_y += 3;
    isFalling = true;
  }
  else {
    isFalling = false;
  }

  if (isLeft && isPlummeting == false) {
    gameChar_x -= 5;
  }
  else if (isRight && isPlummeting == false) {
    gameChar_x += 5;
  }

  fill(255);
  noStroke();
  text("Score: " + game_score, 20, 80);

  if (lives < 1) {
    if (!hasGameOverSoundPlayed) {
      gameOverSound.play();
      hasGameOverSoundPlayed = true;
    }
    push();
    textSize(50);
    stroke(0);
    strokeWeight(4);
    fill(255);
    rect(width / 2 - 450, height / 2 - 30, 900, 60);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("Game over. Press space to continue.", width / 2, height / 2);
    pop();
    if (keyCode == 32) {
      lives = 3;
      startGame();
    }
    return;
  }

  if (flagpole.isReached == true) {
    push();
    textSize(50);
    text("Level complete. Press space to continue.", 70, 288);
    pop();
    if (keyCode == 32) {
      startGame();
    }
    return;
  }

  if (flagpole.isReached == false){
    checkFlagpole();
  }

  for (var i = 0; i < enemies.length; i++) {
    push();
    enemies[i].draw();
    pop();
    var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
    console.log(isContact);

    if (isContact) {
      lives--;
      bombSound.play();
      startGame();
    }
  }

  checkPlayerDie();

  for (let i = 0; i < lives; i++) {
    x_pos = 20;
    drawHeart(x_pos + i * 50);
  }

}

function keyPressed()
{
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

  if (keyCode == 65) {
    isLeft = true;
  }
  else if (keyCode == 68) {
    isRight = true;
  }
  else if (keyCode == 87 && isPlummeting == false) {
    if (!isFalling) {
      gameChar_y -= 100;
      jumpSound.play();
    }
  }
}

function keyReleased()
{
	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

  if (keyCode == 65) {
    isLeft = false;
  }
  else if (keyCode == 68) {
    isRight = false;
  }
}

function drawClouds()
{
  for (var i = 0; i < clouds.length; i++)
  {
    let ellipseSize1 = clouds[i].size;
    let ellipseSize2 = clouds[i].size / 1.2;
    let distance2 = clouds[i].size / 3;

    fill(255);
    ellipse(clouds[i].x_pos, clouds[i].y_pos, ellipseSize1, ellipseSize1);
    ellipse(clouds[i].x_pos - distance2, clouds[i].y_pos, ellipseSize2, ellipseSize2);
    ellipse(clouds[i].x_pos + distance2, clouds[i].y_pos, ellipseSize2, ellipseSize2);
  }
}

function drawMountains()
{
  for (var i = 0; i < mountains.length; i++)
  {
    fill(139, 69, 19);
    triangle(
      mountains[i].x_pos - mountains[i].size / 2, mountains[i].y_pos,
      mountains[i].x_pos + mountains[i].size / 2, mountains[i].y_pos,
      mountains[i].x_pos, mountains[i].y_pos - mountains[i].size
    );
    fill(160, 82, 45);
    triangle(
      mountains[i].x_pos, mountains[i].y_pos,
      mountains[i].x_pos + mountains[i].size, mountains[i].y_pos,
      mountains[i].x_pos + mountains[i].size / 2, mountains[i].y_pos - mountains[i].size / 2
    );
    fill(205, 133, 63);
    triangle(
      mountains[i].x_pos - mountains[i].size / 4, mountains[i].y_pos,
      mountains[i].x_pos + mountains[i].size / 2, mountains[i].y_pos,
      mountains[i].x_pos + mountains[i].size / 4, mountains[i].y_pos - mountains[i].size / 3
    );
  }
}

function drawTrees()
{
  for (var i = 0; i < trees_x.length; i++) {
    fill(139, 69, 19);
    rect(trees_x[i], treePos_y, 50, 145);
    fill(0, 155, 0);
    ellipse(trees_x[i] + 25, treePos_y - 12, 100, 100);
    ellipse(trees_x[i] - 15, treePos_y - 42, 100, 100);
    ellipse(trees_x[i] - 15, treePos_y - 82, 100, 100);
    ellipse(trees_x[i] + 25, treePos_y - 112, 100, 100);
    ellipse(trees_x[i] + 65, treePos_y - 82 , 100, 100);
    ellipse(trees_x[i] + 65, treePos_y - 42, 100, 100);
  }
}

function drawCollectable(t_collectable)
{
  if (t_collectable.isFound == false) {
    fill(170, 0, 0);
    ellipse(t_collectable.x_pos - 6, t_collectable.y_pos - 12, t_collectable.size - 22, t_collectable.size - 20);
    ellipse(t_collectable.x_pos + 6, t_collectable.y_pos - 12, t_collectable.size - 22, t_collectable.size - 20);
    fill(147, 81, 22);
    rect(t_collectable.x_pos - 1, t_collectable.y_pos - 35, t_collectable.size - 47, t_collectable.size - 37);
    fill(0, 100, 0);
    triangle(
      t_collectable.x_pos - 16, t_collectable.y_pos - 37,
      t_collectable.x_pos, t_collectable.y_pos - 27,
      t_collectable.x_pos, t_collectable.y_pos - 32);
  }
}

function checkCollectable(t_collectable)
{
  if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size) {
    t_collectable.isFound = true;
    game_score += 1;
    biteSound.play();
    console.log("score: " + game_score);
  }
}

function drawCanyon(t_canyon)
{
  fill(0, 100, 255);
  rect(t_canyon.x_pos, 432, t_canyon.width, 144);
  fill(139, 69, 19);
  rect(t_canyon.x_pos, 432, t_canyon.width / 5, 144);
  fill(139, 69, 19);
  rect(t_canyon.width + t_canyon.x_pos, 432, t_canyon.width / 5, 144);
}

function drawPlatform() {
  for (var i = 0; i < platforms.length; i++) {
    fill(125);
    stroke(100);
    rect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    noFill();
    noStroke();
    checkPlatformContact(platforms[i]);
  }
}

function checkPlatformContact(platform) {
  if (
    gameChar_x > platform.x &&
    gameChar_x < platform.x + platform.width &&
    gameChar_y >= platform.y - 2 &&
    gameChar_y <= platform.y + 10
  ) {
    gameChar_y = platform.y - 2;
    isFalling = false;
    isPlummeting = false;
  }
}

function checkCanyon(t_canyon) {
  if (gameChar_x > t_canyon.x_pos && gameChar_x < t_canyon.x_pos + t_canyon.width && gameChar_y >= floorPos_y) {
    if (!hasFallenSoundPlayed) {
      fallSound.play();
      hasFallenSoundPlayed = true;
    }
    isPlummeting = true;
  }
  if (isPlummeting == true) {
    gameChar_y += 0.5;
  }
}

function renderFlagpole()
{
  push();
  strokeWeight(10);
  stroke(100)
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  noStroke();
  fill(198, 18, 18);
  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 250, 70, 50);
  }
  else
  {
    rect(flagpole.x_pos, floorPos_y - 50, 70, 50);
  }
  pop();
}

function checkFlagpole()
{
  var d = abs(gameChar_x - flagpole.x_pos);
  if (d < 15)
  {
    flagpole.isReached = true;
  }
}

function startGame()
{
  gameChar_x = width/2;
	gameChar_y = floorPos_y;

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  hasFallenSoundPlayed = false;
  hasGameOverSoundPlayed = false;

  cameraPosX = 0;

  trees_x = [150, 500, 950, 1250, 1520, 1800, 2200];
  treePos_y = height/2;

  collectables = [
    {
      x_pos: 100,
      y_pos: floorPos_y,
      size: 50,
      isFound: false
    },
    {
      x_pos: 400,
      y_pos: floorPos_y,
      size: 50,
      isFound: false
    },
    {
      x_pos: 720,
      y_pos: floorPos_y,
      size: 50,
      isFound: false
    },
    {
      x_pos: 880,
      y_pos: floorPos_y,
      size: 50,
      isFound: false},
    {
      x_pos: 1360,
      y_pos: 360,
      size: 50,
      isFound: false
    },
    {
      x_pos: 1300,
      y_pos: floorPos_y,
      size: 50,
      isFound: false
    },
    {
      x_pos: 1500,
      y_pos: floorPos_y,
      size: 50,
      isFound: false
    },
    {
      x_pos: 1890,
      y_pos: floorPos_y,
      size: 50,
      isFound: false},
    {
      x_pos: 1200,
      y_pos: floorPos_y,
      size: 50,
      isFound: false
    },
  ];

  canyons = [
    {x_pos: 200, width: 80},
    {x_pos: 560, width: 130},
    {x_pos: 900, width: 50},
    {x_pos: 1200, width: 80},
    {x_pos: 1900, width: 100},
  ];

  clouds = [
    {
      x_pos: 300,
      y_pos: 100,
      size: 100,
    },
    {
      x_pos: 600,
      y_pos: 110,
      size: 50,
    },
    {
      x_pos: 900,
      y_pos: 150,
      size: 90,
    },
    {
      x_pos: 1300,
      y_pos: 80,
      size: 70,
    },
    {
      x_pos: 1500,
      y_pos: 110,
      size: 50,
    },
    {
      x_pos: 1800,
      y_pos: 150,
      size: 90,
    },
    {
      x_pos: 2000,
      y_pos: 80,
      size: 70,
    },
    {
      x_pos: 2300,
      y_pos: 80,
      size: 70,
    },
    {
      x_pos: 2500,
      y_pos: 110,
      size: 50,
    },
  ];

  mountains = [
    {
      x_pos: 350,
      y_pos: 432,
      size: 200,
    },
    {
      x_pos: 800,
      y_pos: 432,
      size: 250,
    },
    {
      x_pos: 1250,
      y_pos: 432,
      size: 150,
    },
    {
      x_pos: 1700,
      y_pos: 432,
      size: 250,
    },
    {
      x_pos: 2400,
      y_pos: 432,
      size: 150,
    }
  ];

  platforms = [
    {x: 580, y: 360, width: 80, height: 10},
    {x: 1315, y: 360, width: 130, height: 10},
    {x: 1700, y: 360, width: 90, height: 10},
  ];

  game_score = 0;

  flagpole = {isReached: false, x_pos: 2200};

  enemies = [];

  enemies.push(new Enemy(100, floorPos_y - 10, 100));
  enemies.push(new Enemy(800, floorPos_y - 10, 50));
  enemies.push(new Enemy(1300, floorPos_y - 10, 150));
  enemies.push(new Enemy(1700, floorPos_y - 10, 70));
}

function checkPlayerDie()
{
  if (gameChar_y > height) {
    lives -= 1;
    if (lives > 0) {
      startGame();
    }
  }
}

function drawHeart(x_pos)
{
  fill(198, 18, 18);
  ellipse(x_pos + 10, 25, 19, 19);
  ellipse(x_pos + 30, 25, 19, 19);
  triangle(
    x_pos, 25,
    x_pos + 40, 25,
    x_pos + 20, 55
  );
}

function Enemy(x, y, range)
{
  this.x = x;
  this.y = y;
  this.range = range;

  this.currentX = x;
  this.inc = 1;

  this.update = function()
  {
    this.currentX += this.inc;
    if (this.currentX >= this.x + this.range) {
      this.inc = -1;
    } else if (this.currentX < this.x) {
      this.inc = 1;
    }
  }

  this.draw = function() {
    var screenX = this.currentX - cameraPosX;
    this.update();

    fill(50);
    ellipse(screenX, this.y, 30, 30);
    fill(100);
    arc(screenX, this.y, 30, 30, PI, TWO_PI, CHORD);
    stroke(255, 204, 0);
    strokeWeight(2);
    line(screenX, this.y - 15, screenX, this.y - 30);
    stroke(255, 0, 0);
    strokeWeight(4);
    point(screenX, this.y - 30);
  }

  this.checkContact = function(gc_x, gc_y)
  {
    var d = dist(gc_x, gc_y, this.currentX, this.y);
    console.log(d);
    if (d < 13) {
      return true;
    }
    else if (d > 13) {
      return false;
    }
  }
}
