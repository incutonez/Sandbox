var ApplicationController = require('./ApplicationController.js');
var log;

var LoggerController = module.exports = function LoggerController(init) {
  ApplicationController.call(this, init);
  log = require('../utils/LoggerMixin.js')(init);
};

require('util').inherits(LoggerController, ApplicationController);

LoggerController.prototype.index = function index(controller) {
  log.logMessage('blah');
  return controller.send({success: true});
};