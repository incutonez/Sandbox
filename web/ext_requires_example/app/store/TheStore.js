Ext.define('Test.store.TheStore', {
  extend: 'Ext.data.Store',
  requires: ['Test.model.TheModel', 'Test.Utils'],
  model: 'Test.model.TheModel',
  data: [
    {name: 'keanu reeves', phone: '1800matrices', hello: Test.Utils.getText()},
    {name: 'james earl jones', phone: '1800starwar', hello: 'nothing here'},
    {name: 'barack obama', phone: '1800prsidnt', hello: 'hello world'}
  ]
});