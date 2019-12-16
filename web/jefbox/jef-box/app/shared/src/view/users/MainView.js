Ext.define('JefBox.shared.view.users.MainView', {
  extend: 'Ext.grid.Grid',
  alias: 'widget.usersView',
  requires: [
    'JefBox.model.User',
    'JefBox.shared.view.users.MainViewController'
  ],

  controller: {
    type: 'usersView'
  },
  viewModel: {
    stores: {
      usersStore: {
        model: 'JefBox.model.User'
      }
    }
  },

  border: true,
  bind: {
    store: '{usersStore}'
  },
  listeners: {
    edit: 'onEditRow',
    canceledit: 'onCancelEditRow'
  },
  plugins: [{
    type: 'rowedit',
    id: 'rowEditingPlugin',
    clicksToEdit: 2
  }],
  items: [{
    xtype: 'toolbar',
    docked: 'top',
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      align: 'right',
      xtype: 'button',
      text: 'Create User',
      handler: 'onClickCreateUserBtn'
    }, {
      align: 'right',
      xtype: 'button',
      text: 'Refresh',
      handler: 'onClickRefreshBtn'
    }]
  }],
  store: {
    model: 'JefBox.model.User',
    autoLoad: true
  },
  columns: [{
    text: 'Actions',
    cell: {
      tools: [{
        iconCls: 'x-fa fa-trash',
        tooltip: 'Delete User',
        handler: 'onClickDeleteUser'
      }]
    }
  }, {
    text: 'Id',
    dataIndex: 'Id',
    flex: 1
  }, {
    text: 'Name',
    dataIndex: 'Name',
    flex: 1,
    editor: {
      xtype: 'textfield',
      allowBlank: false
    }
  }, {
    text: 'Active',
    dataIndex: 'IsActive',
    flex: 1
  }, {
    text: 'Create Date',
    dataIndex: 'CreateDate',
    formatter: 'date("m/d/Y g:m:s A")',
    flex: 1
  }]
});