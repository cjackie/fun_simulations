var io = require('socket.io');
var HOST = '';

var Socket = function() {
  this.socket = io.connect(HOST);
  this.waiting = true;
  var self = this;
  

  io.on('peerFound', function() {
    self.waiting =false;
  });
};

Socket.prototype.attachToOpponent = function(opponent) {
  
};

Socket.prototype.attachToLocal = function(manager) {
  
};

