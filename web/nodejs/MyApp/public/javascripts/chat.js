$(document).ready(function() {
  var username = "";
	$('#message').on('click', function() {
		$('#messageLabel').hide();
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
				$('#' + data.left).remove();
			});

      socket.on('userList', function(data) {
        var users = data.userList;
        for (var user in users) {
          $('#userList').append('<div class="userList" id="' + user + '">' + users[user] + '</div>')
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
