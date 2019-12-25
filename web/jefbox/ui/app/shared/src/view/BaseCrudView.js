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
  // Needed to trigger any kind of cell/row binding
  itemConfig: {
    viewModel: {
      formulas: {
        canEditRecord: function(get) {
          return get('record.CanEdit');
        },
        viewIconCls: function(get) {
          return get('canEditRecord') ? Styles.ELEMENT_HIDDEN : Icons.VIEW;
        },
        revertIconCls: function(get) {
          if (!get('canEditRecord')) {
            return Styles.ELEMENT_HIDDEN;
          }
          return !get('record.isDeleted') ? Styles.ELEMENT_HIDDEN : Icons.REVERT;
        },
        editIconCls: function(get) {
          if (!get('canEditRecord')) {
            return Styles.ELEMENT_HIDDEN;
          }
          return get('record.isDeleted') ? Styles.ELEMENT_HIDDEN : Icons.EDIT;
        },
        deleteIconCls: function(get) {
          if (!get('canEditRecord')) {
            return Styles.ELEMENT_HIDDEN;
          }
          return get('record.isDeleted') ? Styles.ELEMENT_HIDDEN : Icons.DELETE;
        }
      }
    }
  },
  bind: {
    store: '{mainStore}',
    title: '{viewTitle}'
  },
  listeners: {
    beforeedit: 'onBeforeEditRow',
    edit: 'onEditRow',
    canceledit: 'onCancelEditRow'
  },

  constructor: function(config) {
    config = config || {};
    config.plugins = this.getPluginsConfig();
    config.titleBar = this.getTitleBarItems();
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

  getTitleBarConfig: function() {
    return [{
      align: 'right',
      xtype: 'button',
      handler: 'onClickCreateRecordBtn',
      iconCls: Icons.NEW,
      bind: {
        text: '{entityName}',
        tooltip: 'New {entityName}'
      }
    }, {
      align: 'right',
      xtype: 'button',
      tooltip: 'Refresh',
      iconCls: Icons.REFRESH,
      handler: 'onClickRefreshBtn'
    }];
  },

  getTitleBarItems: function() {
    const titleBarConfig = this.getTitleBarConfig();
    if (titleBarConfig) {
      return {
        items: titleBarConfig
      };
    }
  },

  getActionsColumnConfig: function() {
    return {
      edit: true,
      delete: true,
      view: true,
      revert: true
    };
  },

  getViewActionConfig: function() {
    return {
      tooltip: 'View Record',
      handler: 'onClickViewRecord',
      bind: {
        iconCls: '{viewIconCls}'
      }
    };
  },

  getDeleteActionConfig: function() {
    return {
      tooltip: 'Delete Record',
      handler: 'onClickDeleteRecord',
      bind: {
        iconCls: '{deleteIconCls}'
      }
    };
  },

  getEditActionConfig: function() {
    return {
      tooltip: 'Edit Record',
      handler: 'onClickEditRecord',
      bind: {
        iconCls: '{editIconCls}'
      }
    };
  },

  getRevertActionConfig: function() {
    return {
      tooltip: 'Revert Record',
      handler: 'onClickRevertRecord',
      bind: {
        iconCls: '{revertIconCls}'
      }
    };
  },

  getActionsColumnItems: function() {
    var items = [];
    var config = this.getActionsColumnConfig();
    if (config.edit) {
      items.push(this.getEditActionConfig());
    }
    if (config.delete) {
      items.push(this.getDeleteActionConfig());
    }
    if (config.revert) {
      items.push(this.getRevertActionConfig());
    }
    if (config.view) {
      items.push(this.getViewActionConfig());
    }
    var width = items.length * 25;
    return {
      text: 'Actions',
      align: 'right',
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
    }, {
      text: 'Updated By',
      dataIndex: 'UpdatedById',
      renderer: function(value) {
        return JefBox.store.Users.getUserNameById(value);
      }
    });
    return config;
  }
});