Ext.define('JefBox.store.Enum', {
  extend: 'Ext.data.Store',
  alias: 'store.enum',
  model: 'JefBox.model.KeyValue',

  getEnumByValue: function(value) {
    return this.findRecord('Value', value, 0, false, true, true);
  },

  getChainedStore: function(filters) {
    return Ext.create('Ext.data.ChainedStore', {
      source: this,
      filters: filters || []
    });
  }
});