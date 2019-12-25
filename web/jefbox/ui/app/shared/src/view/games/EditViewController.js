Ext.define('JefBox.view.games.EditViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.gamesEditView',

  onClickAddTeam: function(gridEditor, context) {
    let viewRecord = this.getViewRecord();
    let teamsStore = viewRecord && viewRecord.getTeamsStore();
    let teamsView = this.lookup('teamsView');
    let teamsPlugin = teamsView && teamsView.getPlugin('rowEditingPlugin');
    if (teamsStore && teamsPlugin) {
      let team = teamsStore.add({});
      teamsPlugin.startEdit(team[0]);
    }
  },

  onClickCancel: function() {
    this.closeView();
  },

  onClickSave: function() {
    let me = this;
    let viewRecord = me.getViewRecord();
    if (viewRecord) {
      viewRecord.save({
        callback: function(record, operation, successful) {
          me.closeView();
        }
      });
    }
  },

  getViewRecord: function() {
    let viewModel = this.getViewModel();
    let viewRecord = viewModel && viewModel.get('viewRecord');
    if (!viewRecord) {
      this.logError('viewRecord is undefined');
    }
    return viewRecord;
  }
});