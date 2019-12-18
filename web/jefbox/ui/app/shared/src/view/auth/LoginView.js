Ext.define('JefBox.shared.view.auth.LoginView', {
  extend: 'Ext.Dialog',
  alias: 'widget.loginView',
  requires: [
    'JefBox.model.User'
  ],

  viewModel: {
    data: {
      UserProfile: UserProfile
    },
    formulas: {
      isViewValid: function(get) {
        console.log(get('UserProfile.valid'));
        return get('UserProfile.valid');
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
        disabled: '{!isViewValid}'
      },
      handler: function() {
        var me = this;
        UserProfile.logInUser(function(successful) {
          if (successful) {
            me.up('loginView').close();
          }
          else {
            Ext.toast('Incorrect credentials.');
          }
        });
      }
    }]
  },
  items: [{
    xtype: 'textfield',
    allowBlank: false,
    label: 'User Name',
    labelAlign: 'top',
    bind: {
      value: '{UserProfile.UserName}'
    }
  }, {
    xtype: 'textfield',
    allowBlank: false,
    inputType: 'password',
    label: 'Password',
    labelAlign: 'top',
    bind: {
      value: '{UserProfile.Password}'
    }
  }]
});