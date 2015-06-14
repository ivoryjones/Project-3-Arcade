var canvasWidth = 500;

var enemyPosY  = [50, 100, 150, 200, 250];
var enemySpeed = [50, 80, 110, 140, 170];
var numberEnemies = 7;

var collisionProx = 50; // added collision variable


var Score = function () {
  this.win = 1;
  this.lose  = 1;
};

Score.prototype.addWin = function () {
  document.getElementById("win").textContent = (this.win++).toString();
};

var score = new Score();
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.x = 200;
  this.y = enemyPosY[Math.floor(Math.random() * enemyPosY.length)];
  this.speed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
}; //added semicolon

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	  this.x = this.x + (this.speed * dt);
  if (this.x > canvasWidth) {
    this.x = -100;
    this.y = enemyPosY[Math.floor(Math.random() * enemyPosY.length)];
    this.speed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
    if (this.y > 10) {
      this.y = 100;
    }

  }
 if (player.y >= this.y - collisionProx && player.y <= this.y + collisionProx) {
        if (player.x >= this.x - collisionProx && player.x <= this.x + collisionProx) {
        player.reset();
        }
    }
  };


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; //added semicolon

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var playerInitialX = 200;
var playerInitialY = 400;
var playerStepSize = 30;

var Player = function () {
	this.sprite = 'images/char-boy.png';
	this.x = playerInitialX;
	this.y = playerInitialY;
};

Player.prototype.update = function () {
  switch (this.keyPressed) {
  case "up":
    this.y -= playerStepSize;
    break;
  case "right":
    this.x += playerStepSize;
    break;
  case "down":
    this.y += playerStepSize;
    break;
  case "left":
    this.x -= playerStepSize;
    break;
  }

    this.keyPressed = "";

  if (this.y < 0) {
    this.reset();
	score.addWin();
  }

    if (this.x < 0) {
    this.x += playerStepSize;
  }
  if (this.x > canvasWidth - 100) {
    this.x -= playerStepSize;
  }
  if (this.y > playerInitialY - 10) {
    this.y -= playerStepSize;
  }

};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {

  this.keyPressed = key;
};

Player.prototype.collision = function () {
  return !(
      ((this.x.y + this.x.height) < (this.y.y)) ||
      (this.x.y > (this.y.y + this.y.height)) ||
      ((this.x.x + this.x.width) < this.y.x) ||
      (this.x.x > (this.y.x + this.y.width))
  );
};
//add collision detection

Player.prototype.reset = function () {
  this.x = playerInitialX;
  this.y = playerInitialY;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var i = 1;
for (i = 1; i < numberEnemies; i++) {
  enemy = new Enemy();
  allEnemies.push(enemy);
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
