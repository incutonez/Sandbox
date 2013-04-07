Ext.define('Test.view.TheGrid', {
  extend: 'Ext.grid.Panel',
  alias: 'widget.thegrid',
  requires: ['Test.store.TheStore'],
  store: 'TheStore',
  columns: [
    {header: 'Name', dataIndex: 'name'},
    {header: 'Phone', dataIndex: 'phone'},
    {header: 'Hello', dataIndex: 'hello'}
  ]
});