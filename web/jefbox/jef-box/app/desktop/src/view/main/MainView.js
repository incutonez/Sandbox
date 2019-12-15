Ext.define('JefBox.view.main.MainView', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.mainView',

  controller: {
    type: 'mainView'
  },
  viewModel: {
    type: 'mainView'
  },

  title: 'Desktop',
  layout: 'fit'
});
