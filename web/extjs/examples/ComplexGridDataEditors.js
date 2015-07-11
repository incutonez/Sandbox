Ext.application({
  name : 'Fiddle',
  launch : function() {
    Ext.define('Phone', {
      extend: 'Ext.data.Model',
      fields: [
        {name: 'phone', type: 'string'},
        {name: 'type', type: 'string'}
      ]
    });
    var Person = Ext.define('Person', {
      extend: 'Ext.data.Model',
      fields: [
        {name: 'name', type: 'string'}
      ],
      hasMany: [
        {associationKey: 'phones', model: 'Phone', name: 'getPhonesStore'}
      ],
      proxy: {
        type: 'ajax',
        url: 'ComplexGridDataEditors.json',
        reader: {
          type: 'json'
        }
      }
    });
    Ext.define('MyViewModel', {
      extend: 'Ext.app.ViewModel',
      alias: 'viewmodel.myview',
      stores: {
        personStore: {
          model: Person
        }
      }
    });
    Ext.define('MyViewController', {
      extend: 'Ext.app.ViewController',
      alias: 'controller.myview',
      init: function() {
          this.rowEditingPlugin = Ext.create('Ext.grid.plugin.RowEditing', {
              pluginId: 'rowEditing',
              clicksToEdit: 1,
              listeners: {
                  scope: this,
                  edit: this.onEdit
              }
          });
          this.lookupReference('myGrid').plugins = [this.rowEditingPlugin];
          this.rowEditingPlugin.init(this.lookupReference('myGrid'))
          this.onClickReconfigure()
      },
        onEdit: function() {
            
        },
        edit: function(grid2, rowIndex, colIndex) {
          var grid = this.lookupReference('myGrid');
      var record = grid.getStore().getAt(rowIndex);
      //grid.getPlugin('rowEditing').editing = true;
      this.rowEditingPlugin.startEdit(record);
      if (grid && record) {
          console.log('here',grid);
          var phonesStore = record.getPhonesStore();
          var columns = grid.getView().getGridColumns();
          console.log('done');
          if (columns && phonesStore) {
              for (var i = 2; i <= phonesStore.count(); i++) {
                  var column = columns[i];
                  console.log(column);
                  var phoneRec = phonesStore.getAt(i - 2);
                  if (column && phoneRec) {
                      column.setEditor({
                          xtype: 'textfield',
                          value: phoneRec.get('phone')
                      });
                  }
              }
          }
      }
            console.log('done')
    },
      phoneRenderer: function(value, metaData, record, rowIndex, colIndex) {
          var phone = '';
          var phonesStore = record.getPhonesStore();
          if (phonesStore) {
              var phoneRec = phonesStore.getAt(colIndex - 2);
              if (phoneRec) {
                  phone = phoneRec.get('phone');
              }
          }
        return phone;
      },
      reconfigureView: function() {
        var store = this.getStore('personStore');
          var view = this.lookupReference('myGrid');
        if (store) {
          var firstRecord = store.first();
          if (firstRecord) {
            var phonesStore = firstRecord.getPhonesStore();
            if (phonesStore) {
                var columns = [{
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [{
                        icon: 'http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-10/512/Pencil-icon.png',
                        handler: this.edit,
                        tooltip: 'Edit',
                        scope: this
                    }]
                }, {
                xtype: 'gridcolumn',
                dataIndex: 'name',
                text: 'Name'
              }];
              phonesStore.each(function(phoneRec) {
                columns.push({
                  xtype: 'gridcolumn',
                  text: phoneRec.get('type'),
                  renderer: this.phoneRenderer
                });
              }, this);
              view.reconfigure(store, columns);
              view.columns = columns;
            }
          }
        }
      },
        onClickReconfigure: function() {
        var store = this.getStore('personStore');
        if (store) {
          store.load({
            scope: this,
              callback: function() {
                  this.reconfigureView();
              }
          });
        }
        }
    });
    Ext.define('MyView', {
      extend: 'Ext.container.Container',
      controller: 'myview',
      viewModel: {
        type: 'myview'
      },
        layout: 'fit',
        items: [{
            reference: 'myGrid',
            xtype: 'grid',
              bind: {
                store: '{personStore}'
              },
                tbar: [{
                    xtype: 'button',
                    text: 'Reconfigure View',
                    listeners:  {
                        click: 'onClickReconfigure'
                    }
                }]
        }],
      height: 300,
      width: 400
    });
    var view = Ext.create('MyView', {
      renderTo: Ext.getBody()
    });
  }
});