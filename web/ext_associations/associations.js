Ext.onReady(function() {
  var data = [{
    "path": "/some/path",
    "services": [{
      "urlId": "1",
      "url": "/some/other/path"
    }, {
      "urlId": "2",
      "url": "/path/2"
    }],
    "service": [{
      "urlId": "21",
      "url": "/blah/211"
    }]
  }, {
    "path": "/some/path2",
    "services": [{
      "urlId": "3",
      "url": "/some/other/path2"
    }, {
      "urlId": "4",
      "url": "/path/5"
    }],
    "service": [{
      "urlId": "20",
      "url": "/blah/22"
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
    ],
    constructor: function(config) {
      // Create a hasMany manually
      var model = Ext.create('Ext.data.association.HasMany', {
        model: 'Service',
        associatedModel: 'Service',
        name: 'getServiceStore',
        ownerModel: 'Web',
        associationKey: 'service'
      });
      this.associations.items.push(model);
      this.callParent(arguments);
    }
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
  debugger;
});