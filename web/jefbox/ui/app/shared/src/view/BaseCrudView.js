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
  itemConfig: {
    viewModel: true
  },
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
      edit: true,
      delete: true
    };
  },

  getActionsColumnItems: function() {
    var items = [];
    var config = this.getActionsColumnConfig();
    if (config.edit) {
      items.push({
        iconCls: Icons.EDIT,
        tooltip: 'Edit Game',
        handler: 'onClickEditRecord'
      });
    }
    if (config.delete) {
      items.push({
        iconCls: Icons.DELETE,
        tooltip: 'Delete Record',
        handler: 'onClickDeleteRecord'
      });
    }
    var width = items.length * 25;
    return {
      text: 'Actions',
      width: width < 75 ? 75 : width,
      cell: {
        tools: items
      }
    };
  },

  getColumnsConfig: function() {
    var config = [];
    var actionsColumnConfig = this.getActionsColumnItems();
    if (actionsColumnConfig) {
      config.push(actionsColumnConfig);
    }
    config.push({
      text: 'Id',
      dataIndex: 'Id',
      align: 'center',
      width: 50
    }, {
      text: 'Name',
      dataIndex: this.NAME_DATAINDEX,
      flex: 1,
      editor: {
        xtype: 'textfield',
        required: true
      }
    }, {
      text: 'Created',
      dataIndex: 'CreateDate',
      formatter: 'dateMonthDayYearHourMinuteSecond',
      width: 175,
      cell: {
        encodeHtml: false
      }
    }, {
      text: 'Last Updated',
      dataIndex: 'UpdateDate',
      formatter: 'dateMonthDayYearHourMinuteSecond',
      width: 175,
      cell: {
        encodeHtml: false
      }
    });
    return config;
  }
});