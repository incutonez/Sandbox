/**
 * @author Jef Harkay
 * @docauthor Jef Harkay
 *
 * Base override, so we can add the logging mechanisms to every Ext JS class, as
 * they all extend from the Base class.
 */
Ext.define('My.namespace.overrides.Base', {
  override: 'Ext.Base',

  /** @property */
  STACK_INDEX: 2,

  /**
   * @param {String} message
   * @param {Boolean} stack
   */
  logError: function(message, stack) {
    var str = this.getPrependString();
    Ext.log({
      msg: str + message,
      level: 'error',
      stack: stack ? stack : false
    });
  },

  /**
   * @param {String} message
   * @param {Boolean} stack
   */
  logWarning: function(message, stack) {
    var str = this.getPrependString();
    Ext.log({
      msg: str + message,
      level: 'warning',
      stack: stack ? stack : false
    });
  },

  /**
   * Getter: gets the string to prepend before the actual log message... this
   * will return the current class and class's function that's calling the
   * log message, so it will prepend something like ClassName::FunctionName:
   * before the actuual log message.
   * @return {String} prependStr
   */
  getPrependString: function() {
    var stack = '';
    var prependStr = this.$className;
    try {
      blah;
    }
    catch(e) {
      stack = e.stack;
    }
    if (stack) {
      var stackSplit = stack.split('\n');
      if (stackSplit) {
        var theStack = '';
        var numberRe = /\.js:(\d+)/;
        var functionRe;
        if (Ext.isGecko) {
          // Firefox stores the function name and classname in the second index
          theStack = stackSplit[this.STACK_INDEX];
          functionRe = /^.*<?\.(.*)\@/;
        }
        else if (Ext.isChrome) {
          // Chrome stores the function name and classname in the fourth index
          theStack = stackSplit[this.STACK_INDEX + 1];
          functionRe = /\.([^\.\(]+)\s+/;
        }
        else if (Ext.isIE) {
          // IE10+ stores the function name and classname in the third index
          theStack = stackSplit[this.STACK_INDEX + 1];
          functionRe = /\s+at\s([^\s]+)/;
        }
        if (theStack && functionRe) {
          var funcArr = theStack.match(functionRe);
          var lineNumberArr = theStack.match(numberRe);
          if (funcArr && funcArr.length) {
            prependStr += '.' + funcArr[1];
          }
          if (lineNumberArr && lineNumberArr.length) {
            prependStr += ':' + lineNumberArr[1];
          }
        }
      }
    }
    prependStr += '::';
    return prependStr;
  }
});