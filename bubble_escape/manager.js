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
    
