Ext.define('JefBox.store.Teams', {
  extend: 'Ext.data.Store',
  singleton: true,
  model: 'JefBox.model.Team',
  autoLoad: true,

  constructor: function(config) {
    var me = this;
    me.callParent(arguments);
    socket.on('updatedTeams', function() {
      me.load();
    });
  }
});