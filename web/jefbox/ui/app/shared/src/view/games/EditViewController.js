Ext.define('JefBox.view.games.EditViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.gamesEditView',

  onClickAddTeam: function(gridEditor, context) {
    var viewRecord = this.getViewRecord();
    var teamsStore = viewRecord && viewRecord.getTeamsStore();
    var teamsView = this.lookup('teamsView');
    var teamsPlugin = teamsView && teamsView.getPlugin('rowEditingPlugin');
    if (teamsStore && teamsPlugin) {
      var team = teamsStore.add({});
      teamsPlugin.startEdit(team[0]);
    }
  },

  onClickCancel: function() {
    this.closeView();
  },

  onEditTeam: function(sender, location) {
    this.savingRecord = true;
  },

  onCancelEditTeam: function(sender, location) {
    var record = location.record;
    if (!this.savingRecord && record.phantom) {
      record.store.remove(record);
    }
    this.savingRecord = false;
  },

  onClickEditTeam: function(grid, info) {
    var teamsView = this.lookup('teamsView');
    var teamsPlugin = teamsView && teamsView.getPlugin('rowEditingPlugin');
    if (teamsPlugin) {
      teamsPlugin.startEdit(info.record);
    }
  },

  onClickDeleteTeam: function(grid, info) {
    info.record.store.remove(info.record);
  },

  onClickSave: function() {
    var me = this;
    var viewRecord = me.getViewRecord();
    if (viewRecord) {
      viewRecord.save({
        callback: function(record, operation, successful) {
          me.closeView();
        }
      });
    }
  },

  getViewRecord: function() {
    var viewModel = this.getViewModel();
    var viewRecord = viewModel && viewModel.get('viewRecord');
    if (!viewRecord) {
      console.error('viewRecord is undefined');
    }
    return viewRecord;
  }
});