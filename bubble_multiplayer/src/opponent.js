var _ = require('underscore');

var Opponent = function(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext('2d');

  this.circles = [];
  this.gameover = false;
  this.win = false;
  this.ended = false;
  this.waiting = true;
  this.player = null;
};

Opponent.prototype.nextFrame = function() {
  if (this.waiting) {
    this._waiting();
    return;
  }

  if (this.gameover){
    this._gameover();
    return;
  }

  //show next frame
  this._clear();
  //draw circles
  _.each(this.circles, function moveCircle(circle) {
    this.context.fillStyle = '#FF54AD';
    this.context.beginPath();
    this.context.arc(circle.pos.x, circle.pos.y, circle.radius, 0, 2*Math.PI, true);
    this.context.fill();
  });

  //draw player
  this.context.fillStyle = '#4D24A4';
  this.context.beginPath();
  this.context.arc(this.player.pos.x, this.player.pos.y, this.player.radius, 0, Math.PI*2, true);
  this.context.fill();
};

Opponent.prototype._clear = function() {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Opponent.prototype._waiting = function() {
  this._clear();
  this.context.fillStyle = 'black';
  this.context.font = '20px monospace';
  this.context.fillText ("waiting", this.canvas.width/2, this.canvas.height/2);  
};

Opponent.prototype._gameover = function() {
  if (this.win) {
    this._clear();
    this.context.fillStyle = 'black';
    this.context.font = '20px monospace';
    this.context.fillText ("opponent won", this.canvas.width/2, this.canvas.height/2);
  } else {
    this._clear();
    this.context.fillStyle = 'black';
    this.context.font = '20px monospace';
    this.context.fillText ("opponent lost", this.canvas.width/2, this.canvas.height/2);
  }
  this.ended = true;
};

