var sio = require('socket.io');

module.exports = function (compound) {
  var io = compound.io = sio.listen(compound.server);

  io.sockets.on('connection', function(socket) {
    console.log("io.sockets.on 'connection' ");
  });
}