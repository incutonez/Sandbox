Ext.define('JefBox.view.users.MainView', {
  extend: 'JefBox.view.BaseCrudView',
  alias: 'widget.usersMainView',
  requires: [
    'JefBox.model.User',
    'JefBox.view.users.MainViewController'
  ],

  controller: {
    type: 'usersView'
  },
  viewModel: {
    data: {
      mainStoreModel: 'JefBox.model.User'
    }
  },

  NAME_DATAINDEX: 'UserName',

  getColumnsConfig: function() {
    var config = this.callParent();
    Ext.Array.insert(config, 3, [{
      text: 'Active',
      dataIndex: 'IsActive',
      flex: 1
    }]);
    return config;
  }
});