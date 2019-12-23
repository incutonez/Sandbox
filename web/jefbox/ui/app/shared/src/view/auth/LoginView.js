Ext.define('JefBox.view.auth.LoginView', {
  extend: 'JefBox.BaseDialog',
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
  minimizable: false,
  maximizable: false,
  closable: false,
  maximized: true,
  defaultListenerScope: true,
  layout: {
    type: 'vbox'
  },
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
    required: true,
    label: 'User Name',
    bind: {
      value: '{UserProfile.UserName}'
    },
    listeners: {
      keydown: 'onKeyDownField'
    }
  }, {
    xtype: 'textfield',
    required: true,
    inputType: 'password',
    label: 'Password',
    bind: {
      value: '{UserProfile.Password}'
    },
    listeners: {
      keydown: 'onKeyDownField'
    }
  }],

  onKeyDownField: function(field, event, eOpts) {
    if (event.getKey() === event.ENTER) {
      var viewModel = this.getViewModel();
      if (viewModel && viewModel.get('isViewValid')) {
        UserProfile.logInUser();
      }
    }
  }
});