var _ = require('underscore');

var Manager = function(canvas) {
  this.player = null;
  this.circles  = [];
  this.context = canvas.getContext('2d');
  this.canvas = canvas;
};

Manager.prototype.addCircle = function(circle) {
  this.circles.push(circle);
};

Manager.prototype.addPlayer = function(player) {
  this.player = player;
};

Manager.prototype.nextFrame = function() {
  this._clear();
  this._check();
  _.each(this.circles, function moveCircle(circle) {
    circle.draw();
    circle.move();
  });
  this.player.draw();
};

//check if the player touches a circle
Manager.prototype.colided = function() {
  var circle, deltaX, deltaY, d;
  for (var i = 0; i < this.circles.length; i++) {
    circle = this.circles[i];
    deltaX = circle.pos.x - this.player.pos.x;
    deltaY = circle.pos.y - this.player.pos.y;
    d = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (d < (this.player.radius + circle.radius) ) return true;
  }
  return false;
};

Manager.prototype.gameover = function() {
  this._clear();
  this.context.fillStyle = 'black';
  this.context.font = '20px monospace';
  this.context.fillText ("game over", this.canvas.width/2, this.canvas.height/2);
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

module.exports = Manager;
    
