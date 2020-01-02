Ext.define('JefBox.model.Upload', {
  extend: 'Ext.data.Model',

  idProperty: 'Id',
  identifier: 'negative',
  fields: [{
    name: 'Id',
    type: 'int'
  }, {
    name: 'Type',
    type: 'int'
  }, {
    name: 'Url',
    type: 'string'
  }, {
    name: 'Data',
    type: 'string'
  }],

  proxy: {
    type: 'memory'
  }
});