$(document).ready(function() {
  var username = "";
  // Hide our label if the message textarea gets focus
	$('#message').on('click', function() {
		$('#messageLabel').hide();
	});
  
  // Show our label if the message textarea loses focus and has no content
  $('#message').on('focusout', function() {
    if (!$(this).prop('value')) {
      $('#messageLabel').show();
    }
  });
	
  $('#dialog').dialog({
    modal: true,
    closeOnEscape: false,
    title: "Please enter your username.",
    open: function(e, ui) {
      $('.ui-dialog-titlebar-close').hide();
    },
    buttons: {
      "Ok": function(e, ui) {
        username = $('#username').prop('value');
        if (username !== "") {
          socket = io.connect('http://ec2-54-244-147-98.us-west-2.compute.amazonaws.com/');
          socket.emit('joined', {
            username: username
          });
          $('#dialog').dialog('close');
        }
      }
    },
    close: function(e, ui) {
      $('#sndBtn').on('click', function(e) {
        var msg = $('#message').prop('value');
				var speech = $('#audioCheck').is(':checked');
        socket.emit('sndMsg', {
          sender: username,
          message: msg,
					speech: speech
        });
				$('#message').prop('value', '');
				$('#messageLabel').show();
      });
			
			$('#audioCheck').on('click', function() {
				var value = $(this).is(':checked');
				socket.emit('speech', {
					speech: value
				});
			});
			
			socket.on('disconnected', function(data) {
				$('#' + data.exited.userId).remove();
				$('#messages').append('<p class="roomAction">' + data.exited.username + ' has left the room.</p>');
			});

      socket.on('userList', function(data) {
        var users = data.userList;
        for (var i = 0; i < users.length; i++) {
					var user = users[i];
					$('#messages').append('<p class="roomAction">' + user.username + ' has joined the room.</p>');
          $('#userList').append('<div class="userList" id="' + user.userId + '">' + user.username + '</div>')
        }
      });

      socket.on('newMsg', function(data) {
        var sender = data.sender;
        var msgId = data.msgId;
        var msg = data.message;
        var dataUri = data.dataUri;
        var participant = "participant";

        if (sender === username) {
          participant = "you";
        }
        $('#messages').append('<p id="msg' + msgId + '"><span class="' + participant + '">' + sender + ': </span><span>' + msg + '</span></p>');

        if (dataUri) {
          $('#audio').prop('src', dataUri);
        }
      });
    }
  });
});
