Ext.application({
  name : 'Fiddle',
  launch : function() {
      Ext.override(Ext.grid.CellContext, {
          setPosition: function(row, col) {
        var me = this;

        // We were passed {row: 1, column: 2, view: myView} or [2, 1]
        if (arguments.length === 1) {
            // A [column, row] array passed
            if (row.length) {
                col = row[1];
                row = row[0];
            }
            // An object containing {row: r, column: c}
            else {
                if (row.view) {
                    me.view = row.view;
                }
                col = row.column;
                row = row.row;
            }
        }

        me.setRow(row);
        me.setColumn(col);
        return me;
          }
    
      });
    Ext.define('Day', {
      extend: 'Ext.data.Model',
      fields: [
        {name: 'day', type: 'string'},
        {name: 'value', type: 'int'},
        {name: 'name', type: 'string'}
      ]
    });
    var Day = Ext.define('Hour', {
      extend: 'Ext.data.Model',
      fields: [
        {name: 'name', type: 'string'}
      ],
      hasMany: [
        {associationKey: 'days', model: 'Day', name: 'getDaysStore'}
      ],
      proxy: {
        type: 'ajax',
        url: 'ComplexGridDataWithHandles.json',
        reader: {
          type: 'json'
        }
      }
    });
    Ext.define('MyViewModel', {
      extend: 'Ext.app.ViewModel',
      alias: 'viewmodel.myview',
      stores: {
        hourStore: {
          model: Day
        }
      }
    });
    Ext.define('MyViewController', {
      extend: 'Ext.app.ViewController',
      alias: 'controller.myview',
        init: function() {
            this.getStore('hourStore').on('load', this.getView().onLoadStore, this.getView());
            this.getStore('hourStore').load();
        }
    });
    Ext.define('MyView', {
      extend: 'Ext.grid.Panel',
      controller: 'myview',
        xtype: 'myView',
      viewModel: {
        type: 'myview'
      },
        rowLines: false,
        cls: 'my-grid',
        selModel: {
            type: 'spreadsheet',
            rowSelect: false
        },
        onLoadStore: function() {
            this.mon(this.el, 'click', this.onClickRightCell, this, {delegate: 'td.my-cell-handle'});
            this.mon(this.el, 'click', this.onClickLeftCell, this, {delegate: 'td.my-left-cell'});
        },
        initComponent: function() {
            this.columns = [{
                xtype: 'gridcolumn',
                dataIndex: 'name',
                text: 'Hour'
            }, {
                xtype: 'gridcolumn',
                renderer: Ext.bind(this.dayRenderer, this),
                text: '<span>Monday</span><br /><span class="committed-hours">Committed</span>',
                listeners: {
                    headerclick: this.onHeaderClick
                }
            }, {
                xtype: 'gridcolumn',
                renderer: Ext.bind(this.dayRenderer, this),
                text: '<span>Tuesday</span><br /><span class="accept-hours">Accept</span>',
                listeners: {
                    headerclick: this.onHeaderClick
                }
            }, {
                xtype: 'gridcolumn',
                renderer: Ext.bind(this.dayRenderer, this),
                text: '<span>Wednesday</span><br /><span class="accept-hours">Accept</span>',
                listeners: {
                    headerclick: this.onHeaderClick
                }
            }];
            this.callParent();
        },
        onHeaderClick: function(headerCt, column, event, htmlEl, eOpts) {
            if (htmlEl) {
                var domEl = Ext.get(htmlEl);
                if (domEl && domEl.hasCls('accept-hours')) {
                    alert('clicked');
                }
            }
        },
        onClickRightCell: function(event, htmlEl, delegate, eOpts) {
            var store = this.getStore();
            if (event && store) {
                var record = event.record;
                var colIdx = event.position.colIdx;
                var rowIdx = event.position.rowIdx;
                if (record) {
                    var daysStore = record.getDaysStore();
                    if (daysStore) {
                        var day = daysStore.getAt(colIdx - 1);
                        if (day) {
                            var name = day.get('name');
                            var items = [];
                            store.each(function(rec, index) {
                                var recDaysStore = rec.getDaysStore();
                                if (recDaysStore) {
                                    var recDay = recDaysStore.getAt(colIdx - 1);
                                    if (recDay && recDay.get('name') === name) {
                                        items.push(index);
                                    }
                                    else if (index > rowIdx) {
                                        return false;
                                    }
                                        else {
                                           items = []; 
                                        }
                                }
                            });
                            this.getSelectionModel().selectCells([items[0], colIdx], [items[items.length - 1], colIdx]);
                        }
                    }
                }
            }
        },
        onClickLeftCell: function() {
          // do logic here
        },
        template: '<table class="my-cell"><tr>' +
                    '<td class="my-left-cell">{0}</td>' +
        			'<td class="my-cell-handle my-cell-handle-{1}"></td>' +
        			'</tr></table>',
      dayRenderer: function(value, metaData, record, rowIndex, colIndex) {
          var day = '';
          var daysStore = record.getDaysStore();
          if (daysStore) {
              var dayRec = daysStore.getAt(colIndex - 1);
              if (dayRec) {
                  day = dayRec.get('value');
                  var name = dayRec.get('name');
                  if (name === 'blah') {
                      value = 0;
                  }
                  else if (name === 'bleh') {
                      value = 1;
                  }
                  else if (name === 'test') {
                      value = 2;
                  }
                  else if (name === 'hello') {
                      value = 3;
                  }
              }
          }
          day = Ext.String.format(this.template, dayRec.get('value'), value);
          metaData.tdCls = 'my-cell-' + value;
        return day;
      },
        layout: 'fit',
        shrinkWrap: 0,
        border: true,
        forceFit: true,
        bind: {
            store: '{hourStore}'
        }
    });
      Ext.create('MyView', {
          renderTo: Ext.getBody(),
          height: 400,
          width: 600
      });
  }
});