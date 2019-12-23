Ext.define('JefBox.view.BaseCrudViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.baseCrudView',

  onClickCreateRecordBtn: function() {
    var mainStore = this.getMainStore();
    var mainGrid = this.getView().getPlugin('rowEditingPlugin');
    if (mainGrid && mainStore) {
      var record = mainStore.add({});
      mainGrid.startEdit(record[0]);
    }
  },

  refreshMainStore: function() {
    var viewModel = this.getViewModel();
    if (viewModel) {
      viewModel.notify();
    }
    var mainStore = this.getMainStore();
    if (mainStore) {
      mainStore.load();
    }
  },

  onClickRefreshBtn: function() {
    this.refreshMainStore();
  },

  onEditRow: function(gridEditor, context) {
    var me = this;
    me.savingRecord = true;
    context.record.save({
      callback: function(record, operation, successful) {
        me.savingRecord = false;
        me.refreshMainStore();
      }
    });
  },

  onClickEditRecord: Ext.emptyFn,

  onClickDeleteRecord: function(grid, info) {
    var me = this;
    info.record.erase({
      callback: function(record, operation, successful) {
        me.refreshMainStore();
      }
    });
  },

  onCancelEditRow: function(sender, location) {
    var record = location.record;
    if (!this.savingRecord && record.phantom) {
      record.store.remove(record);
    }
  },

  getMainStore: function() {
    var mainStore = this.getStore('mainStore');
    if (!mainStore) {
      console.error('mainStore is undefined');
    }
    return mainStore;
  }
});