var _ = require('underscore');
var raf = require('raf');
var Circle = require('./circle');
var Manager = require('./manager');
var Player = require('./player');
var Connection = require('../util/socket');
var Opponent = require('./opponent');

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
var opponent = new Opponent(canvas);
var conn = new Connection();

//add ten circles
_.each(_.range(10), function createCircles() {
    manager.addCircle(new Circle(canvas));
});

//add palyer
manager.addPlayer(new Player(canvas, 100));

//attach tcp to opponent and manager
conn.attachToOpponent(opponent);
conn.attachToLocal(manager);

//simulation loop
var loop = raf(function tick(){
  if (manager.ended) {
    return;
  }

  if (opponent.ended) {
    return;
  }
  
  opponent.nextFrame();
  manager.nextFrame();
  raf(tick);
});


document.body.appendChild(canvas);

