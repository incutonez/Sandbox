module.exports = function(describe, property) {
  var LogEntry = describe('LogEntry', function() {
    property('timestamp', String);
    property('severity', String);
    property('message', String);
  });
  return LogEntry;
};