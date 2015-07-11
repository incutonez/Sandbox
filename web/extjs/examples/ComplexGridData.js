Ext.application({
  name: 'Fiddle',

  launch: function() {
    Ext.define('DayModel', {
      extend: 'Ext.data.Model',
      fields: [{
        name: 'day',
        type: 'string'
      }, {
        name: 'value',
        type: 'number'
      }]
    });
    Ext.define('WeekModel', {
      extend: 'Ext.data.Model',
      fields: [{
        name: 'week',
        type: 'string'
      }],
      hasMany: [{
        associationKey: 'days',
        name: 'getDaysStore',
        model: 'DayModel'
      }]
    });
    Ext.define('MyStore', {
      extend: 'Ext.data.Store',
      model: 'WeekModel',
      proxy: {
        type: 'ajax',
        url: 'ComplexGridData.json'
      }
    });
    Ext.define('MyGrid', {
      extend: 'Ext.grid.Panel',
      renderTo: Ext.getBody(),
      initComponent: function() {
        this.callParent();
        this.on('sortchange', this.onSortChange, this);
        var store = Ext.create('MyStore');
        if (store) {
          store.on('load', this.onStoreLoad, this);
          this.setStore(store);
          store.load();
        }
      },
      dayColumnRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if (record) {
          var daysStore = record.getDaysStore();
          if (daysStore) {
            // subtract 1 because we have the Week column as the first column, so index is shifted by 1
            var dayRecord = daysStore.getAt(colIndex - 1);
            if (dayRecord) {
              value = dayRecord.get('value');
            }
          }
        }
        return value;
      },
      sortColumnByIndex: function(columnIndex, direction) {
        var store = this.getStore();
        if (store) {
          var sorterFn = function(rec1, rec2) {
            var sortValue = false;
            if (rec1 && rec2) {
              var day1;
              var daysStore1 = rec1.getDaysStore();
              if (daysStore1) {
                day1 = daysStore1.getAt(columnIndex);
              }
              var day2;
              var daysStore2 = rec2.getDaysStore();
              if (daysStore2) {
                day2 = daysStore2.getAt(columnIndex);
              }
              if (day1 && day2) {
                sortValue = day1.get('value') > day2.get('value');
              }
            }
            return sortValue;
          };
          if (direction !== 'ASC') {
            sorterFn = function(rec1, rec2) {
              var sortValue = false;
              if (rec1 && rec2) {
                var day1;
                var daysStore1 = rec1.getDaysStore();
                if (daysStore1) {
                  day1 = daysStore1.getAt(columnIndex);
                }
                var day2;
                var daysStore2 = rec2.getDaysStore();
                if (daysStore2) {
                  day2 = daysStore2.getAt(columnIndex);
                }
                if (day1 && day2) {
                  sortValue = day1.get('value') < day2.get('value');
                }
              }
              return sortValue;
            };
          }
          store.setSorters([{
            sorterFn: sorterFn
          }]);
        }
      },
      onStoreLoad: function(store, records, successful, eOpts) {
        // set columns
        var columns = [{
          text: 'Week',
          dataIndex: 'week'
        }];
        if (records) {
          var firstRecord = records[0];
          if (firstRecord) {
            var daysStore = firstRecord.getDaysStore();
            if (daysStore) {
              daysStore.each(function(dayRecord, dayColumnIndex) {
                columns.push({
                  text: dayRecord.get('day'),
                  dataIndex: 'day' + dayColumnIndex,
                  dayColumnIndex: dayColumnIndex,
                  renderer: this.dayColumnRenderer
                });
              }, this);
            }
          }
        }
        this.reconfigure(null, columns);
      },
      onSortChange: function(container, column, direction, eOpts) {
        // check for weekColumnIndex
        if (column && column.dayColumnIndex !== undefined) {
          this.sortColumnByIndex(column.dayColumnIndex, direction);
        }
      }
    });
    Ext.create('MyGrid');
  }
});