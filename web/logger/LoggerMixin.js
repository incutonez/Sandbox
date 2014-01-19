/**
 * @author Jef Harkay
 * @docauthor Jef Harkay
 * This is a logger mixin, which will be used for any class that requires
 * a logging mechanism.
 */
Ext.define('LoggerMixin', {
  /**
   * @param {string} message
   * @param {boolean} stack
   */
  logError: function(message, stack) {
    stack = stack ? stack : false;
    Ext.log({
      msg: message,
      level: 'error',
      stack: stack
    });
  },

  /**
   * @param {string} message
   * @param {boolean} stack
   */
  logWarning: function(message, stack) {
    stack = stack ? stack : false;
    Ext.log({
      msg: message,
      level: 'warning',
      stack: stack
    });
  }
});