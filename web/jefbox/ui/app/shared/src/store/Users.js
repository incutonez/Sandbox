Ext.define('JefBox.store.Users', {
  extend: 'Ext.data.Store',
  singleton: true,
  model: 'JefBox.model.User',
  autoLoad: true,

  constructor: function(config) {
    var me = this;
    me.callParent(arguments);
    socket.on('updatedUsers', function() {
      me.load();
    });
    socket.on('userStatusChange', function() {
      me.load();
    });
  }
});