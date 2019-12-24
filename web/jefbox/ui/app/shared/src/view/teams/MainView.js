Ext.define('JefBox.view.teams.MainView', {
  extend: 'JefBox.view.BaseCrudView',
  alias: 'widget.teamsMainView',
  requires: [
    'JefBox.store.Users',
    'JefBox.store.Teams',
    'JefBox.view.teams.MainViewController'
  ],

  itemConfig: {
    viewModel: {
      formulas: {
        usersDisplay: function(get) {
          return Ext.util.Format.storeToList({
            store: get('record.Users'),
            fields: 'UserName'
          });
        }
      }
    }
  },
  controller: {
    type: 'teamsMainView'
  },
  viewModel: {
    data: {
      entityName: 'Team'
    },
    stores: {
      mainStore: JefBox.store.Teams
    }
  },

  getColumnsConfig: function() {
    var config = this.callParent();
    Ext.Array.insert(config, 3, [{
      text: 'Users',
      dataIndex: 'Users',
      flex: 1,
      cell: {
        encodeHtml: false,
        bind: {
          value: '{usersDisplay}'
        }
      },
      editor: {
        xtype: 'combobox',
        multiSelect: true,
        queryMode: 'local',
        valueField: 'Id',
        displayField: 'UserName',
        store: JefBox.store.Users.getActiveUsersStore(),
        listeners: {
          select: 'onSelectUserField'
        }
      }
    }, {
      text: 'Owner',
      dataIndex: 'OwnerId',
      renderer: function(value) {
        return JefBox.store.Users.getUserNameById(value);
      }
    }]);
    return config;
  }
});