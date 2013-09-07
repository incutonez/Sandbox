var sio = require('socket.io');

module.exports = function (compound) {
  // TODO: Make a user object... seeing as these are globals that get reset
  var io = compound.io = sio.listen(compound.server);
  var userId = "";
  var users = {};
  var msgId = 0;
	var speech = false;	
	var espeak = require('espeak');
	espeak.cmd = '/usr/local/bin/espeak';

  io.sockets.on('connection', function(socket) {
    console.log("Guest connected");
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
		
		socket.on('speech', function(data) {
			if (data.speech) {
				speech = true;
			}
			else {
				speech = false;
			}
		});

    socket.on('sndMsg', function(data) {
      msgId++;
      var newMsg = {
        sender: data.sender,
        message: data.message,
        msgId: msgId,
        dataUri: false
      };
			if (speech) {
				// This is asynchronous, so we can't send the message back to the user until it completes
				espeak.speak(data.message, function(err, wav) {
					if (err) {
						return console.error(err);
					}

					// get a base64-encoded data URI
					newMsg.dataUri = wav.toDataUri();
					socket.emit('newMsg', newMsg);
				});
			}
			else {
				socket.emit('newMsg', newMsg);
			}
      socket.broadcast.emit('newMsg', newMsg);
    });

    socket.on('disconnect', function(data) {
      var username = users[userId];
      console.log(username + ' disconnected');
			var left = userId;
      delete users[userId];
			socket.broadcast.emit('disconnected', {
				left: left
			});
    });
  });
}
