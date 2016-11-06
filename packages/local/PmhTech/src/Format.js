Ext.define('PmhTech.Format', {
    extend: 'Ext.Base',
    statics: {

        dateRenderer: function (value) {

            if (Ext.isDate(value)) {
                return Ext.util.Format.date(value, 'Y-m-d')
            }

            var year = value.substr(0, 4);
            var month = value.substr(4, 2);
            var day = value.substr(6, 2);

            return Ext.String.format('{0}-{1}-{2}', year, month, day);
        },
        numberRenderer: function (value) {
            return Ext.util.Format.number(value, '#,###')
        }
        ,inactiveRenderer: function (value) {
            return value == 'N' ? '' : value;
        }
    }
});