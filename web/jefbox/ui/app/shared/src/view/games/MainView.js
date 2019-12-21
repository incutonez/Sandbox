Ext.define('JefBox.view.games.MainView', {
  extend: 'JefBox.view.BaseCrudView',
  alias: 'widget.gamesMainView',
  requires: [
    'JefBox.model.Game',
    'JefBox.view.games.MainViewController'
  ],

  controller: {
    type: 'gamesMainView'
  },
  viewModel: {
    data: {
      mainStoreModel: 'JefBox.model.Game'
    }
  },

  getPluginsConfig: Ext.emptyFn,

  getColumnsConfig: function() {
    var config = this.callParent();
    Ext.Array.insert(config, 3, [{
      text: 'Room',
      dataIndex: 'Room'
    }]);
    return config;
  }
});