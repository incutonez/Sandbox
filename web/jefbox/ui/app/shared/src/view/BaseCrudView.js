Ext.define('JefBox.view.BaseCrudView', {
  extend: 'Ext.grid.Grid',
  alias: 'widget.baseCrudView',
  requires: [
    'JefBox.view.BaseCrudViewModel',
    'JefBox.view.BaseCrudViewController'
  ],

  controller: {
    type: 'baseCrudView'
  },
  viewModel: {
    type: 'baseCrudView'
  },

  border: true,
  NAME_DATAINDEX: 'Name',
  bind: {
    store: '{mainStore}'
  },
  listeners: {
    edit: 'onEditRow',
    canceledit: 'onCancelEditRow'
  },

  constructor: function(config) {
    config = config || {};
    config.plugins = this.getPluginsConfig();
    config.items = this.getItemsConfig();
    config.columns = this.getColumnsConfig();
    this.callParent([config]);
  },

  getPluginsConfig: function() {
    return [{
      type: 'rowedit',
      id: 'rowEditingPlugin',
      clicksToEdit: 2
    }];
  },

  getTopToolbarConfig: function() {
    return {
      xtype: 'toolbar',
      docked: 'top',
      layout: {
        type: 'hbox',
        pack: 'end'
      },
      items: [{
        align: 'right',
        xtype: 'button',
        text: 'Create Record',
        handler: 'onClickCreateRecordBtn'
      }, {
        align: 'right',
        xtype: 'button',
        text: 'Refresh',
        handler: 'onClickRefreshBtn'
      }]
    };
  },

  getItemsConfig: function() {
    var config = [];
    var topToolbarConfig = this.getTopToolbarConfig();
    if (topToolbarConfig) {
      config.push(topToolbarConfig);
    }
    return config;
  },

  getActionsColumnConfig: function() {
    return {
      text: 'Actions',
      cell: {
        tools: [{
          iconCls: 'x-fa fa-trash',
          tooltip: 'Delete Team',
          handler: 'onClickDeleteUser'
        }]
      }
    };
  },

  getColumnsConfig: function() {
    var config = [];
    var actionsColumnConfig = this.getActionsColumnConfig();
    if (actionsColumnConfig) {
      config.push(actionsColumnConfig);
    }
    config.push({
      text: 'Id',
      dataIndex: 'Id',
      flex: 1
    }, {
      text: 'Name',
      dataIndex: this.NAME_DATAINDEX,
      flex: 1,
      editor: {
        xtype: 'textfield',
        allowBlank: false
      }
    }, {
      text: 'Created',
      dataIndex: 'CreateDate',
      formatter: 'date("m/d/Y g:m:s A")',
      flex: 1
    }, {
      text: 'Last Updated',
      dataIndex: 'UpdateDate',
      formatter: 'date("m/d/Y g:m:s A")',
      flex: 1
    });
    return config;
  }
});