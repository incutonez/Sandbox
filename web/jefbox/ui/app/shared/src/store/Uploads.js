Ext.define('JefBox.store.Uploads', {
  extend: 'Ext.data.Store',
  singleton: true,
  model: 'JefBox.model.Upload',
  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: 'api/upload'
  }
});