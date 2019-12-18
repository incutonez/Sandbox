Ext.define('JefBox.Socket', {
  alternateClassName: [
    'socket'
  ],
  singleton: true,

  constructor: function(config) {
    if (window.io) {
      this.connection = io({
        forceNew: true
      });
    }
  },

  emit: function(id, message) {
    var connection = this.connection;
    if (connection) {
      connection.emit(id, message);
    }
  }
});