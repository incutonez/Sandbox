Ext.application({
    name : 'Fiddle',

    launch : function() {
        function getStartDate(date) {
            var day = date.getDay() || 7;  
            if (day !== 1) {
                date.setHours(-24 * (day - 1));
            }
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        }
        function getEndDate(date) {
            var day = date.getDay();  
            if (day !== 0) {
                date.setHours((24 * (7 - day)) + 23);
            }
            date.setMinutes(59);
            date.setSeconds(59);
            date.setMilliseconds(999);
            return date;
        }
        function onSelectStartDateRow(field, value, eOpts) {
            var startDate = getStartDate(value);
            field.setValue(startDate);
            endDateField.setMinValue(startDate);
            endDateField.validate();
            startDateField.validate();
        }
        function onSelectEndDateRow(field, value, eOpts) {
            var endDate = getEndDate(value);
            field.setValue(endDate);
            endDateField.validate();
            startDateField.validate();
        }
        function validation() {
            if (endDateField.getValue() < startDateField.getValue()) {
                return 'End Date cannot be less than the Start Date.'
            }
            return endDateField.getValue() > startDateField.getValue();
        }
        var startDateField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'From',
            name: 'StartDate',
            renderTo: Ext.getBody(),
            startDay: 1,
            showToday: false,
            listeners: {
                select: onSelectStartDateRow
            },
            validator: validation
        });
        var endDateField = Ext.create('Ext.form.field.Date', {
            fieldLabel: 'To',
            name: 'EndDate',
            renderTo: Ext.getBody(),
            startDay: 1,
            showToday: false,
            listeners: {
                select: onSelectEndDateRow
            },
            validator: validation
        });
        function onShowDatePicker(picker, eOpts) {
            var pickerEl = picker.el;
            if (pickerEl) {
                var selected = pickerEl.query('.x-datepicker-selected')[0];
                var previousSelection = pickerEl.query('.date-field-selected')[0];
                if (previousSelection) {
                    var previousSelectionEl = Ext.fly(previousSelection);
                    if (previousSelectionEl) {
                    	previousSelectionEl.removeCls('date-field-selected');
                    }
                }
                if (selected) {
                    var domEl = Ext.fly(selected);
                    if (domEl) {
                        var parentRow = domEl.up('tr');
                        if (parentRow) {
                            parentRow.addCls('date-field-selected');
                        }
                    }
                }
            }
        }
        var startPicker = startDateField.getPicker();
        startPicker.addCls('date-week-picker');
        startPicker.on('show', onShowDatePicker, startDateField);
        var endPicker = endDateField.getPicker();
        endPicker.addCls('date-week-picker');
        endPicker.on('show', onShowDatePicker, endDateField);
    }
});