Ext.define('JefBox.shared.view.auth.LoginView', {
  extend: 'Ext.Dialog',
  alias: 'widget.loginView',
  requires: [
    'JefBox.model.User'
  ],

  viewModel: {
    data: {
      selectedUser: null
    },
    stores: {
      usersStore: {
        model: 'JefBox.model.User',
        autoLoad: true,
        proxy: {
          type: 'ajax',
          url: 'api/users',
          extraParams: {
            login: true
          }
        }
      }
    }
  },

  title: 'Select User',
  bbar: {
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      xtype: 'button',
      text: 'Log In',
      bind: {
        disabled: '{!selectedUser}'
      },
      handler: function() {
        var me = this;
        var vm = this.lookupViewModel();
        UserProfile.logInUser(vm && vm.get('selectedUser'), function(successful) {
          if (successful) {
            me.up('loginView').close();
          }
        });
      }
    }]
  },
  items: [{
    xtype: 'combobox',
    allowBlank: false,
    forceSelection: true,
    queryMode: 'local',
    valueField: 'Id',
    displayField: 'Name',
    bind: {
      store: '{usersStore}',
      selection: '{selectedUser}'
    }
  }]
});