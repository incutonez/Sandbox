Ext.Loader.setConfig({
  enabled: true
});

Ext.Loader.setPath('Ext.ux', 'examples/ux');

Ext.application({
  name: 'Test',
  appFolder: 'app',
  controllers: ['TheController'],
  launch: function() {
    Ext.create('Ext.Viewport', {
      layout: 'border',
      items: [{
        xtype: 'thegrid',
        region: 'center',
        title: 'blah!'
      }]
    });
  }
});