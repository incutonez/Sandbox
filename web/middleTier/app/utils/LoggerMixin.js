var LogEntry;
var LoggerMixin = module.exports = function LoggerMixin(init) {
  function getTimestamp() {
    var date = new Date();
    var ymd = getYearMonthDayString(date);
    var hms = getHoursMinsSecsString(date);
    return ymd + ' ' + hms;
  }

  function getHoursMinsSecsString(date) {
    var hours = date.getUTCHours();
    var hoursStr = hours.toString();
    if (hours < 10) {
      hoursStr = '0' + hoursStr;
    }
    var mins = date.getUTCMinutes();
    var minsStr = mins.toString();
    if (mins < 10) {
      minsStr = '0' + minsStr;
    }
    var secs = date.getUTCSeconds();
    var secsStr = secs.toString();
    if (secs < 10) {
      secsStr = '0' + secsStr;
    }
    return hoursStr + ':' + minsStr + ':' + secsStr;
  }

  function getYearMonthDayString(date) {
    var year = date.getUTCFullYear();
    var yearStr = year.toString();
    var month = date.getUTCMonth() + 1;
    var monthStr = month.toString();
    if (month < 10) {
      monthStr = '0' + monthStr;
    }
    var day = date.getUTCDate();
    var dayStr = day.toString();
    if (day < 10) {
      dayStr = '0' + dayStr;
    }
    return yearStr + '-' + monthStr + '-' + dayStr;
  }

  function getLogLocation() {
    var logLocation = '';
    var stack = Error().stack;
    if (stack) {
      var splits = stack.split('\n');
      if (splits) {
        var theStack = splits[5];
        if (theStack) {
          var funcPattern = /\s*at\s+(?:\w+\.)(\w+)\s/;
          var classPattern = /.*[\\\/](\w+)\.js/;
          var matches = theStack.match(classPattern);
          if (matches && matches[1]) {
            logLocation = matches[1] + '::';
          }
          matches = theStack.match(funcPattern);
          if (matches && matches[1]) {
            logLocation += matches[1] + ': ';
          }
        }
      }
    }
    return logLocation;
  }

  function createLogEntry(obj, controller) {
    obj.timestamp = getTimestamp();
    if (!controller) {
      var logLocation = getLogLocation();
      obj.message = logLocation + obj.message;
    }
    if (LogEntry) {
      LogEntry.create(obj, function(err, model) {
        if (err) {
          console.error('Error creating LogEntry: ' + err.message);
        }
        else if (!model) {
          console.error('model is undefined');
        }
        // websocket code here
      });
    }
  }

  init.before(function(controller) {
    LogEntry = controller.LogEntry;
    controller.next();
  });

  return {
    logMessage: function(msg) {
      createLogEntry({
        message: msg,
        severity: 'message'
      });
    },

    logWarning: function(msg) {
      createLogEntry({
        message: msg,
        severity: 'warning'
      });
    },

    logError: function(msg) {
      createLogEntry({
        message: msg,
        severity: 'error'
      });
    }
  };
};