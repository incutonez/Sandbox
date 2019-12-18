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
    Ext.create('JefBox.shared.view.auth.LoginView', {
      listeners: {
        scope: this,
        destroy: 'onDestroyTaskView'
      }
    }).show();
  },

  onRouteHome: function() {
    for (var key in this.openWindows) {
      var win = this.openWindows[key];
      win.hide();
      win.taskButton.setPressed(false);
    }
  },

  onRouteUsers: function(params) {
    this.createTaskWindow('Users', 'usersView', Icons.USERS, Routes.USERS);
  },

  getTaskWindowByType: function(key) {
    return this.openWindows[key];
  },

  createTaskWindow: function(title, xtype, iconCls, key) {
    var openWindow = this.getTaskWindowByType(key);
    if (openWindow) {
      openWindow.show();
      openWindow.taskButton.setPressed(true);
      return;
    }
    var win = Ext.create('Ext.Dialog', {
      title: title,
      layout: 'fit',
      height: 400,
      width: 800,
      closable: true,
      maximizable: true,
      modal: false,
      openWindowKey: key,
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
    this.openWindows[key] = win;
  },

  onMinimizeTaskWindow: function(win) {
    this.redirectTo(Routes.HOME);
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
    if (win.taskButton) {
      win.taskButton.destroy();
      delete this.openWindows[win.openWindowKey];
    }
    this.redirectTo(Routes.HOME);
  },

  onClickUsersView: function(button) {
    this.redirectTo(Routes.USERS);
  }
});
