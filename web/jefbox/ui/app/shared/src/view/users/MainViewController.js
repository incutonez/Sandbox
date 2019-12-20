Ext.define('JefBox.view.users.MainViewController', {
  extend: 'JefBox.view.BaseCrudViewController',
  alias: 'controller.usersView',

  BASE_ROUTE: Routes.USERS,

  constructor: function(config) {
    var me = this;
    me.callParent(arguments);
    socket.on('userStatusChange', function() {
      me.refreshMainStore();
    });
  }
});