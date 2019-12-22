Ext.define('JefBox.view.games.EditView', {
  extend: 'JefBox.BaseDialog',
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

  title: 'Games',
  buttons: {
    save: 'onClickSave',
    cancel: 'onClickCancel'
  },
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
      layout: {
        type: 'hbox',
        align: 'left'
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
      iconCls: Icons.TEAMS,
      layout: {
        type: 'hbox'
      },
      items: [{
        xtype: 'grid',
        title: 'In Game',
        reference: 'teamsView',
        flex: 1,
        bind: {
          // TODO: Not sure how the users get populated here... the endpoint only loads games and their teams
          store: '{viewRecord.Teams}'
        },
        // Absolutely required in order to get the record binding
        itemConfig: {
          viewModel: {
            formulas: {
              usersMarkup: function(get) {
                return Ext.util.Format.storeToList({
                  store: get('record.Users'),
                  fields: 'UserName'
                });
              }
            }
          }
        },
        listeners: {
          edit: 'onEditTeam',
          canceledit: 'onCancelEditTeam'
        },
        plugins: [{
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
          flex: 1,
          cell: {
            encodeHtml: false,
            bind: '{usersMarkup}'
          }
        }]
      }, {
        xtype: 'grid',
        title: 'Available Teams',
        margin: '0 0 0 10',
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
  }]
});