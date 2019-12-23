Ext.define('JefBox.view.teams.MainView', {
  extend: 'JefBox.view.BaseCrudView',
  alias: 'widget.teamsMainView',
  requires: [
    'JefBox.model.Team',
    'JefBox.model.User',
    'JefBox.store.Teams',
    'JefBox.view.teams.MainViewController'
  ],

  controller: {
    type: 'teamsMainView'
  },
  viewModel: {
    stores: {
      usersStore: {
        model: 'JefBox.model.User',
        autoLoad: true
      },
      mainStore: JefBox.store.Teams
    }
  },

  getColumnsConfig: function() {
    var config = this.callParent();
    Ext.Array.insert(config, 3, [{
      text: 'Users',
      dataIndex: 'Users',
      flex: 1,
      renderer: function(value, record) {
        var users = record.getUsersStore();
        return users && users.getCount();
      },
      editor: {
        xtype: 'combobox',
        multiSelect: true,
        queryMode: 'local',
        valueField: 'Id',
        displayField: 'UserName',
        bind: {
          store: '{usersStore}'
        },
        listeners: {
          select: 'onSelectUserField'
        }
      }
    }]);
    return config;
  }
});