var _ = require('underscore');
var raf = require('raf');
var Circle = require('./circle');
var CircleManager = require('./circle_manager');

var HEIGHT = 500;
var WIDTH = 700;
var BACKGROUND_COLOR = '#FFFFFF'; //white

var canvas = document.createElement('canvas');
canvas.setAttribute('height', HEIGHT);
canvas.setAttribute('width', WIDTH);
var context = canvas.getContext('2d');

context.fillStyle = BACKGROUND_COLOR;
context.fillRect(0, 0, WIDTH, HEIGHT);

//prepare circles
var manager = new CircleManager(canvas);
_.each(_.range(10), function createCircles() {
    manager.add(new Circle(canvas));
});

//simulation loop
raf(function tick(){
    manager.nextFrame();
    raf(tick);
});


document.body.appendChild(canvas);

