var Circle = function(context) {
    this.context = context;
    
    this.pos = {};
    this.pos.x = context.width * Math.random();
    this.pos.y = context.height * Math.random();

    this.speed = {};
    this.speed.x = 10 * Math.random();
    this.speed.y = 10 * Math.random();

    this.radius = 10 + 10 * Math.random();
};

Circle.prototype.draw = function() {
    this.context.fillStyle = '#FF54AD';
    this.context.beginPath();
    this.context.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI, true);
    this.context.fill();
};

Circle.prototype.move = function() {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
};


module.exports = Circle;




