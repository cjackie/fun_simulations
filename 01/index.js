var _ = require('underscore');

var HEIGHT = null;
var WIDTH = null;
(function() {
  var w = window;
  var d = document;
  var e = d.documentElement;
  var g = d.getElementsByTagName('body')[0];
  WIDTH = w.innerWidth || e.clientWidth || g.clientWidth,
  HEIGHT = w.innerHeight|| e.clientHeight|| g.clientHeight;
})();
var BACKGROUND_COLOR = '#000000'; //black
var FONT_COLOR = '#82B600'; //green
var FONT_SIZE = 22;
if (!HEIGHT || !WIDTH) {
  throw new Error('mising height or width');
}
var SPEED = 60;

var canvas = document.createElement('canvas');
canvas.setAttribute('height', HEIGHT);
canvas.setAttribute('width', WIDTH);
var context = canvas.getContext('2d');

//background
var drawBG = function() {
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, WIDTH, HEIGHT);
};

var randomLine = function() {
  var text = '';
  _.each(_.range(WIDTH * 1.5 / FONT_SIZE), function(i) {
    text += Math.random() > 0.5? 0 : 1;
  });
  return text;
};

var clear = function() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  drawBG();
};

var frame = function(){
  clear();
  _.each(_.range(HEIGHT / FONT_SIZE), function(i) {
    context.fillStyle = FONT_COLOR;
    context.font = FONT_SIZE + 'px Georgia';
    context.fillText(randomLine(), 0, FONT_SIZE * (i+1));
  });
};

var running = true;
var loop = setInterval(frame, SPEED);

document.onclick = function() {
  if (running) {
    clearInterval(loop);
    running = false;
  }
  else {
    loop = setInterval(frame, SPEED);
    running = true;
  }
};

document.body.appendChild(canvas);

