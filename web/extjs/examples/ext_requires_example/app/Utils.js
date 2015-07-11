Ext.define('Test.Utils', {
  singleton: true,
  requires: ['Test.Utils2'],
  getText: function() {
    return Test.Utils2.hello + ' world';
  }
});