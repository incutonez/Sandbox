Ext.define('JefBox.view.main.MainView', {
  extend: 'Ext.Panel',
  alias: 'widget.mainView',

  controller: {
    type: 'mainView'
  },
  viewModel: {
    type: 'mainView'
  },

  title: 'Phone',
  layout: 'fit'
});
