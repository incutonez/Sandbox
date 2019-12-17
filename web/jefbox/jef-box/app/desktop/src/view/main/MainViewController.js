Ext.define('JefBox.view.main.MainViewController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainView',

  constructor: function(config) {
    var routes = {};
    routes[Routes.HOME] = 'onRouteHome';
    routes[Routes.USERS] = 'onRouteUsers';
    routes[Routes.LOGIN] = 'onRouteLogin';
    config.routes = routes;
    config.openWindows = {};
    this.callParent(arguments);
  },

  onRouteLogin: function() {
    Ext.create('JefBox.shared.view.auth.LoginView').show();
  },

  onRouteHome: function() {
    for (var key in this.openWindows) {
      var win = this.openWindows[key];
      win.hide();
    }
  },

  onRouteUsers: function(params) {
    this.createTaskWindow('Users', 'usersView', Icons.USERS);
  },

  createTaskWindow: function(title, xtype, iconCls) {
    var win = Ext.create('Ext.Dialog', {
      title: title,
      layout: 'fit',
      height: 400,
      width: 800,
      closable: true,
      maximizable: true,
      modal: false,
      tools: [{
        type: 'minimize',
        scope: this,
        handler: 'onMinimizeTaskWindow'
      }, {
        type: 'maximize'
      }],
      items: [{
        xtype: xtype
      }],
      listeners: {
        scope: this,
        destroy: 'onDestroyTaskView'
      }
    }).show();
    var button = Ext.create('Ext.Button', {
      iconCls: iconCls,
      text: title,
      enableToggle: true,
      pressed: true,
      handler: 'onClickTaskButton',
      taskWindow: win
    });
    win.taskButton = button;
    this.getView().getBbar().add(button);
    this.openWindows[win.getId()] = win;
  },

  onMinimizeTaskWindow: function(win) {
    win.hide();
    win.taskButton.setPressed(false);
  },

  onClickTaskButton: function(button) {
    if (button.isPressed()) {
      button.taskWindow.show();
    }
    else {
      button.taskWindow.hide();
    }
  },

  onDestroyTaskView: function(win) {
    win.taskButton.destroy();
    this.redirectTo(Routes.HOME);
  },

  onClickUsersView: function(button) {
    this.redirectTo(Routes.USERS);
  }
});
