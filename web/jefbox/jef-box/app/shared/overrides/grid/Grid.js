Ext.define('JefBox.shared.overrides.grid.Grid', {
  override: 'Ext.grid.Grid',

  constructor: function(config) {
    if (Ext.isEmpty(config.columnLines)) {
      config.columnLines = true;
    }
    this.callParent(arguments);
  }
});