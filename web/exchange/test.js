$(document).ready(function() {
  $.ajax({
    dataType: 'json',
    type: 'GET',
    url: 'test.php',
    success: function(data) {
      var mainDiv = "";
      for (var i = 0; i < data.length; i++) {
        var room = data[i];
        var nameDiv = '<div><strong>' + room.name + '</strong></div>';
        
        for (var j = 0; j < room.info.length; j++) {
          var roomInfo = room.info[j];
          var ps = '<p class="subject">' + roomInfo.subject + '</p>';
          ps += '<p class="startDate">' + roomInfo.startDate + '</p>';
          ps += '<p class="endDate">' + roomInfo.endDate + '</p>';
          nameDiv += '<div class="roomInfo">' + ps + '</div>';
        }
        mainDiv += '<div class="nameDiv">' + nameDiv + '</div>';
      }
      $('#calendarArea').append(mainDiv);
    },
    error: function(data) {
      alert('failed');
    }
  });
});