Ext.define('Test.controller.TheController', {
  extend: 'Ext.app.Controller',
  requires: ['Test.Utils', 'Test.Utils2'],
  models: ['TheModel'],
  stores: ['TheStore'],
  views: ['TheGrid'],
  init: function() {
  }
});