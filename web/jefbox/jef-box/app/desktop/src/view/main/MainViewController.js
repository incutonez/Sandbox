Ext.define('JefBox.view.main.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainView',

  onClickCreateUserBtn: function() {
    var userGrid = this.lookupReference('userGrid');
    var userGridStore = userGrid && userGrid.getStore();
    var userGridEditor = userGrid && userGrid.getPlugin('rowEditingPlugin');
    if (userGridEditor && userGridStore) {
      var record = userGridStore.add({});
      userGridEditor.startEdit(record[0]);
    }
  },

  refreshUsersGrid: function() {
    var userGrid = this.lookupReference('userGrid');
    var userGridStore = userGrid && userGrid.getStore();
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
        console.log(successful);
        me.refreshUsersGrid();
      }
    });
  },

  onClickDeleteUser: function(grid, info) {
    var me = this;
    info.record.erase({
      callback: function(record, operation, successful) {
        console.log(successful);
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
