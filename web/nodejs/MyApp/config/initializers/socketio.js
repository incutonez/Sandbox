var sio = require('socket.io');

module.exports = function (compound) {
  // TODO: Make a user object... seeing as these are globals that get reset
  var io = compound.io = sio.listen(compound.server);
  var users = [];
  var msgId = 0;
	var speech = false;	
	var espeak = require('espeak');
	espeak.cmd = '/usr/local/bin/espeak';

  io.sockets.on('connection', function(socket) {
    console.log("Guest connected");
    var userId = socket.id;

    socket.on('joined', function(data) {
      var joined  = {};
      joined.userId = userId;
      joined.username = data.username;
      users.push(joined);
      console.log(data.username + ' joined');

      socket.emit('userList', {
        userList: users
      });

      socket.broadcast.emit('userList', {
        userList: [joined]
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
      var exited = undefined;
      for (var i = 0; i < users.length; i++) {
        if (users[i].userId === userId) {
          exited = users.splice(i, 1)[0];
          break;
        }
      }
      console.log(exited.username + ' disconnected');
			socket.broadcast.emit('disconnected', {
				exited: exited
			});
    });
  });
}
