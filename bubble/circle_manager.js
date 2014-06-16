var _ = require('underscore');

var Manager = function(context) {
    this.circles  = [];
    this.context = context;
};


Manager.prototype.add = function(circle) {
    this.circles.push(circle);
};


Manager.prototype.nextFrame = function() {
    this._clear();
    this._check();
    this.circles.forEach(function moveCircle(circle) {
        circle.draw();
        circle.move();
    });
};


Manager.prototype._check = function() {
    var self = this;
    _.each(this.circles, function(circle) {
        if (circle.pos.x < 0 || circle.pos.x > self.context.width)
            circle.speed.x *= -1;
        if (circle.pos.y < 0 || circle.pos.y > self.context.height)
            circle.speed.y *= -1;
    });
};

Manager.prototype._clear = function() {
    this.context.clearRect(0, 0, this.context.width, this.context.height);
};

module.exports = Manager;
    
