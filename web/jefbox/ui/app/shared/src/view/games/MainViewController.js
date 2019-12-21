Ext.define('JefBox.view.games.MainViewController', {
  extend: 'JefBox.view.BaseCrudViewController',
  alias: 'controller.gamesMainView',
  requires: [
    'JefBox.view.games.EditView'
  ],

  showEditView: function(record) {
    Ext.create('JefBox.view.games.EditView', {
      viewModel: {
        data: {
          viewRecord: record
        }
      }
    }).show();
  },

  onClickCreateRecordBtn: function() {
    this.showEditView(JefBox.model.Game.loadData());
  },

  onClickEditRecord: function(grid, info) {
    this.showEditView(info.record);
  }
});