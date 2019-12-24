Ext.define('JefBox.store.Games', {
  extend: 'Ext.data.Store',
  singleton: true,
  model: 'JefBox.model.Game',
  autoLoad: true,

  constructor: function(config) {
    var me = this;
    me.callParent(arguments);
    socket.on('updatedGames', function() {
      me.load();
    });
  }
});