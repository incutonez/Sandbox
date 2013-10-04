$(document).ready(function() {
  var p = $('body').append('<p style="height: 100%; width: 100%;"></p>');
  var winWidth = p.width();
  $('body').remove('p');
  var winWidthInHours = winWidth / 12;
  var hours = 3600000;
  $.ajax({
    dataType: 'json',
    type: 'GET',
    url: 'test.php',
    success: function(data) {
      var mainDiv = "";
      for (var i = 0; i < data.length; i++) {
        var room = data[i];
        var nameDiv = '<div class="roomName"><strong>' + room.name + '</strong></div>';        
        var open = new Date('2013-10-02T07:00:00');
        var overallWidth = 0;
        
        for (var j = 0; j < room.info.length; j++) {
          var roomInfo = room.info[j];
          var nextTaken = new Date(roomInfo.startDate);
          /* 3,600,000 because the date difference comes back in milliseconds,
           * so divide by 1000, then divide by 60 (to get difference in minutes),
           * then divide by 60 (to get difference in hours) and then multiply by
           * 100 because each hour is worth 100 pixels. */
          var diff = ((nextTaken - open) / hours) * winWidthInHours;
          open = new Date(roomInfo.endDate);
          var nextDiff = ((open - nextTaken) / hours) * winWidthInHours;
          overallWidth += diff + nextDiff;
          if (open) {
            nameDiv += '<div style="width: ' + diff + 'px;" class="open roomInfo"></div>';
          }
          nameDiv += '<div class="roomInfo taken" style="width: ' + nextDiff + 'px;"></div>';
        }
        var diff = winWidth - overallWidth;
        if (diff) {
          nameDiv += '<div style="width: ' + diff + 'px;" class="open roomInfo"></div>';
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