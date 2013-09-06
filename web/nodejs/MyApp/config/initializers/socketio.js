var sio = require('socket.io');

module.exports = function (compound) {
  var io = compound.io = sio.listen(compound.server);
  var userId = "";
  var users = {};
  var msgId = 0;

  io.sockets.on('connection', function(socket) {
    console.log("io.sockets.on 'connection' ");
    userId = socket.id;

    socket.on('joined', function(data) {
      var joined  = {};
      users[userId] = joined[userId] = data.username;
      console.log(data.username + ' joined');

      socket.emit('userList', {
        userList: users
      });

      socket.broadcast.emit('userList', {
        userList: joined
      });
    });

    socket.on('sndMsg', function(data) {
      msgId++;
      var newMsg = {
        sender: data.sender,
        message: data.message,
        msgId: msgId,
        dataUri: false
      };

      socket.emit('newMsg', newMsg);
      socket.broadcast.emit('newMsg', newMsg);
    });

    socket.on('disconnect', function(data) {
      console.log(username + ' disconnected');
      delete users[userId];
    });
  });
}
