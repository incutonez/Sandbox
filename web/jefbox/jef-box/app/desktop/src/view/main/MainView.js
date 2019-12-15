Ext.define('JefBox.view.main.MainView', {
  extend: 'Ext.Panel',
  alias: 'widget.mainView',

  controller: {
    type: 'mainView'
  },
  viewModel: {
    type: 'mainView'
  },

  title: 'Desktop',
  layout: 'fit',
  items: [{
    xtype: 'grid',
    reference: 'userGrid',
    title: 'Users',
    listeners: {
      edit: 'onEditRow',
      canceledit: 'onCancelEditRow'
    },
    plugins: [{
      type: 'rowedit',
      id: 'rowEditingPlugin',
      clicksToEdit: 2
    }],
    titleBar: {
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
    },
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
  }]
});
