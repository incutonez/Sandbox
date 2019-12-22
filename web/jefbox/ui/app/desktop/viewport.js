Ext.require('JefBox.view.main.MainView', function() {
  Ext.get('splash').destroy();
  Ext.Viewport.add([{
    xtype: 'mainView'
  }]);
});