Ext.define('JefBox.view.games.MainViewController', {
  extend: 'JefBox.view.BaseCrudViewController',
  alias: 'controller.gamesMainView',
  requires: [
    'JefBox.view.games.EditView'
  ],

  BASE_ROUTE: Routes.GAMES,

  showEditView: function(record) {
    Ext.create('JefBox.view.games.EditView', {
      viewModel: {
        data: {
          viewRecord: record
        }
      }
    });
  },

  onClickCreateRecordBtn: function(button, event) {
    this.showEditView(JefBox.model.Game.loadData());
  },

  onClickEditRecord: function(grid, info) {
    this.showEditView(info.record);
  }
});