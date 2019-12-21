Ext.define('JefBox.view.games.EditView', {
  extend: 'Ext.Dialog',
  alias: 'widget.gamesEditView',
  requires: [
    'JefBox.view.games.EditViewController'
  ],

  viewModel: {
    data: {
      viewRecord: null
    },
    stores: {
      teamsStore: {
        model: 'JefBox.model.Team',
        autoLoad: true
      }
    }
  },
  controller: {
    type: 'gamesEditView'
  },

  height: 400,
  width: 800,
  title: 'Games',
  closable: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  buttons: {
    save: 'onClickSave',
    cancel: 'onClickCancel'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'hbox'
    },
    items: [{
      xtype: 'textfield',
      label: 'Name',
      bind: {
        value: '{viewRecord.Name}'
      }
    }, {
      xtype: 'textfield',
      label: 'Room',
      bind: {
        value: '{viewRecord.Room}'
      }
    }]
  }, {
    xtype: 'container',
    flex: 1,
    layout: {
      type: 'hbox'
    },
    items: [{
      xtype: 'grid',
      title: 'Selected Teams',
      reference: 'teamsView',
      flex: 1,
      bind: {
        // TODO: Not sure how the users get populated here... the endpoint only loads games and their teams
        store: '{viewRecord.Teams}'
      },
      // Absolutely required in order to get the record binding
      itemConfig: {
        viewModel: {}
      },
      listeners: {
        edit: 'onEditTeam',
        canceledit: 'onCancelEditTeam'
      },
      plugins: [{
        type: 'rowedit',
        id: 'rowEditingPlugin',
        clicksToEdit: 2
      }, {
        type: 'gridrowdragdrop'
      }],
      columns: [{
        text: 'Actions',
        cell: {
          tools: [{
            iconCls: Icons.DELETE,
            tooltip: 'Delete Team',
            handler: 'onClickDeleteTeam'
          }]
        }
      }, {
        text: 'Name',
        dataIndex: 'Name'
      }, {
        text: 'Color',
        dataIndex: 'Color'
      }, {
        text: 'Users',
        cell: {
          xtype: 'widgetcell',
          widget: {
            xtype: 'grid',
            hideHeaders: true,
            height: 100,
            bind: {
              store: '{record.Users}'
            },
            columns: [{
              dataIndex: 'UserName'
            }]
          }
        }
      }]
    }, {
      xtype: 'grid',
      title: 'Available Teams',
      bind: {
        store: '{teamsStore}'
      },
      plugins: [{
        type: 'gridrowdragdrop'
      }],
      columns: [{
        text: 'Name',
        dataIndex: 'Name'
      }]
    }]
  }]
});