Ext.define('JefBox.view.games.EditView', {
  extend: 'JefBox.BaseDialog',
  alias: 'widget.gamesEditView',
  requires: [
    'JefBox.view.games.EditViewController',
    'JefBox.view.teams.SelectView'
  ],

  viewModel: {
    data: {
      viewRecord: null
    },
    formulas: {
      saveBtnDisabled: function(get) {
        return !get('viewRecord.valid');
      }
    }
  },
  controller: {
    type: 'gamesEditView'
  },

  title: 'Games',
  isCrudDialog: true,
  items: [{
    xtype: 'tabpanel',
    tabBarPosition: 'left',
    tabRotation: 'none',
    defaults: {
      tab: {
        height: 50,
        width: 50,
        flex: null
      }
    },
    tabBar: {
      layout: {
        pack: 'start'
      }
    },
    items: [{
      iconCls: Icons.INFO,
      bodyPadding: '0 0 0 10',
      layout: {
        type: 'hbox',
        align: 'left'
      },
      items: [{
        xtype: 'textfield',
        label: 'Name',
        required: true,
        margin: '0 10 0 0',
        bind: {
          value: '{viewRecord.Name}'
        }
      }, {
        xtype: 'combobox',
        label: 'Type',
        valueField: 'Value',
        displayField: 'Description',
        forceSelection: true,
        queryMode: false,
        required: true,
        store: Enums.GameTypes,
        margin: '0 10 0 0',
        bind: {
          value: '{viewRecord.Type}'
        }
      }, {
        xtype: 'textfield',
        label: 'Room',
        bind: {
          value: '{viewRecord.Room}'
        }
      }]
    }, {
      xtype: 'teamsSelectView',
      iconCls: Icons.TEAMS
    }]
  }]
});