Ext.define('JefBox.view.main.MainView', {
  extend: 'Ext.Panel',
  alias: 'widget.mainView',
  requires: [
    'JefBox.shared.view.users.MainView'
  ],

  controller: {
    type: 'mainView'
  },
  viewModel: {
    type: 'mainView'
  },

  bodyStyle: 'background-color: #222;',
  bodyPadding: 10,
  bbar: {
    items: [{
      xtype: 'button',
      tooltip: 'Areas',
      iconCls: Icons.START_MENU
    }, {
      xtype: 'component',
      width: 1,
      margin: '0 10',
      height: '100%',
      style: 'background-color: #cecece;'
    }]
  },
  items: [{
    xtype: 'button',
    text: 'Users',
    iconAlign: 'top',
    cls: Styles.BUTTON_LARGE,
    iconCls: Icons.USERS,
    style: 'border: 1px solid #cecece;',
    handler: 'onClickUsersView'
  }]
});
