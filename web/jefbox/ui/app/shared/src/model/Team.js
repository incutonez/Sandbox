Ext.define('JefBox.model.Team', {
  extend: 'Ext.data.Model',

  fields: [{
    name: 'Id',
    type: 'int'
  }, {
    name: 'Name',
    type: 'string'
  }, {
    name: 'Color',
    type: 'string'
  }],

  proxy: {
    type: 'rest',
    url: 'api/teams'
  }
});