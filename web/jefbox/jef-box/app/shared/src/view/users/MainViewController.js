Ext.define('JefBox.shared.view.users.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.usersView',

  BASE_ROUTE: Routes.USERS,

  constructor: function(config) {
    var baseRoute = config.BASE_ROUTE || this.BASE_ROUTE;
    var routes = {};
    routes[baseRoute] = {
      action: 'onRouteUsers',
      lazy: true
    };
    config.routes = routes;
    this.callParent(arguments);
  },

  onRouteUsers: function() {
    this.refreshUsersGrid();
  },

  onClickCreateUserBtn: function() {
    var userGridStore = this.getStore('usersStore');
    var userGridEditor = this.getView().getPlugin('rowEditingPlugin');
    if (userGridEditor && userGridStore) {
      var record = userGridStore.add({});
      userGridEditor.startEdit(record[0]);
    }
  },

  refreshUsersGrid: function() {
    var userGridStore = this.getStore('usersStore');
    if (userGridStore) {
      userGridStore.load();
    }
  },

  onClickRefreshBtn: function() {
    this.refreshUsersGrid();
  },

  onEditRow: function(gridEditor, context) {
    var me = this;
    me.savingRecord = true;
    context.record.save({
      callback: function(record, operation, successful) {
        me.savingRecord = false;
        me.refreshUsersGrid();
      }
    });
  },

  onClickDeleteUser: function(grid, info) {
    var me = this;
    info.record.erase({
      callback: function(record, operation, successful) {
        me.refreshUsersGrid();
      }
    });
  },

  onCancelEditRow: function(sender, location) {
    var record = location.record;
    if (!this.savingRecord && record.phantom) {
      record.store.remove(record);
    }
  }
});