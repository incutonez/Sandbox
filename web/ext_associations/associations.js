Ext.onReady(function() {
  var data = [{
    "path": "/some/path",
    "services": [{
      "urlId": "1",
      "url": "/some/other/path"
    }, {
      "urlId": "2",
      "url": "/path/2"
    }]
  }, {
    "path": "/some/path2",
    "services": [{
      "urlId": "3",
      "url": "/some/other/path2"
    }, {
      "urlId": "4",
      "url": "/path/5"
    }]
  }];
    
  Ext.define('Service', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'urlId', type: 'string'},
      {name: 'url', type: 'string'}
    ]
  });

  Ext.define('Web', {
    extend: 'Ext.data.Model',
    fields: [
      {name: 'path', type: 'string'}
    ],
    hasMany: [
      {associationKey: 'services', name: 'getServicesStore', model: 'Service'}
    ]
  });

  var store = Ext.create('Ext.data.Store', {
    model: 'Web',
    data: data,
    proxy: {
      type: 'memory',
      reader: {
        type: 'json'
      }
    }
  });
});