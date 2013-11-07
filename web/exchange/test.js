Date.prototype.getYearMonthDay = function() {
  // months are 0 based... so increment by 1 to get proper month
  var month = this.getUTCMonth() + 1;
  // prepend a zero to make it look nice
  if (month < 10) {
    month = '0' + month.toString();
  }
  
  var day = this.getUTCDate();
  // prepend a zero to make it look nice
  if (day < 10) {
    day = '0' + day.toString();
  }
  
  var year = this.getUTCFullYear().toString();
  
  return year + '-' + month + '-' + day;
};

Date.prototype.getHourString = function() {
  var hour = this.getHours();
  var mins = this.getMinutes();
  var meridian = 'am';
  
  if (hour > 12) {
    hour -= 12;
    meridian = 'pm';
  }
  else if (hour === 12) {
    meridian = 'pm';
  }
  else if (hour === 0) {
    hour += 12;
  }
  else {
    hour = hour.toString();
  }
  
  if (mins < 10) {
    mins = '0' + mins.toString();
  }
  
  
  return hour.toString() + ':' + mins + meridian;
};

$(document).ready(function() {
  var winWidth = document.getElementById('calendarArea').clientWidth;
  var border = 1 / winWidth;
  border = 1;
//  winWidth = 100;
  var width = winWidth / 11;
//  winWidthInHours = 2;
  var hours = 3600000;
//  hours = 60000;  //  hours are now mins
  var ymd = new Date().getYearMonthDay();
  
  $.ajax({
    dataType: 'json',
    type: 'POST',
    url: 'test.php',
    data: {
      date: ymd
    },
    success: function(data) {
      var mainDiv = "";
      for (var i = 0; i < data.length; i++) {
        var room = data[i];
        var nameDiv = '<div class="roomName"><strong>' + room.name + '</strong></div>';
//        var nameDiv = '';
        var daylight = '-06:00';
        var open = new Date(ymd + 'T07:30:00' + daylight);
        var nextTaken;
        var openHour;
        var nextHour;        
        var overallWidth = 0;
        
        var sum = 0;
        var subbed = 0;
        for (var j = 0; j < room.info.length; j++) {
          var roomInfo = room.info[j];
          nextTaken = new Date(roomInfo.startDate + daylight);
          openHour = open.getHourString();
          nextHour = nextTaken.getHourString();
          /* 3,600,000 because the date difference comes back in milliseconds,
           * so divide by 1000, then divide by 60 (to get difference in minutes),
           * then divide by 60 (to get difference in hours) and then multiply by
           * 100 because each hour is worth 100 pixels. */
          subbed += 2;
//          var diff = (((nextTaken - open) / hours) * winWidthInHours) - 2;
          var diff = (((nextTaken - open) / hours) * width) - (2 * border);
          // if we're at 0, that means we have the left side having 2 pixels and the right having 1, so we're out 1 pixel... add it to the overallWidth
          if (j === 0) {
            diff -= border;
            overallWidth += border;
            subbed += 1;
          }
          if (diff > 0) {
            sum += diff;
//            nameDiv += '<div style="width: ' + diff + 'px;" class="roomInfo2"></div>';
            nameDiv += '<div style="width: ' + diff + 'px;" class="open roomInfo"><span>Open</span><div><span>' + openHour + ' - ' + nextHour + '</span></div></div>';
            overallWidth += diff + (2 * (border));
          }
          open = new Date(roomInfo.endDate + daylight);
          openHour = nextHour;
          nextHour = open.getHourString();
//          diff = (((open - nextTaken) / hours) * winWidthInHours) - 2;
          diff = (((open - nextTaken) / hours) * width) - (2 * border);
          sum += diff;
          subbed += 2;
          overallWidth += diff + 2 * (border);
          nameDiv += '<div class="roomInfo taken" style="width: ' + diff + 'px;"><span>Taken</span><div><span>' + openHour + ' - ' + nextHour + '</span></div></div>';
//          nameDiv += '<div class="roomInfo2" style="width: ' + diff + 'px;"></div>';
        }
        var diff;
        if (overallWidth) {
          diff = winWidth - overallWidth - 3 * (border);
          subbed += 3;
        }
        else {
          diff = winWidth - 4 * (border);
          subbed += 4;
        }
        if (diff > 0) {
          sum += diff;
          openHour = open.getHourString();
          nextHour = '6:30pm';
//          nameDiv += '<div style="width: ' + diff + 'px;" class="roomInfo2"></div>';
          nameDiv += '<div style="width: ' + diff + 'px;" class="open roomInfo"><span>Open</span><div><span>' + openHour + ' - ' + nextHour + '</span></div></div>';
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