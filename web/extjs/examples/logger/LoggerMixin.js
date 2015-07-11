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
    var str = this.getPrependString();
    Ext.log({
      msg: str + message,
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
    var str = this.getPrependString();
    Ext.log({
      msg: str + message,
      level: 'warning',
      stack: stack
    });
  },

  /**
   * Getter: gets the string to prepend before the actual log message... this
   * will return the current class and class's function that's calling the
   * log message, so it will prepend something like ClassName::FunctionName:
   * before the actuual log message.
   * @return {string} prependStr
   */
  getPrependString: function() {
    if (Ext.isIE9m) {
      return false;
    }
    var stack,
        prependStr = '';
    if (Ext.isIE10p) {
      try {
        blah;
      }
      catch(e) {
        stack = e.stack;
      }
    }
    else {
      stack = Error().stack;
    }
    if (stack) {
      var stackSplit = stack.split('\n');
      if (stackSplit) {
        var theStack,
            functionRe,
            classRe = /\/([^\/]+)\.js/; // can get the classname with same regex
        if (this.isFF()) {
          // Firefox stores the function name and classname in the second index
          theStack = stackSplit[2];
          functionRe = /^\.(.*)\@/;
        }
        else if (Ext.isChrome) {
          // Chrome stores the function name and classname in the fourth index
          theStack = stackSplit[4];
          functionRe = /\.([^\.\(]+)\s+/;
        }
        else if (Ext.isIE10p) {
          // IE10+ stores the function name and classname in the third index
          theStack = stackSplit[3];
          functionRe = /\s+at\s([^\s]+)/;
        }
        if (theStack !== undefined && theStack !== [] && classRe && functionRe) {
          var funcArr = theStack.match(functionRe);
          var classArr = theStack.match(classRe);
          if (classArr) {
            var className = classArr[1];
            prependStr += className + '::';
          }
          if (funcArr) {
            var functionName = funcArr[1];
            prependStr += functionName + ': ';
          }
        }
      }
    }
    return prependStr;
  },

  isFF: function() {
    var firefox = this.isFirefox;
    if (!firefox) {
      firefox = this.isFirefox = navigator.userAgent.match(/firefox/i) ? true : false;
    }
    return firefox;
  }
});