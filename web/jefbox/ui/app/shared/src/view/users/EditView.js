Ext.define('JefBox.view.users.EditView', {
  extend: 'JefBox.BaseDialog',
  alias: 'widget.usersEditView',
  requires: [
    'JefBox.view.teams.SelectView'
  ],

  viewModel: {
    data: {
      viewRecord: null
    }
  },

  title: 'Edit User',
  isCrudDialog: true,
  bodyPadding: 10,
  layout: {
    type: 'vbox'
  },
  items: [{
    xtype: 'textfield',
    label: 'User Name',
    required: true,
    bind: {
      value: '{viewRecord.UserName}'
    }
  }, {
    xtype: 'combobox',
    label: 'Access Level',
    queryMode: 'local',
    valueField: 'Value',
    displayField: 'Description',
    forceSelection: true,
    required: true,
    store: Enums.AccessLevels,
    bind: {
      value: '{viewRecord.AccessLevel}'
    }
  }, {
    xtype: 'teamsSelectView',
    flex: 1
  }]
});