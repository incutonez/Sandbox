Ext.define('JefBox.model.Upload', {
  extend: 'Ext.data.Model',

  idProperty: 'Id',
  identifier: 'negative',
  fields: [{
    name: 'Id',
    type: 'int'
  }, {
    name: 'Type',
    type: 'int',
    defaultValue: Enums.UploadTypes.VIDEO_URL
  }, {
    name: 'MimeType',
    type: 'string'
  }, {
    name: 'Url',
    type: 'string'
  }, {
    name: 'Data',
    type: 'string'
  }, {
    name: 'displayValue',
    type: 'string',
    persist: false,
    depends: ['MimeType', 'Data'],
    convert: function(value, record) {
      let data = record.get('Data');
      if (data) {
        return '<img height="30" src="data:' + record.get('MimeType') + ';base64, ' + data + '" />';
      }
    }
  }],

  proxy: {
    type: 'memory'
  }
});