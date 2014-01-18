var isIE = navigator.userAgent.search(/msie/i);
var isFF = navigator.userAgent.search(/firefox/i);
var isChrome = navigator.userAgent.search(/chrome/i);

function log() {
  if (isFF !== -1 || isChrome !== -1) {
    var stack = Error().stack,
        stacks = stack.split('\n'),
        theStack,
        classPattern = /.*\/(.*)\.js.*/,
        funcPattern;
    if (isChrome !== -1) {
      theStack = stacks[3];
      funcPattern = /\s+\w+\s(.*)\s\(/;
    }
    else {
      theStack = stacks[1];
      funcPattern = /\.*(.*)\@.*/;
    }
    var matches = theStack.match(funcPattern);
    var funcName = matches[1];
    matches = theStack.match(classPattern);
    var className = matches[1];
    console.log(className + '::' + funcName);
  }
}