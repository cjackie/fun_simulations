var Circle = require('../circle');

var HEIGHT = 500;
var WIDTH = 700;
var BACKGROUND_COLOR = '#FFFFFF'; //white                                                                                                       

var canvas = document.createElement('canvas');
canvas.setAttribute('height', HEIGHT);
canvas.setAttribute('width', WIDTH);
var context = canvas.getContext('2d');

context.height = HEIGHT;
context.width = WIDTH;

var circle = new Circle(context);
circle.draw();
setTimeout(function next() {
    circle.move();circle.move();circle.move();circle.move();
},2000);
    
document.body.appendChild(canvas);
