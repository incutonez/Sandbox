Ext.define('JefBox.view.teams.MainView', {
  extend: 'JefBox.view.BaseCrudView',
  alias: 'widget.teamsMainView',
  requires: [
    'JefBox.model.Team',
    'JefBox.model.User',
    'JefBox.view.teams.MainViewController'
  ],

  controller: {
    type: 'teamsMainView'
  },
  viewModel: {
    data: {
      mainStoreModel: 'JefBox.model.Team'
    },
    stores: {
      usersStore: {
        model: 'JefBox.model.User',
        autoLoad: true
      }
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