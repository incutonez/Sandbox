Ext.define('JefBox.view.BaseCrudViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.baseCrudView',

  data: {
    mainStoreModel: null
  },

  stores: {
    mainStore: {
      model: '{mainStoreModel}'
    }
  }
});