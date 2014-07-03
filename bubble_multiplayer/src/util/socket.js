var io = require('socket.io');
var _ = require('underscore');
var HOST = '';

var Socket = function() {
  this.socket = io.connect(HOST);
  this.waiting = true;
  var self = this;
  
  this.socket.on('peerFound', function() {
    self.waiting = false;
  });
};

Socket.prototype.attachToOpponent = function(opponent) {
  //scope
  var self = this;
  
  function setupConnection() {
    opponent.waiting = false;

    //get data for opponent
    self.socket('data from server', function(data) {
      opponent.player = data.player;
      opponent.circles = data.circles;
    });

    self.socket('lost', function(data) {
      if (data) {
        opponent.gameover = true;
        opponent.win = false;
      }
    });
  }
  
  if (self.waiting) {
    //waiting for connection
    var loop = setinterval(function() {
      if (!self.waiting) {
        setupConnection();
        clearInterval(loop);
      }
    }, 500);
  } else {
    setupConnection();
  }
  
};

Socket.prototype.attachToLocal = function(manager) {
  //scope
  var self = this;

  function setupConnection() {
    manager.waiting = false;
    var nextFrame = manager.nextFrame;

    manager.nextFrame = function() {
      //prepare data
      var circles = _.map(manager.circles, function(c) {
        return {
          'pos': { 'x': c.pos.x, 'y': c.pos.y },
          'radius': c.radius
        };
      });

      var player = {
        'pos': { 'x': manager.player.pos.x, 'y': manager.player.pos.x },
        'radius': manager.player.radius
      };

      var data = {
        'circles': circles,
        'player': player
      };

      //send data
      self.socket.emit('data from client', data);

      //call original nextFrame
      nextFrame.call(manager);
    };


    var colided = manager._colided;
    manager._colided = function() {
      if (colided.call(manager)) {
        self.socket.emit('lost', {lost:'yes'});
        return true;
      }
      return false;
    };
  }

  if (self.waiting) {
    //waiting for connection
    var loop = setinterval(function() {
      if (!self.waiting) {
        setupConnection();
        clearInterval(loop);
      }
    }, 500);
  } else {
    setupConnection();
  }
};

