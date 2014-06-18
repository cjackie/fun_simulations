var Player = function(canvas, health) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');

  this.health = health;

  this.pos = {};
  this.pos.x = canvas.width / 2.0;
  this.pos.y = canvas.height / 2.0;

  var self = this;
  this.canvas.addEventListener('mousemove', function(event) {
    self.pos.x = event.clientX;
    self.pos.y = event.clientY;
  });
};


Player.prototype.substractHealth = function(num) {
  if (this.health - num < 0) this.health  = 0;
  else this.health -= num;
};


Player.prototype.draw = function(){
  var radius = 15;
  
  this.context.fillStyle = '#4D24A4';
  this.context.beginPath();
  this.context.arc(this.pos.x, this.pos.y, 15, 0, Math.PI*2, true);
  this.context.fill();
};


module.exports = Player;

  
