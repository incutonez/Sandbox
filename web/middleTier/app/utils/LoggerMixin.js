var ctl;
var LoggerMixin = module.exports = function LoggerMixin(init) {
  init.before(function(controller) {
    ctl = controller;
    controller.next();
  });
  return {
    logMessage: function(msg) {
//      console.log(ctl.LogEntry);
      console.log('here', ctl.LogEntry);
    }
  };
};