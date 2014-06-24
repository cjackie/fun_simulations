var _ = require('underscore');
var raf = require('raf');
var Circle = require('./circle');
var Manager = require('./manager');
var Player = require('./player');

var HEIGHT = 500;
var WIDTH = 700;
var BACKGROUND_COLOR = '#FFFFFF'; //white

var canvas = document.createElement('canvas');
canvas.setAttribute('height', HEIGHT);
canvas.setAttribute('width', WIDTH);
var context = canvas.getContext('2d');

context.fillStyle = BACKGROUND_COLOR;
context.fillRect(0, 0, WIDTH, HEIGHT);

var manager = new Manager(canvas);

//add ten circles
_.each(_.range(10), function createCircles() {
    manager.addCircle(new Circle(canvas));
});

//add palyer
manager.addPlayer(new Player(canvas, 100));

//simulation loop
var loop = raf(function tick(){
  if (manager.colided()) {
    return;
  }
  manager.nextFrame();
  raf(tick);
});


document.body.appendChild(canvas);

