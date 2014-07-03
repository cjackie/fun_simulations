var _ = require('underscore');

var Manager = function(canvas) {
  this.player = null;
  this.circles  = [];
  this.context = canvas.getContext('2d');
  this.canvas = canvas;
  this.ended = false;
  this.win = false;
  this.waiting = true;
  this.gameover = false;
};

Manager.prototype.addCircle = function(circle) {
  this.circles.push(circle);
};

Manager.prototype.addPlayer = function(player) {
  this.player = player;
};

Manager.prototype.nextFrame = function() {
  if (this.waiting) {
    this._waiting();
    return;
  }

  if (this.colided() || this.gameover) {
    this._gameover();
    return;
  }
  
  this._clear();
  this._check();
  _.each(this.circles, function moveCircle(circle) {
    circle.draw();
    circle.move();
  });
  this.player.draw();
};

//check if the player touches a circle
Manager.prototype._colided = function() {
  var circle, deltaX, deltaY, d;
  for (var i = 0; i < this.circles.length; i++) {
    circle = this.circles[i];
    deltaX = circle.pos.x - this.player.pos.x;
    deltaY = circle.pos.y - this.player.pos.y;
    d = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (d < (this.player.radius + circle.radius) ) {
      this.gameover = true;
      this.win = false;
      return true;


    }
  }
  return false;
};

Manager.prototype._gameover = function() {
  if (!this.win) {
    this._clear();
    this.context.fillStyle = 'black';
    this.context.font = '20px monospace';
    this.context.fillText ("you lost", this.canvas.width/2, this.canvas.height/2);
  } else {
    this._clear();
    this.context.fillStyle = 'black';
    this.context.font = '20px monospace';
    this.context.fillText ("you won", this.canvas.width/2, this.canvas.height/2);
  }

  this.ended = true;
};

Manager.prototype._check = function() {
  var self = this;
  _.each(this.circles, function(circle) {
    if (circle.pos.x < 0 || circle.pos.x > self.canvas.width)
      circle.speed.x *= -1;
    if (circle.pos.y < 0 || circle.pos.y > self.canvas.height)
      circle.speed.y *= -1;
  });
};

Manager.prototype._clear = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Manager.prototype._waiting = function() {
  this._clear();
  this.context.fillStyle = 'black';
  this.context.font = '20px monospace';
  this.context.fillText ("waiting", this.canvas.width/2, this.canvas.height/2);  
};

module.exports = Manager;
    
