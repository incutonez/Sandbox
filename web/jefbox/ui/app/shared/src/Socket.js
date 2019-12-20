Ext.define('JefBox.Socket', {
  alternateClassName: [
    'socket'
  ],
  singleton: true,
  config: {
    connection: null
  },

  constructor: function(config) {
    if (window.io) {
      this.setConnection(io());
    }
  },

  on: function(event, handler) {
    var connection = this.getConnection();
    if (connection) {
      connection.on(event, handler);
    }
  },

  emit: function(id, message) {
    var connection = this.getConnection();
    if (connection) {
      connection.emit(id, message);
    }
  }
});