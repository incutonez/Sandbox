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
        return get('UserProfile.valid');
      }
    }
  },

  title: 'Log In',
  bbar: {
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      xtype: 'button',
      text: 'GO!',
      bind: {
        disabled: '{!isViewValid}'
      },
      handler: function() {
        UserProfile.logInUser();
      }
    }]
  },
  items: [{
    xtype: 'textfield',
    allowBlank: false,
    label: 'User Name',
    bind: {
      value: '{UserProfile.UserName}'
    }
  }, {
    xtype: 'textfield',
    allowBlank: false,
    inputType: 'password',
    label: 'Password',
    bind: {
      value: '{UserProfile.Password}'
    }
  }]
});